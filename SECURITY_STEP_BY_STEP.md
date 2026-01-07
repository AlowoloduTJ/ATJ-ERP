# 🔒 Security Fix - Step by Step

## 🎯 Goal

Fix all Security Advisor findings without breaking your app.

## 📋 Current Issues

1. **RLS not enabled** - Tables exposed without protection
2. **No policies** - Sensitive data accessible

## 🔧 Fix 1: Enable RLS (5 minutes)

### Step 1.1: Open Supabase

1. Go to: https://app.supabase.com
2. Select "ATJ-ERP" project
3. Click **SQL Editor** → **New query**

### Step 1.2: Run RLS Enablement

1. Open: `supabase/09_enable_rls.sql`
2. Copy ALL (Ctrl+A, Ctrl+C)
3. Paste in SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

### Step 1.3: Verify

- Go to **Table Editor**
- Click `suppliers` table
- See: ✅ "RLS Enabled"

**✅ Fix 1 Complete!**

## 🔧 Fix 2: Create Policies (5 minutes)

### Step 2.1: New Query

1. In SQL Editor, click **New query**

### Step 2.2: Run Policies

1. Open: `supabase/10_rls_policies.sql`
2. Copy ALL (Ctrl+A, Ctrl+C)
3. Paste in SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**✅ Fix 2 Complete!**

## 🧪 Test Your App (2 minutes)

### Test 1: Database Page

1. Visit: http://localhost:3000/test-db
2. ✅ Should work (create/view suppliers)

### Test 2: Connection Page

1. Visit: http://localhost:3000/connect
2. ✅ Should show "Connected"

**✅ App Still Works!**

## 🔍 Verify Security (2 minutes)

### Step 4.1: Run Security Advisor

1. Supabase → **Security** → **Security Advisor**
2. Click **Run scan**
3. Wait for results

### Step 4.2: Check Results

- ✅ Should show: "No issues found" or "All checks passed"
- ✅ RLS findings resolved

**✅ Security Improved!**

## ✅ Done!

**Total Time:** ~15 minutes
**Result:** All security issues fixed, app still works!

---

**Follow these steps to fix all security issues!** 🔒
