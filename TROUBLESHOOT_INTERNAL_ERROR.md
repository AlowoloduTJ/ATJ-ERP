# Troubleshoot Internal Server Error

## 🔍 Quick Diagnosis

### Step 1: Check Terminal Output

**Most Important:** Look at your terminal where `npm run dev` is running.

You should see the actual error message. Common ones:

```
Error: Missing Supabase environment variables
Error: Table 'suppliers' does not exist
Error: cookies() can only be used in Server Components
TypeError: Cannot read property 'getAll' of undefined
```

### Step 2: Test Simple Server Action

I've created a simple test page that doesn't use Supabase:

**Visit:** http://localhost:3000/test-simple

- **If this works:** Issue is with Supabase connection
- **If this fails:** Issue is with server actions setup

### Step 3: Check Environment Variables

Your `.env.local` exists and has values. But verify they're being loaded:

1. **Restart dev server** (environment variables only load on startup)
2. **Check terminal** - should NOT show "Missing environment variable" errors

### Step 4: Common Fixes

#### Fix 1: Restart Dev Server

```bash
# Stop server (Ctrl+C)
# Then restart:
cd C:\VAKEM1\atj-erp
npm run dev
```

#### Fix 2: Clear Next.js Cache

```bash
# Stop server first
rmdir /s /q .next
npm run dev
```

#### Fix 3: Check Database Schema

If error says "Table does not exist":
- Go to Supabase SQL Editor
- Run `supabase/APPLY_SCHEMA.sql`

#### Fix 4: Check Supabase Project Status

- Go to https://app.supabase.com
- Verify your project is **active** (not paused)
- Check project URL matches `.env.local`

## 🧪 Diagnostic Tests

### Test 1: Simple Server Action
Visit: http://localhost:3000/test-simple
- Tests if server actions work at all

### Test 2: Connection Page
Visit: http://localhost:3000/connect
- Tests Supabase connection with better error handling

### Test 3: Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Go to **Network** tab
5. Find `/test-db` request
6. Check **Response** tab for error details

## 📋 What to Check

- [ ] Terminal shows actual error message
- [ ] `.env.local` file exists
- [ ] Environment variables have values (not empty)
- [ ] Dev server was restarted after creating `.env.local`
- [ ] Supabase project is active
- [ ] Database schema is applied
- [ ] Browser console shows no client-side errors

## 🔧 I've Made These Fixes

1. ✅ Updated `createServerClient()` to handle cookies errors gracefully
2. ✅ Added better error messages in `testConnection()`
3. ✅ Created simple test page (`/test-simple`) to isolate issues
4. ✅ Improved error handling in server actions

## 📞 Next Steps

1. **Check terminal output** - This will show the real error
2. **Test simple page** - http://localhost:3000/test-simple
3. **Share the error message** from terminal if it persists

---

**The terminal output is your best friend!** Check it first. 🔍
