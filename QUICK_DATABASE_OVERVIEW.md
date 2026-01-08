# 📊 Quick Database Overview Guide

## 🎯 Get Your Database Overview in 3 Steps

### Step 1: Open Supabase SQL Editor

1. Go to: **https://app.supabase.com**
2. Select your project: **svtlzyfmzeizkxeigbzc**
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Run the Overview Query

Copy and paste this query:

```sql
-- Quick Overview: All Tables
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name 
     AND table_schema = 'public') as columns,
    (SELECT COUNT(*) FROM pg_indexes 
     WHERE tablename = t.table_name 
     AND schemaname = 'public') as indexes
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

### Step 3: Get Detailed Information

For complete details, run the full query from:
**`scripts/get-database-overview-complete.sql`**

---

## 📋 Expected Tables (42 Total)

### 🔐 Authentication (5 tables)
- `users` - User accounts
- `roles` - User roles (admin, manager, etc.)
- `permissions` - Permission definitions
- `role_permissions` - Role-permission mapping
- `sessions` - User sessions

### 📦 Warehouse (8 tables)
- `inventory_categories`, `suppliers`, `inventory`
- `bulk_purchases`, `bulk_purchase_items`
- `stock_transfers`, `stock_transfer_items`, `stock_movements`

### 🏭 Production (6 tables)
- `products`, `production_orders`
- `material_requisitions`, `material_requisition_items`
- `work_in_progress`, `finished_goods`

### 💰 Ledger (11 tables)
- `clients`, `customers`, `office_divisions`
- `expense_categories`, `expenses`
- `client_transactions`, `customer_transactions`, `division_transactions`
- `chart_of_accounts`, `journal_entries`, `journal_entry_lines`

### 👥 HR (9 tables)
- `departments`, `employees`, `attendance`
- `leave_types`, `leaves`, `payroll`
- `reimbursements`, `reimbursement_items`, `retirements`

### 📝 Audit (1 table)
- `audit_trails`

### ⚙️ Admin (2 tables)
- `settings`, `approvals`

---

## 🔍 Quick Verification

Run this to verify your project:

```sql
SELECT 
    current_database() as database,
    current_schema() as schema,
    COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
```

**Expected Result:**
- database: Your Supabase database name
- schema: `public`
- table_count: Should be 42 (if schema is fully applied)

---

**Run the queries to see your actual database structure!** 📊
