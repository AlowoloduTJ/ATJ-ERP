# 📊 Get Database Overview - Quick Guide

## 🎯 Goal

Get a complete overview of your Supabase database structure.

## 🔧 Method 1: Using SQL Queries (Recommended)

### Step 1: Open Supabase SQL Editor

1. Go to: https://app.supabase.com
2. Select your project: `svtlzyfmzeizkxeigbzc`
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Run Overview Queries

Copy and paste queries from:
- **File:** `scripts/query-database-overview.sql`

Or run these quick queries:

```sql
-- Quick: List all tables
SELECT table_name 
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Quick: Get table counts
SELECT 
    tablename,
    n_live_tup as row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Step 3: Review Results

The queries will show:
- ✅ All tables in your database
- ✅ Column details for each table
- ✅ Foreign key relationships
- ✅ Indexes
- ✅ Row counts
- ✅ Table sizes

## 📚 Method 2: Review Schema Documentation

**File:** `docs/DATABASE_OVERVIEW_FROM_SCHEMA.md`

This document provides:
- Complete table list (42 tables)
- Detailed descriptions
- Key columns and relationships
- Authentication tables highlighted

## 🔍 Method 3: Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select your project
3. Click **Table Editor** in left sidebar
4. Browse tables visually

## 📋 Expected Tables (Based on Schema)

### Authentication (5 tables)
- users, roles, permissions, role_permissions, sessions

### Warehouse (8 tables)
- inventory_categories, suppliers, inventory, bulk_purchases, bulk_purchase_items, stock_transfers, stock_transfer_items, stock_movements

### Production (6 tables)
- products, production_orders, material_requisitions, material_requisition_items, work_in_progress, finished_goods

### Ledger (11 tables)
- clients, customers, office_divisions, expense_categories, expenses, client_transactions, customer_transactions, division_transactions, chart_of_accounts, journal_entries, journal_entry_lines

### HR (9 tables)
- departments, employees, attendance, leave_types, leaves, payroll, reimbursements, reimbursement_items, retirements

### Audit (1 table)
- audit_trails

### Admin (2 tables)
- settings, approvals

**Total: 42 tables**

---

**Run the SQL queries to see your actual database state!** 📊
