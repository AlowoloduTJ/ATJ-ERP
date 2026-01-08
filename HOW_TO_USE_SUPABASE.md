# How to Use Supabase in Your Project

## ✅ Your Supabase Project

**Project URL**: `https://svtlzyfmzeizkxeigbzc.supabase.co`

## 🔑 Get Your API Keys

1. Go to: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Update .env.local

I've created `.env.local` with your project URL. Now add your keys:

```bash
# Already set (your project URL)
NEXT_PUBLIC_SUPABASE_URL=https://svtlzyfmzeizkxeigbzc.supabase.co

# Add these from Supabase dashboard:
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=paste-your-service-role-key-here

NEXT_PUBLIC_API_URL=/api
```

## 🚀 How to Use Supabase (Correct Way)

### ❌ Don't Do This (Your Current Approach)

```tsx
// ❌ This won't work well with Next.js App Router
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://svtlzyfmzeizkxeigbzc.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```

**Problems:**
- Hardcodes URL (should use env vars)
- Uses wrong env var name (`SUPABASE_KEY` doesn't exist)
- Doesn't work with Next.js App Router authentication
- No cookie management for sessions

### ✅ Do This Instead

#### For Client Components (Browser)

```tsx
"use client"

import { createClient } from "@/lib/supabase/client"

export function MyComponent() {
  const supabase = createClient()
  
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
    
    if (error) console.error(error)
    return data
  }
  
  // ...
}
```

#### For Server Components / Server Actions

```tsx
import { createServerClient } from "@/lib/supabase/server"

export default async function ServerPage() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
  
  return <div>{/* render data */}</div>
}
```

#### For API Routes

```tsx
import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
```

## 🎯 Why Our Setup is Better

1. **Next.js App Router Compatible**
   - Uses `@supabase/ssr` for proper cookie management
   - Handles authentication state automatically
   - Works with server components

2. **Environment Variables**
   - Uses proper naming (`NEXT_PUBLIC_*` for client-side)
   - Centralized in `src/utils/env.ts`
   - Type-safe configuration

3. **Security**
   - Client-side uses anon key (safe to expose)
   - Server-side can use service role key (kept secret)
   - Proper separation of concerns

4. **Session Management**
   - Automatic cookie handling
   - Session refresh
   - Works with Next.js middleware

## 📚 Examples in Your Project

### Test Connection
- **Page**: `/test-db` - Test database operations
- **Page**: `/connect` - Check connection status

### Server Actions
All server actions in `src/actions/` use the proper setup:
- `src/actions/warehouse.ts` - Inventory & suppliers
- `src/actions/production.ts` - Products & orders
- `src/actions/ledger.ts` - Clients & expenses
- `src/actions/hr.ts` - Employees & attendance

## ✅ Quick Start

1. **Add your keys to `.env.local`** (I've created the file with your URL)
2. **Restart dev server**: `npm run dev`
3. **Test connection**: Visit http://localhost:3000/connect
4. **Use the clients**: Import from `@/lib/supabase/client` or `@/lib/supabase/server`

---

**Your project is already set up correctly!** Just add your API keys to `.env.local` and use the existing client functions. 🎯
