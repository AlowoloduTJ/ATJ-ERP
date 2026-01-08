-- ============================================================================
-- Database Overview Queries
-- Run these in Supabase SQL Editor to get complete database information
-- ============================================================================

-- 1. Verify Project Connection
-- ============================================================================
SELECT 
    current_database() as database_name,
    current_schema() as current_schema,
    version() as postgres_version;

-- 2. List All Tables in Public Schema
-- ============================================================================
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 3. Get Detailed Table Information
-- ============================================================================
SELECT 
    t.table_name,
    COUNT(c.column_name) as column_count,
    pg_size_pretty(pg_total_relation_size(quote_ident(t.table_schema)||'.'||quote_ident(t.table_name))) as table_size,
    (SELECT COUNT(*) 
     FROM information_schema.table_constraints tc 
     WHERE tc.table_name = t.table_name 
     AND tc.table_schema = 'public'
     AND tc.constraint_type = 'PRIMARY KEY') as has_primary_key,
    (SELECT COUNT(*) 
     FROM information_schema.table_constraints tc 
     WHERE tc.table_name = t.table_name 
     AND tc.table_schema = 'public'
     AND tc.constraint_type = 'FOREIGN KEY') as foreign_key_count
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name, t.table_schema
ORDER BY t.table_name;

-- 4. Get All Columns for Each Table
-- ============================================================================
SELECT 
    table_name,
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 5. Get Foreign Key Relationships
-- ============================================================================
SELECT
    tc.table_name as source_table,
    kcu.column_name as source_column,
    ccu.table_name as target_table,
    ccu.column_name as target_column,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 6. Get All Indexes
-- ============================================================================
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. Get Table Row Counts
-- ============================================================================
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

-- 8. Authentication & User Management Tables (Highlighted)
-- ============================================================================
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as column_count,
    (SELECT string_agg(column_name, ', ' ORDER BY ordinal_position)
     FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as columns
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name IN ('users', 'roles', 'permissions', 'role_permissions', 'sessions', 'employees')
ORDER BY table_name;

-- 9. Get Constraints (Primary Keys, Unique, Check)
-- ============================================================================
SELECT
    tc.table_name,
    tc.constraint_type,
    tc.constraint_name,
    kcu.column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
WHERE tc.table_schema = 'public'
    AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE', 'CHECK')
ORDER BY tc.table_name, tc.constraint_type;

-- 10. Summary Statistics
-- ============================================================================
SELECT 
    'Total Tables' as metric,
    COUNT(*)::text as value
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
UNION ALL
SELECT 
    'Total Columns' as metric,
    COUNT(*)::text as value
FROM information_schema.columns
WHERE table_schema = 'public'
UNION ALL
SELECT 
    'Total Foreign Keys' as metric,
    COUNT(*)::text as value
FROM information_schema.table_constraints
WHERE table_schema = 'public'
    AND constraint_type = 'FOREIGN KEY'
UNION ALL
SELECT 
    'Total Indexes' as metric,
    COUNT(*)::text as value
FROM pg_indexes
WHERE schemaname = 'public';
