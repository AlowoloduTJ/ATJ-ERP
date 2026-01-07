# 🔒 Fix Supabase Security Advisor Findings

## ✅ Findings to Fix

1. **Tables exposed without RLS protection** - Contains sensitive data (PII, credentials, financial info)
2. **RLS not enabled** - Row Level Security not enabled on tables exposed to PostgREST

## 🔍 Step 1: Checked for Hardcoded Keys

### ✅ Result: No Hardcoded Keys Found

**Verified all files:**
- ✅ `src/lib/supabase/client.ts` - Uses `config.supabaseAnonKey` (from env)
- ✅ `src/lib/supabase/server.ts` - Uses `config.supabaseServiceRoleKey` (from env)
- ✅ `src/utils/env.ts` - Reads from `process.env` correctly
- ✅ All action files - Use server client (secure)

**No changes needed** - Keys are already in environment variables!

## 🔧 Step 2: Environment Variables (Already Secure)

### Current Setup ✅

**Client-Side (Safe):**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://svtlzyfmzeizkxeigbzc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon key - safe to expose)
```

**Server-Side Only (Secret):**
```bash
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service role - keep secret!)
```

**Status:** ✅ Already secure - no changes needed

## 🔒 Step 3: Enable Row Level Security (RLS)

### Files Created

1. **`supabase/09_enable_rls.sql`** - Enables RLS on all tables
2. **`supabase/10_rls_policies.sql`** - Creates basic policies for testing

### How to Apply

#### Option A: Apply RLS to Existing Tables

1. **Open Supabase SQL Editor**
   - Go to: https://app.supabase.com
   - Select your "ATJ-ERP" project
   - Click **SQL Editor** → **New query**

2. **Run RLS Enablement**
   - Open: `supabase/09_enable_rls.sql`
   - Copy ALL content
   - Paste into SQL Editor
   - Click **Run**

3. **Run RLS Policies**
   - Open: `supabase/10_rls_policies.sql`
   - Copy ALL content
   - Paste into SQL Editor
   - Click **Run**

#### Option B: Apply Schema + RLS Together

If you haven't applied the schema yet:
1. Run `supabase/APPLY_SCHEMA.sql` first
2. Then run `supabase/09_enable_rls.sql`
3. Then run `supabase/10_rls_policies.sql`

## ⚠️ Important: Testing Policies

The policies include **temporary anonymous access** for testing:

```sql
-- Allows unauthenticated access for testing
CREATE POLICY "Allow anonymous read on suppliers for testing" ON suppliers
    FOR SELECT USING (true);
```

**This allows your test page to work without authentication.**

**For Production:**
- Remove anonymous access policies
- Implement Supabase Auth
- Create role-based policies
- Restrict access by user/role

## 📋 Step 4: File Changes

### New Files Created

1. **`supabase/09_enable_rls.sql`**
   - Enables RLS on all 40+ tables
   - Protects: users, employees, expenses, payroll, etc.

2. **`supabase/10_rls_policies.sql`**
   - Basic policies for development
   - Temporary anonymous access for testing
   - Comments for production customization

### No Code Changes Needed ✅

- Keys already use environment variables
- Service role key only used server-side
- Client uses anon key (safe)

## 🔄 Step 5: Re-run Security Advisor

After applying RLS:

1. Go to Supabase Dashboard
2. **Security** → **Security Advisor**
3. Click **Run scan** or **Refresh**
4. Should show:
   - ✅ RLS enabled on all tables
   - ✅ No exposed sensitive data

## 📊 Before/After Status

### Before ❌
- RLS not enabled
- Tables exposed without protection
- Security Advisor flags issues

### After ✅
- RLS enabled on all tables
- Basic policies created
- Security Advisor should pass
- ⚠️ Temporary anonymous access (remove in production)

## 🎯 Next Steps

1. **Apply RLS** - Run SQL files in Supabase
2. **Test** - Verify `/test-db` still works
3. **Re-run Security Advisor** - Verify fixes
4. **Customize Policies** - For production needs
5. **Remove Anonymous Access** - Before production launch

---

**Apply the RLS SQL files in Supabase to fix the security findings!** 🔒
