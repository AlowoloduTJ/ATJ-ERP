# Debug Internal Server Error

## 🔍 Common Causes

### 1. Missing Environment Variables at Runtime
**Symptoms:** Internal Server Error when accessing pages that use Supabase/Clerk

**Check:**
- Are environment variables set in Vercel?
- Are they set for the correct environment (Production/Preview)?
- Variable names are exact (case-sensitive)

**Fix:**
- Add all required environment variables in Vercel Dashboard
- Verify variable names match exactly

---

### 2. Clerk Authentication Errors
**Symptoms:** Error when accessing protected routes or auth pages

**Check:**
- Is `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` set?
- Is `CLERK_SECRET_KEY` set?
- Are Clerk keys correct (test vs live)?

**Fix:**
- Verify Clerk keys in Vercel environment variables
- Check Clerk dashboard for key validity

---

### 3. Supabase Connection Errors
**Symptoms:** Error when accessing pages that query Supabase

**Check:**
- Is `NEXT_PUBLIC_SUPABASE_URL` set?
- Is `NEXT_PUBLIC_SUPABASE_ANON_KEY` set?
- Is Supabase project active?

**Fix:**
- Verify Supabase keys in Vercel
- Check Supabase dashboard for project status

---

### 4. Middleware Errors
**Symptoms:** Error on every page load

**Check:**
- Middleware trying to access Clerk/Supabase without proper setup
- Missing environment variables in middleware

**Fix:**
- Ensure middleware has access to required env vars
- Check middleware error handling

---

### 5. API Route Errors
**Symptoms:** Error when calling API endpoints

**Check:**
- API routes trying to access Supabase without auth
- Missing error handling in API routes

**Fix:**
- Add proper error handling
- Verify API routes have required dependencies

---

## 🛠️ Debugging Steps

### Step 1: Check Vercel Logs
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Deployments** tab
4. Click on the failed deployment
5. Check **Function Logs** or **Build Logs**
6. Look for specific error messages

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Check **Network** tab for failed requests

### Step 3: Verify Environment Variables
1. Vercel Dashboard → Settings → Environment Variables
2. Verify all required variables are set:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (if used)
   - All redirect URL variables

### Step 4: Test Locally
1. Ensure `.env.local` has all variables
2. Run `npm run dev`
3. Test the same page that's failing
4. Check terminal for error messages

---

## 🔧 Quick Fixes

### If Error is About Missing Keys:
1. Add missing environment variables in Vercel
2. Redeploy the application

### If Error is About Database:
1. Check Supabase project is active
2. Verify database connection
3. Check if tables exist

### If Error is About Authentication:
1. Verify Clerk keys are correct
2. Check Clerk dashboard for project status
3. Verify Clerk + Supabase integration is configured

---

## 📋 Error Log Checklist

When reporting the error, include:
- [ ] Exact error message from browser console
- [ ] Error from Vercel function logs
- [ ] Which page/route is failing
- [ ] When the error occurs (on load, on action, etc.)
- [ ] Environment (local vs Vercel)
- [ ] Browser and version

---

**Next Step:** Check Vercel logs for the specific error message to identify the exact cause.
