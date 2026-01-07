# Apply Database Schema to Supabase

## 🎯 Quick Guide

Apply your complete database schema to your Supabase project in 3 steps.

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to: **https://app.supabase.com**
2. Select your **"ATJ-ERP"** project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Copy and Paste Schema

1. Open the file: `supabase/APPLY_SCHEMA.sql`
2. **Copy ALL the SQL code** (Ctrl+A, then Ctrl+C)
3. **Paste it** into the Supabase SQL Editor

### Step 3: Run the Schema

1. Click **Run** button (or press Ctrl+Enter)
2. Wait for execution to complete
3. You should see: **"Success. No rows returned"**

## ✅ Verification

After running the schema:

1. **Check Tables Created:**
   - Go to **Table Editor** in Supabase
   - You should see all tables listed:
     - `roles`, `permissions`, `users`, `sessions`
     - `suppliers`, `inventory`, `bulk_purchases`
     - `products`, `production_orders`
     - `clients`, `customers`, `expenses`
     - `departments`, `employees`, `attendance`
     - `audit_trails`, `settings`, `approvals`
     - And more...

2. **Test Connection:**
   - Visit: http://localhost:3000/test-db
   - Should now work without "Table does not exist" errors
   - Try creating a test supplier

## 🔍 What Gets Created

### Tables (40+ tables):
- ✅ Authentication & Authorization (5 tables)
- ✅ Warehouse Module (8 tables)
- ✅ Production Module (6 tables)
- ✅ Ledger Module (11 tables)
- ✅ HR Module (10 tables)
- ✅ Audit Module (1 table)
- ✅ Admin Module (2 tables)

### Indexes:
- ✅ Performance indexes on frequently queried columns
- ✅ Foreign key indexes
- ✅ Status and date indexes

## ⚠️ Important Notes

### If Tables Already Exist

If you get errors like "relation already exists":
- **Option 1**: Drop existing tables first (be careful!)
- **Option 2**: Use `CREATE TABLE IF NOT EXISTS` (modify the SQL)
- **Option 3**: Run individual schema files in order

### If You Get Foreign Key Errors

Make sure to run the schema in order:
1. Extensions first
2. Auth tables (users, roles)
3. Other modules in dependency order

The `APPLY_SCHEMA.sql` file is already in the correct order!

## 🚀 After Schema is Applied

1. **Test Your Connection:**
   - Visit: http://localhost:3000/test-db
   - Create a test supplier
   - Verify data appears in Supabase

2. **Start Building:**
   - Use server actions from `src/actions/`
   - All CRUD operations should work now

3. **Optional: Add Sample Data:**
   - Run `supabase/seed.sql` if you want test data
   - Or create data through your app

## 📚 Alternative: Run Individual Files

If you prefer to run files separately:

1. Run `00_extensions.sql` first
2. Then `01_auth.sql`
3. Then `02_warehouse.sql`
4. Continue in order through `08_indexes.sql`

**Location**: `supabase/schemas/` folder

---

**Ready!** Open Supabase SQL Editor and run `APPLY_SCHEMA.sql` 🎯
