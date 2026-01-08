# Pre-Merge Checklist - Auth Flow Branch

**Date:** 2026-01-07  
**Branch:** `auth-flow`  
**Target:** `main`

---

## ✅ Code Implementation Status

### Completed:
- ✅ All authentication pages created (`/sign-up`, `/sign-in`, `/onboarding`)
- ✅ Clerk + Supabase integration implemented (2025 native pattern)
- ✅ Middleware with protected routes and onboarding checks
- ✅ 3-screen onboarding flow with JWT refresh pattern
- ✅ UserButton in header
- ✅ RLS example table and policies (SQL created)
- ✅ Test API route for RLS (`/api/test-rls`)
- ✅ Test page for data isolation (`/test-rls`)
- ✅ Hydration error fixed (browser extension attributes)
- ✅ Secrets security audit completed

### Code Quality:
- ✅ No linter errors
- ✅ TypeScript types properly defined
- ✅ No hardcoded secrets
- ✅ Environment variables properly configured

---

## ⚠️ Pre-Merge Checklist Status

### 1. Preview Deployment Testing
**Status:** ⚠️ **NOT VERIFIED**
- [ ] Preview deployment created (Vercel preview from `auth-flow` branch)
- [ ] Preview URL tested
- [ ] All pages accessible on preview
- [ ] Auth flows work on preview

**Action Required:** Push `auth-flow` branch to trigger Vercel preview, then test

---

### 2. Auth Flows Testing
**Status:** ⚠️ **MANUAL TESTING REQUIRED**

**Signup Flow:**
- [x] Signup page created at `/sign-up`
- [ ] Test: Create new account → redirects to `/onboarding`
- [ ] Test: Complete onboarding → redirects to `/dashboard`
- [ ] Test: Skip onboarding → redirects to `/dashboard`

**Login Flow:**
- [x] Login page created at `/sign-in`
- [ ] Test: Login with valid credentials → redirects to `/dashboard`
- [ ] Test: Login with invalid credentials → shows error
- [ ] Test: Returning user skips onboarding

**Logout Flow:**
- [x] UserButton implemented
- [ ] Test: Sign out → redirects to landing page
- [ ] Test: Session cleared after logout

**Onboarding Flow:**
- [x] 3-screen onboarding created
- [ ] Test: All 3 screens display correctly
- [ ] Test: Navigation between screens works
- [ ] Test: Skip functionality works
- [ ] Test: Back button works
- [ ] Test: JWT refresh pattern works (no infinite loops)

**Action Required:** Manual testing with actual Clerk accounts

---

### 3. Data Isolation Verification
**Status:** ⚠️ **PENDING SQL APPLICATION**

**Prerequisites:**
- [ ] SQL schema applied in Supabase Dashboard (`supabase/schemas/09_clerk_auth_example.sql`)
- [ ] RLS policies enabled
- [ ] `user_tasks` table created

**Testing:**
- [x] Test page created at `/test-rls`
- [ ] Test: User A creates tasks → tasks visible to User A
- [ ] Test: User B logs in → cannot see User A's tasks
- [ ] Test: User B creates tasks → only User B's tasks visible
- [ ] Test: Unauthenticated access → 401 error

**Action Required:** Apply SQL schema, then test data isolation

---

### 4. Mobile Responsiveness
**Status:** ⚠️ **MANUAL TESTING REQUIRED**

**Code Status:**
- ✅ Responsive Tailwind classes applied
- ✅ Mobile-friendly button sizes
- ✅ Responsive padding and spacing

**Testing Required:**
- [ ] Test auth pages on mobile device
- [ ] Test onboarding screens on mobile
- [ ] Test UserButton dropdown on mobile
- [ ] Verify no horizontal scrolling
- [ ] Verify buttons are easily tappable

**Action Required:** Test on actual mobile device or Chrome DevTools mobile emulation

---

### 5. Console Errors
**Status:** ✅ **FIXED**

**Recent Fixes:**
- ✅ Hydration error fixed (browser extension attributes)
- ✅ Module not found error fixed (`@clerk/nextjs` installed)

**Verification:**
- [ ] No console errors on landing page
- [ ] No console errors on auth pages
- [ ] No console errors on onboarding
- [ ] No console errors on dashboard

**Action Required:** Manual verification in browser console

---

### 6. Environment Variables in Vercel
**Status:** ⚠️ **MANUAL VERIFICATION REQUIRED**

**Required Variables:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (if using admin client)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding`

**Action Required:** Verify in Vercel Dashboard → Settings → Environment Variables

---

### 7. Clerk Domains Configuration
**Status:** ⚠️ **MANUAL VERIFICATION REQUIRED**

**Required Checks:**
- [ ] Clerk instance domain configured in Supabase (Third-Party Auth)
- [ ] Supabase configured in Clerk (Integrations → Supabase)
- [ ] Session token customized in Clerk (Sessions → Customize session token)
- [ ] Redirect URLs configured in Clerk (Settings → Paths)
- [ ] Production domain added to Clerk (if deploying to production)

**Action Required:** Verify in Clerk Dashboard

---

### 8. PR Created and Reviewed
**Status:** ⚠️ **NOT CREATED**

**Required:**
- [ ] Commit all changes to `auth-flow` branch
- [ ] Push `auth-flow` branch to GitHub
- [ ] Create Pull Request: `auth-flow` → `main`
- [ ] Review PR (self-review or team review)
- [ ] Verify all files in PR are correct
- [ ] Verify no secrets in PR diff

**Action Required:** Create PR after committing changes

---

### 9. No Sensitive Data Committed
**Status:** ✅ **VERIFIED**

**Security Audit Results:**
- ✅ `.env.local` is in `.gitignore`
- ✅ No hardcoded secrets in code
- ✅ No secrets in git history
- ✅ Only environment variable references in code

**Action Required:** None - Secrets are protected

---

## 📋 Uncommitted Changes

**Modified Files:**
- `src/app/layout.tsx` (hydration fix)
- `src/docs/auth-flow/auth-flow-prd.md` (updates)
- `README.md` (environment variables)
- `package.json` / `package-lock.json` (@clerk/nextjs)
- Various other files

**New Files:**
- `src/app/(auth)/` - Auth pages
- `src/app/test-rls/` - Test page
- `src/middleware.ts` - Route protection
- `supabase/schemas/09_clerk_auth_example.sql` - RLS example
- Multiple documentation files

**Action Required:** Commit all changes before creating PR

---

## 🚨 Critical Items Before Merge

### Must Complete:
1. ⚠️ **Commit all changes** to `auth-flow` branch
2. ⚠️ **Push branch** to GitHub
3. ⚠️ **Test preview deployment** (Vercel will create preview after push)
4. ⚠️ **Manual testing** of auth flows on preview
5. ⚠️ **Apply SQL schema** in Supabase Dashboard
6. ⚠️ **Test data isolation** after SQL application
7. ⚠️ **Verify environment variables** in Vercel
8. ⚠️ **Create PR** and review

### Recommended:
- Test on mobile device
- Test error states
- Test session persistence
- Verify Clerk domain configuration

---

## ✅ Ready for Merge?

**Status:** ⚠️ **NOT YET**

**Blockers:**
1. Changes not committed
2. Branch not pushed to GitHub
3. PR not created
4. Preview deployment not tested
5. Manual testing not completed
6. SQL schema not applied
7. Environment variables not verified in Vercel

**Recommendation:**
1. Complete all manual testing first
2. Apply SQL schema
3. Test data isolation
4. Verify Vercel environment variables
5. Commit and push changes
6. Create PR
7. Test preview deployment
8. Then merge to main

---

## 📝 Next Steps

1. **Complete Manual Testing:**
   - Test all auth flows locally
   - Test on mobile device
   - Verify console has no errors

2. **Apply SQL Schema:**
   - Run `supabase/schemas/09_clerk_auth_example.sql` in Supabase Dashboard
   - Test data isolation

3. **Verify Configuration:**
   - Check Clerk dashboard settings
   - Verify Vercel environment variables

4. **Commit and Push:**
   - Stage all changes
   - Commit with conventional commit message
   - Push to GitHub

5. **Create PR:**
   - Create Pull Request: `auth-flow` → `main`
   - Review PR diff
   - Test preview deployment

6. **Final Testing:**
   - Test all flows on preview deployment
   - Verify production readiness

7. **Merge:**
   - Approve PR
   - Merge to main
   - Delete `auth-flow` branch

---

**Last Updated:** 2026-01-07
