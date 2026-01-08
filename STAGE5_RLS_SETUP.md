# Stage 5: Database Setup and RLS - Setup Guide

## ✅ Completed Tasks

### 1. SQL Schema Created
- **File:** `supabase/schemas/09_clerk_auth_example.sql`
- **Table:** `user_tasks`
- **Features:**
  - `user_id` column with `DEFAULT (auth.jwt()->>'sub')` - automatically gets Clerk user ID
  - UUID primary key
  - Timestamps (created_at, updated_at)
  - Status field

### 2. RLS Policies Created
All policies check `(auth.jwt()->>'sub') = user_id`:
- ✅ SELECT policy - Users can view only their own tasks
- ✅ INSERT policy - Users can insert only their own tasks
- ✅ UPDATE policy - Users can update only their own tasks
- ✅ DELETE policy - Users can delete only their own tasks

### 3. Supabase Client Helpers Updated
- ✅ **Server-side:** `src/lib/supabase/server.ts` - Updated to use 2025 Clerk pattern
- ✅ **Client-side:** `src/lib/supabase/client.ts` - Updated to use 2025 Clerk pattern

### 4. Test API Route Created
- ✅ **File:** `src/app/api/test-rls/route.ts`
- **Endpoints:**
  - `GET /api/test-rls` - List tasks for current user
  - `POST /api/test-rls` - Create a new task for current user

---

## 📋 Manual Steps Required

### Step 1: Apply SQL Schema in Supabase

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your **ATJ-ERP** project
3. Navigate to **SQL Editor**
4. Click **New query**
5. Open `supabase/schemas/09_clerk_auth_example.sql` in your project
6. Copy the entire contents
7. Paste into the SQL Editor
8. Click **Run** (or press Ctrl+Enter)
9. Verify the table and policies are created:
   - Go to **Table Editor** → Check `user_tasks` table exists
   - Go to **Authentication** → **Policies** → Check policies exist

**Option B: Using Supabase CLI (If configured)**
```bash
supabase db push
```

---

## 🧪 Testing Data Isolation

### Test 1: Create Task as User A
1. Sign in as User A
2. Make a POST request to `/api/test-rls`:
   ```json
   {
     "name": "User A's Task",
     "description": "This is a test task",
     "status": "pending"
   }
   ```
3. Should succeed and return the created task

### Test 2: Read Tasks as User A
1. While signed in as User A
2. Make a GET request to `/api/test-rls`
3. Should return only User A's tasks
4. Verify `user_id` matches User A's Clerk ID

### Test 3: Create Task as User B
1. Sign out and sign in as User B (different account)
2. Make a POST request to `/api/test-rls`:
   ```json
   {
     "name": "User B's Task",
     "description": "This is User B's task",
     "status": "pending"
   }
   ```
3. Should succeed and return the created task

### Test 4: Verify Data Isolation
1. While signed in as User B
2. Make a GET request to `/api/test-rls`
3. Should return **only** User B's tasks
4. Should **NOT** see User A's tasks
5. This confirms RLS is working correctly

### Test 5: Unauthenticated Access
1. Sign out
2. Make a GET request to `/api/test-rls`
3. Should return `401 Unauthorized`
4. This confirms authentication is required

---

## 📊 Table Schema

```sql
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  user_id TEXT NOT NULL DEFAULT (auth.jwt()->>'sub'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Column:**
- `user_id` - Automatically populated from Clerk JWT token's `sub` claim
- Uses `DEFAULT (auth.jwt()->>'sub')` to extract Clerk user ID

---

## 🔒 RLS Policies

All policies use the pattern: `(auth.jwt()->>'sub') = user_id`

**SELECT Policy:**
```sql
CREATE POLICY "Users can view their own tasks"
ON user_tasks FOR SELECT
TO authenticated
USING ((auth.jwt()->>'sub') = user_id);
```

**INSERT Policy:**
```sql
CREATE POLICY "Users must insert their own tasks"
ON user_tasks FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt()->>'sub') = user_id);
```

**UPDATE Policy:**
```sql
CREATE POLICY "Users can update their own tasks"
ON user_tasks FOR UPDATE
TO authenticated
USING ((auth.jwt()->>'sub') = user_id)
WITH CHECK ((auth.jwt()->>'sub') = user_id);
```

**DELETE Policy:**
```sql
CREATE POLICY "Users can delete their own tasks"
ON user_tasks FOR DELETE
TO authenticated
USING ((auth.jwt()->>'sub') = user_id);
```

---

## 🔧 Supabase Client Implementation

### Server-Side (Server Components, API Routes, Server Actions)

**File:** `src/lib/supabase/server.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        const { getToken } = await auth();
        return (await getToken()) ?? null;
      },
    }
  );
}
```

**Usage:**
```typescript
import { createSupabaseClient } from "@/lib/supabase/server";

const supabase = await createSupabaseClient();
const { data } = await supabase.from('user_tasks').select();
```

### Client-Side (Client Components)

**File:** `src/lib/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/nextjs';
import { useMemo } from 'react';

export function useSupabaseClient() {
  const { session } = useSession();
  
  return useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        accessToken: async () => (await session?.getToken()) ?? null,
      }
    );
  }, [session]);
}
```

**Usage:**
```typescript
"use client";
import { useSupabaseClient } from "@/lib/supabase/client";

function MyComponent() {
  const supabase = useSupabaseClient();
  const { data } = await supabase.from('user_tasks').select();
}
```

---

## ✅ Verification Checklist

After applying the SQL:

- [ ] Table `user_tasks` exists in Supabase
- [ ] RLS is enabled on `user_tasks` table
- [ ] All 4 policies (SELECT, INSERT, UPDATE, DELETE) exist
- [ ] Test API route works (`/api/test-rls`)
- [ ] User A can create and read their own tasks
- [ ] User B cannot see User A's tasks
- [ ] Unauthenticated requests are denied

---

## 🎯 Next Steps

Once Stage 5 is complete and tested, proceed to:
- Stage 6: Testing and Polish
- Stage 7: Documentation and Commit

---

**Note:** The Supabase MCP server can be used to apply the SQL if configured. Otherwise, use the Supabase Dashboard SQL Editor as described above.
