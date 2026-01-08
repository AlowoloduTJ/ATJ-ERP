# 📊 Database Overview - SQL Queries

## 🔍 Verify Project Connection

Run this to verify you're connected to the correct project:

```sql
-- Get project information
SELECT 
    current_database() as database_name,
    current_schema() as current_schema,
    version() as postgres_version;
```

## 📋 List All Tables in Public Schema

```sql
-- List all tables in public schema
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

## 📊 Get Table Details

```sql
-- Get detailed information about all tables
SELECT 
    t.table_name,
    COUNT(c.column_name) as column_count,
    pg_size_pretty(pg_total_relation_size(quote_ident(t.table_schema)||'.'||quote_ident(t.table_name))) as table_size
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name, t.table_schema
ORDER BY t.table_name;
```

## 🔗 Get Foreign Key Relationships

```sql
-- Get all foreign key relationships
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
```

## 🔐 Authentication & User Management Tables

```sql
-- List authentication-related tables
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name IN ('users', 'roles', 'permissions', 'role_permissions', 'sessions')
ORDER BY table_name;
```

## 📈 Get Table Statistics

```sql
-- Get row counts for all tables
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;
```

## 🔍 Get Column Details for Specific Table

```sql
-- Replace 'users' with any table name
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name = 'users'
ORDER BY ordinal_position;
```

## 📊 Get Indexes

```sql
-- Get all indexes
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

## 🔐 Check Authentication Tables Structure

```sql
-- Detailed structure of auth tables
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.is_nullable,
    c.column_default
FROM information_schema.tables t
JOIN information_schema.columns c 
    ON t.table_name = c.table_name
WHERE t.table_schema = 'public'
    AND t.table_name IN ('users', 'roles', 'permissions', 'role_permissions', 'sessions')
ORDER BY t.table_name, c.ordinal_position;
```
