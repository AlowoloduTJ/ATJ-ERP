-- ============================================================================
-- Complete Database Overview Query
-- Run this in Supabase SQL Editor to get comprehensive database information
-- Project: svtlzyfmzeizkxeigbzc
-- ============================================================================

-- 1. VERIFY PROJECT CONNECTION
-- ============================================================================
SELECT 
    'Project Verification' as section,
    current_database() as database_name,
    current_schema() as current_schema,
    version() as postgres_version;

-- 2. LIST ALL TABLES IN PUBLIC SCHEMA
-- ============================================================================
SELECT 
    'All Tables' as section,
    table_name,
    table_type,
    (SELECT COUNT(*) 
     FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 3. DETAILED TABLE INFORMATION WITH COLUMNS
-- ============================================================================
SELECT 
    'Table Details' as section,
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    c.ordinal_position
FROM information_schema.tables t
JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;

-- 4. FOREIGN KEY RELATIONSHIPS
-- ============================================================================
SELECT 
    'Foreign Keys' as section,
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

-- 5. PRIMARY KEYS AND UNIQUE CONSTRAINTS
-- ============================================================================
SELECT 
    'Constraints' as section,
    tc.table_name,
    tc.constraint_type,
    tc.constraint_name,
    kcu.column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
WHERE tc.table_schema = 'public'
    AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE')
ORDER BY tc.table_name, tc.constraint_type;

-- 6. ALL INDEXES
-- ============================================================================
SELECT 
    'Indexes' as section,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. TABLE STATISTICS (ROW COUNTS)
-- ============================================================================
SELECT 
    'Table Statistics' as section,
    schemaname,
    tablename,
    n_live_tup as row_count,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as table_size
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 8. AUTHENTICATION & USER MANAGEMENT TABLES (HIGHLIGHTED)
-- ============================================================================
SELECT 
    'AUTH TABLES' as section,
    t.table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as column_count,
    (SELECT string_agg(column_name || ' (' || data_type || ')', ', ' ORDER BY ordinal_position)
     FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as columns
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name IN ('users', 'roles', 'permissions', 'role_permissions', 'sessions', 'employees')
ORDER BY 
    CASE table_name
        WHEN 'users' THEN 1
        WHEN 'roles' THEN 2
        WHEN 'permissions' THEN 3
        WHEN 'role_permissions' THEN 4
        WHEN 'sessions' THEN 5
        WHEN 'employees' THEN 6
    END;

-- 9. SUMMARY STATISTICS
-- ============================================================================
SELECT 
    'SUMMARY' as section,
    'Total Tables' as metric,
    COUNT(*)::text as value
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
UNION ALL
SELECT 
    'SUMMARY',
    'Total Columns',
    COUNT(*)::text
FROM information_schema.columns
WHERE table_schema = 'public'
UNION ALL
SELECT 
    'SUMMARY',
    'Total Foreign Keys',
    COUNT(*)::text
FROM information_schema.table_constraints
WHERE table_schema = 'public'
    AND constraint_type = 'FOREIGN KEY'
UNION ALL
SELECT 
    'SUMMARY',
    'Total Indexes',
    COUNT(*)::text
FROM pg_indexes
WHERE schemaname = 'public'
UNION ALL
SELECT 
    'SUMMARY',
    'Total Rows (all tables)',
    SUM(n_live_tup)::text
FROM pg_stat_user_tables
WHERE schemaname = 'public';
