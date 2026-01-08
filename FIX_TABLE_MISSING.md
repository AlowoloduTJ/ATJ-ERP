# 🔧 Fix: Table 'suppliers' Does Not Exist

## ✅ Error Identified

**Error:** `Could not find the table 'public.suppliers' in the schema cache`
**Code:** PGRST205
**Solution:** Apply database schema to create all tables

## 🚀 Quick Fix: Apply Database Schema

### Step 1: Open Supabase SQL Editor

1. Go to: **https://app.supabase.com**
2. Select your **"ATJ-ERP"** project
3. Click **SQL Editor** in the left sidebar
4. Click **New query** button

### Step 2: Copy Schema File

1. Open the file: `supabase/APPLY_SCHEMA.sql` in your project
2. **Select ALL** content (Ctrl+A)
3. **Copy** it (Ctrl+C)

### Step 3: Paste and Run

1. **Paste** the SQL into Supabase SQL Editor
2. Click **Run** button (or press Ctrl+Enter)
3. Wait for execution to complete
4. You should see: **"Success. No rows returned"**

### Step 4: Verify Tables Created

1. In Supabase, go to **Table Editor** (left sidebar)
2. You should see all tables listed:
   - `suppliers` ✅
   - `inventory` ✅
   - `products` ✅
   - `clients` ✅
   - `employees` ✅
   - And many more...

### Step 5: Test Again

After applying schema:

1. **Visit:** http://localhost:3000/test-db
2. Should now work without errors!
3. Try creating a test supplier

## 📋 What Gets Created

The schema creates **40+ tables** including:
- ✅ `suppliers` (for your test page)
- ✅ `inventory`, `inventory_categories`
- ✅ `products`, `production_orders`
- ✅ `clients`, `customers`, `expenses`
- ✅ `employees`, `departments`, `attendance`
- ✅ And all related tables with indexes

## 🔍 Alternative: Run Individual Files

If you prefer to run files separately:

1. Run `00_extensions.sql` first
2. Then `01_auth.sql`
3. Then `02_warehouse.sql` (this creates `suppliers` table)
4. Continue through `08_indexes.sql`

**Location:** `supabase/schemas/` folder

## ✅ After Schema is Applied

1. **Refresh test page**: http://localhost:3000/test-db
2. **Connection status** should show "Connected"
3. **Create test supplier** - should work!
4. **Check Supabase dashboard** - data should appear

---

**Apply the schema in Supabase SQL Editor and the error will be fixed!** 🎯
