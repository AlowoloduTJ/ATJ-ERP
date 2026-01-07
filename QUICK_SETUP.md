# Quick Setup - Connect to Your Supabase Project

## ✅ Your Supabase Project

**URL**: `https://svtlzyfmzeizkxeigbzc.supabase.co`

## 🔑 Step 1: Get Your API Keys

1. Go to: https://app.supabase.com
2. Select your project
3. **Settings** → **API**
4. Copy:
   - **anon public** key
   - **service_role** key

## 📝 Step 2: Update .env.local

I've created `.env.local` with your project URL. Add your keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://svtlzyfmzeizkxeigbzc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=paste-service-role-key-here
NEXT_PUBLIC_API_URL=/api
```

## 🚀 Step 3: Use Supabase in Your Code

### Client Component
```tsx
"use client"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
```

### Server Component / Server Action
```tsx
import { createServerClient } from "@/lib/supabase/server"

const supabase = await createServerClient()
```

## ✅ Step 4: Test

```bash
npm run dev
# Visit: http://localhost:3000/connect
```

Should show: ✅ **"Connected to Supabase"**

---

**That's it!** Your project is already configured correctly. Just add your keys! 🎯
