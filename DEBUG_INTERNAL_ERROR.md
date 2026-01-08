# Debug Internal Server Error

## 🔍 Step-by-Step Debugging

### Step 1: Check Terminal Output

**Look at your terminal where `npm run dev` is running.**

You should see the actual error message. Common errors:

- `Missing Supabase environment variables`
- `Table does not exist`
- `Cannot read property of undefined`
- `cookies() can only be used in Server Components`

### Step 2: Check Environment Variables

Verify `.env.local` exists and has correct values:

```bash
# Check file exists
Get-Content C:\VAKEM1\atj-erp\.env.local
```

Should show:
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`

### Step 3: Test Simple Server Action

I've created a simple test action. Try this:

1. **Add to test-db page temporarily:**
   ```tsx
   import { testSimple } from "@/actions/test-simple"
   
   // In your component:
   const simpleTest = await testSimple()
   console.log(simpleTest)
   ```

2. **If this works**, the issue is with Supabase connection
3. **If this fails**, the issue is with server actions setup

### Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Go to **Network** tab
5. Find the request to `/test-db`
6. Check the response - what error does it show?

### Step 5: Common Issues & Fixes

#### Issue: "Missing Supabase environment variables"

**Fix:**
- Verify `.env.local` exists
- Restart dev server (environment variables only load on startup)
- Check variable names are exact (case-sensitive)

#### Issue: "Table does not exist"

**Fix:**
- Apply database schema in Supabase SQL Editor
- Run `supabase/APPLY_SCHEMA.sql`

#### Issue: "cookies() can only be used in Server Components"

**Fix:**
- I've updated `createServerClient()` to handle this
- Restart dev server

#### Issue: Environment variables are empty strings

**Fix:**
- Check `.env.local` has actual values (not just placeholders)
- No extra spaces or quotes
- Restart dev server

## 🧪 Quick Test

Create a simple test page to isolate the issue:

```tsx
// src/app/test-simple/page.tsx
"use client"

import { testSimple } from "@/actions/test-simple"
import { useState } from "react"

export default function TestSimplePage() {
  const [result, setResult] = useState<string>("")

  async function test() {
    const r = await testSimple()
    setResult(JSON.stringify(r, null, 2))
  }

  return (
    <div className="p-8">
      <button onClick={test}>Test Server Action</button>
      <pre>{result}</pre>
    </div>
  )
}
```

Visit: http://localhost:3000/test-simple

## 📋 What to Share

If error persists, please share:

1. **Terminal error message** (exact text)
2. **Browser console errors** (F12 → Console)
3. **Network tab response** (F12 → Network → test-db → Response)
4. **Environment variables status** (are they loaded?)

---

**Check your terminal output first!** That's where the real error message will be. 🔍
