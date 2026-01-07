# 🔒 Apply Row Level Security (RLS) - Step by Step

## 🎯 Goal

Enable RLS on all tables to fix Security Advisor findings.

## 📝 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to: **https://app.supabase.com**
2. Sign in if needed
3. Select your **"ATJ-ERP"** project
4. Click **SQL Editor** in the left sidebar
5. Click **New query** button

### Step 2: Enable RLS on All Tables

1. In your project, open: `supabase/09_enable_rls.sql`
2. **Select ALL** content (Ctrl+A)
3. **Copy** it (Ctrl+C)
4. **Paste** into Supabase SQL Editor
5. Click **Run** button (or press Ctrl+Enter)
6. Wait for "Success. No rows returned"

**What this does:**
- Enables RLS on all 40+ tables
- Protects sensitive data (users, employees, expenses, payroll, etc.)

### Step 3: Create Basic Policies

1. In Supabase SQL Editor, click **New query** again
2. In your project, open: `supabase/10_rls_policies.sql`
3. **Select ALL** content (Ctrl+A)
4. **Copy** it (Ctrl+C)
5. **Paste** into Supabase SQL Editor
6. Click **Run** button
7. Wait for "Success. No rows returned"

**What this does:**
- Creates policies for authenticated users
- Adds temporary anonymous access for testing
- Allows `/test-db` page to work

### Step 4: Verify RLS is Enabled

1. In Supabase, go to **Table Editor**
2. Click on any table (e.g., `suppliers`)
3. Look for **"Row Level Security"** indicator
4. Should show: ✅ **"RLS Enabled"**

### Step 5: Test Your App

1. Visit: http://localhost:3000/test-db
2. Should still work (policies allow anonymous access for testing)
3. Try creating a test supplier
4. Should work without errors

### Step 6: Re-run Security Advisor

1. In Supabase Dashboard, go to **Security** → **Security Advisor**
2. Click **Run scan** or **Refresh**
3. Should show:
   - ✅ RLS enabled on all tables
   - ✅ All findings resolved

## ⚠️ Important Notes

### Temporary Anonymous Access

The policies include anonymous access for testing:
```sql
CREATE POLICY "Allow anonymous read on suppliers for testing" ON suppliers
    FOR SELECT USING (true);
```

**This allows your test page to work without authentication.**

**Before Production:**
- Remove anonymous access policies
- Implement Supabase Auth
- Create role-based policies
- Restrict access by user/role

### What Gets Protected

RLS now protects:
- ✅ User data (emails, passwords)
- ✅ Employee data (salaries, personal info)
- ✅ Financial data (expenses, transactions, payroll)
- ✅ All sensitive business data

## ✅ Success Checklist

After applying RLS:
- [ ] `09_enable_rls.sql` executed successfully
- [ ] `10_rls_policies.sql` executed successfully
- [ ] Tables show "RLS Enabled" in Table Editor
- [ ] Test page still works
- [ ] Security Advisor shows all findings resolved

## 🔍 Troubleshooting

### Error: "relation does not exist"

**Solution:** Apply main schema first (`supabase/APPLY_SCHEMA.sql`)

### Error: "policy already exists"

**Solution:** This is fine - policy already exists, skip it

### Test page stops working

**Solution:** Check that anonymous policies were created (Step 3)

---

**Follow the steps above to enable RLS and fix security findings!** 🔒
