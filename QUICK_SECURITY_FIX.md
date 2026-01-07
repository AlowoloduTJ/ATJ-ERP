# 🚀 Quick Security Fix (20 minutes)

## 🎯 The Issues

1. RLS not enabled on tables
2. Tables exposed without protection

## ✅ The Fix (3 Steps)

### Step 1: Enable RLS (5 min)

1. Supabase → SQL Editor → New query
2. Copy `supabase/09_enable_rls.sql`
3. Paste and Run
4. ✅ Done!

### Step 2: Create Policies (5 min)

1. SQL Editor → New query
2. Copy `supabase/10_rls_policies.sql`
3. Paste and Run
4. ✅ Done!

### Step 3: Test & Verify (10 min)

**Test:**
- http://localhost:3000/test-db (should work)

**Verify:**
- Supabase → Security → Security Advisor
- Run scan (should pass)

## ✅ Success!

- ✅ RLS enabled
- ✅ Policies created
- ✅ App works
- ✅ Security improved

---

**That's it!** Follow the 3 steps above. 🎯
