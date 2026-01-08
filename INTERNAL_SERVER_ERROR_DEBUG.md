# Internal Server Error - Debugging Guide

## 🔍 Quick Diagnosis

### Step 1: Check Where the Error Occurs

**Which page shows the error?**
- Homepage (`/`)
- Sign-in page (`/sign-in`)
- Sign-up page (`/sign-up`)
- Dashboard (`/dashboard`)
- Other page?

### Step 2: Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Copy the exact error message

### Step 3: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Find the failed request (red status)
5. Click on it
6. Check **Response** tab for error details

### Step 4: Check Terminal/Server Logs

**If running locally:**
- Check terminal where `npm run dev` is running
- Look for error messages

**If on Vercel:**
- Go to Vercel Dashboard
- Click on your deployment
- Check **Function Logs**
- Look for error messages

---

## 🐛 Common Causes & Fixes

### 1. Missing Environment Variables

**Error:** "Missing publishableKey" or "Missing Supabase environment variables"

**Fix:**
- **Local:** Check `.env.local` has all required variables
- **Vercel:** Add environment variables in Vercel Dashboard → Settings → Environment Variables
- Restart dev server after adding variables

**Required Variables:**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

### 2. Clerk Not Initialized

**Error:** Clerk-related errors in console

**Fix:**
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Check Clerk dashboard for key validity
- Restart dev server

---

### 3. Supabase Connection Failed

**Error:** Supabase connection errors

**Fix:**
- Verify Supabase project is active
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Test connection at `/connect` page

---

### 4. Middleware Error

**Error:** Middleware-related errors

**Fix:**
- I've added error handling to middleware
- If error persists, check middleware logs
- Verify Clerk keys are set

---

### 5. API Route Error

**Error:** Error when calling API endpoints

**Fix:**
- Check API route error handling
- Verify required dependencies are available
- Check API route logs

---

## 🛠️ Quick Fixes

### Fix 1: Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Fix 2: Clear Cache
```bash
# Stop server first
rmdir /s /q .next
npm run dev
```

### Fix 3: Verify Environment Variables
```bash
# Check .env.local exists and has values
type .env.local
```

### Fix 4: Check Vercel Environment Variables
- Go to Vercel Dashboard
- Settings → Environment Variables
- Verify all variables are set

---

## 📋 What Information I Need

To help debug, please provide:

1. **Exact error message** (from browser console or server logs)
2. **Which page** shows the error
3. **When it occurs** (on page load, on action, etc.)
4. **Environment** (local dev server or Vercel deployment)
5. **Browser console errors** (if any)
6. **Network tab** response (if available)

---

## ✅ Recent Fixes Applied

1. ✅ Added error handling to middleware
2. ✅ Made ClerkProvider build-safe
3. ✅ Moved Supabase validation to runtime
4. ✅ Added dynamic route markers to API routes

---

**Next Step:** Check the browser console or server logs for the specific error message, then we can fix it!
