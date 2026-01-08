# 🔒 Quick RLS Fix

## 🎯 The Problem

Security Advisor found:
- Tables exposed without RLS protection
- RLS not enabled

## ✅ The Solution

Enable RLS on all tables + create basic policies.

## 📝 2 Steps to Fix

### Step 1: Enable RLS

1. Supabase → SQL Editor → New query
2. Copy `supabase/09_enable_rls.sql`
3. Paste and Run

### Step 2: Create Policies

1. SQL Editor → New query
2. Copy `supabase/10_rls_policies.sql`
3. Paste and Run

## ✅ Done!

Re-run Security Advisor - should pass now.

---

**That's it!** Apply the 2 SQL files. 🔒
