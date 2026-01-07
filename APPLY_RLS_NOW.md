# 🚀 Apply RLS Now - Quick Guide

## ✅ Security Findings

- Tables exposed without RLS protection
- RLS not enabled on tables

## 🔒 Fix: Enable Row Level Security

### Step 1: Enable RLS

1. Go to: https://app.supabase.com
2. Select your project
3. **SQL Editor** → **New query**
4. Copy `supabase/09_enable_rls.sql`
5. Paste and **Run**

### Step 2: Create Policies

1. In SQL Editor (new query)
2. Copy `supabase/10_rls_policies.sql`
3. Paste and **Run**

### Step 3: Verify

1. Re-run Security Advisor
2. Should show: ✅ All findings resolved

## ⚠️ Note

Policies include **temporary anonymous access** for testing.
Remove in production!

---

**That's it!** Apply the 2 SQL files and security findings are fixed. 🔒
