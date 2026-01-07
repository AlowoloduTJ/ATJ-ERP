# Supabase Integration Setup

This document explains how Supabase is integrated into the ATJ-ERP Next.js application.

## 📦 Installation

The Supabase JavaScript client library is installed:

```bash
npm install @supabase/supabase-js
```

**Documentation**: [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 🏗️ Architecture

The Supabase integration follows Next.js 15 App Router best practices with separate clients for different contexts:

### Client Structure

```
src/lib/supabase/
├── client.ts      # Client-side client (browser)
├── server.ts      # Server-side client (Server Components, API Routes)
├── middleware.ts  # Middleware client (Next.js middleware)
└── index.ts      # Centralized exports
```

## 🔐 Client Types & Security

### 1. Client-Side Client (`client.ts`)

**Used in:**
- Client Components (`"use client"`)
- Browser environments
- Client-side hooks

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Public, safe to expose
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public, safe to expose

**Security:**
- ✅ Uses `NEXT_PUBLIC_` variables (exposed to browser)
- ✅ Respects Row Level Security (RLS) policies
- ✅ Automatically handles authentication state
- ✅ Manages cookies for session persistence

**Usage:**
```tsx
"use client"

import { createClient } from "@/lib/supabase/client"

export function MyComponent() {
  const supabase = createClient()
  
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) console.error(error)
    return data
  }
  
  // ...
}
```

**Documentation**: [Creating a Client](https://supabase.com/docs/reference/javascript/creating-a-client)

### 2. Server-Side Client (`server.ts`)

**Used in:**
- Server Components
- API Routes (Route Handlers)
- Server Actions

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Public
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public
- `SUPABASE_SERVICE_ROLE_KEY` - **Server-only, keep secret!**

**Security:**
- ✅ Reads cookies to get user session
- ✅ Automatically handles authentication
- ✅ Can use service role key for admin operations (server-only)

**Usage in Server Components:**
```tsx
import { createServerClient } from "@/lib/supabase/server"

export default async function ServerComponent() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
  
  return <div>{/* render data */}</div>
}
```

**Usage in API Routes:**
```tsx
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
  
  return Response.json(data)
}
```

**Admin Client (Service Role):**
```tsx
import { createAdminClient } from "@/lib/supabase/server"

// ⚠️ WARNING: Bypasses RLS - use only for admin operations
export async function adminOperation() {
  const supabase = createAdminClient()
  // This client has full access, bypasses Row Level Security
}
```

**Documentation**: 
- [Server-Side Client](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Service Role Key](https://supabase.com/docs/guides/auth/row-level-security#service-role-key)

### 3. Middleware Client (`middleware.ts`)

**Used in:**
- Next.js middleware
- Route protection
- Session refresh

**Security:**
- ✅ Handles cookie management for middleware
- ✅ Can refresh user sessions
- ✅ Used for route protection

**Usage:**
```tsx
// middleware.ts
import { createMiddlewareClient } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  
  const { data: { session } } = await supabase.auth.getSession()
  
  // Protect routes
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

**Documentation**: [Next.js Middleware](https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware)

## 🔑 Environment Variables

### Required Variables

Create a `.env.local` file (or add to your environment):

```bash
# Public (Client-Side) - Safe to expose
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Server-Only (Keep Secret!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Getting Your Keys

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

**Documentation**: [API Settings](https://supabase.com/docs/guides/getting-started/local-development#api-keys)

## 🛡️ Security Best Practices

### ✅ DO:

1. **Use Anon Key for Client-Side**
   - Safe to expose in browser
   - Respects Row Level Security (RLS)
   - User can only access their own data (if RLS is configured)

2. **Use Service Role Key Server-Side Only**
   - Never expose to browser
   - Only use in Server Components, API Routes, Server Actions
   - Bypasses RLS - use with caution

3. **Enable Row Level Security (RLS)**
   - Configure RLS policies in Supabase dashboard
   - Ensures users can only access authorized data
   - Works with anon key

4. **Validate Environment Variables**
   - Use the `env.ts` utility for validation
   - Ensure required variables are present

### ❌ DON'T:

1. **Don't Expose Service Role Key**
   - Never use `NEXT_PUBLIC_` prefix for service role key
   - Never commit to version control
   - Never use in client components

2. **Don't Skip RLS**
   - Always enable Row Level Security on tables
   - Don't rely solely on application-level security

3. **Don't Store Secrets in Code**
   - Always use environment variables
   - Never hardcode API keys

**Documentation**: 
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Security Best Practices](https://supabase.com/docs/guides/platform/security)

## 📚 Usage Examples

### Authentication

```tsx
// Client Component
"use client"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

**Documentation**: [Authentication](https://supabase.com/docs/reference/javascript/auth-signup)

### Database Queries

```tsx
// Server Component
import { createServerClient } from "@/lib/supabase/server"

const supabase = await createServerClient()

// Select
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('status', 'active')

// Insert
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John', email: 'john@example.com' })

// Update
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Jane' })
  .eq('id', userId)

// Delete
const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('id', userId)
```

**Documentation**: [Database Queries](https://supabase.com/docs/reference/javascript/select)

### Real-time Subscriptions

```tsx
"use client"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"

const supabase = createClient()

useEffect(() => {
  const channel = supabase
    .channel('users')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'users' },
      (payload) => {
        console.log('New user:', payload.new)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

**Documentation**: [Real-time Subscriptions](https://supabase.com/docs/reference/javascript/subscribe)

## 🔄 Migration from Custom API Client

If you're migrating from the custom `apiClient`, you can:

1. **Replace API calls with Supabase queries**
   ```tsx
   // Old way
   const data = await apiClient.get('/users')
   
   // New way
   const { data } = await supabase.from('users').select()
   ```

2. **Use Supabase Auth instead of custom auth**
   ```tsx
   // Old way
   await authService.login(credentials)
   
   // New way
   await supabase.auth.signInWithPassword(credentials)
   ```

3. **Keep API routes for complex operations**
   - Use Supabase client in API routes
   - Keep custom logic in API routes if needed

## 📖 Additional Resources

- **Main Documentation**: [Supabase JavaScript Reference](https://supabase.com/docs/reference/javascript/introduction)
- **Next.js Guide**: [Supabase with Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- **Authentication**: [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- **Row Level Security**: [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- **TypeScript Types**: [Generating Types](https://supabase.com/docs/guides/api/generating-types)

---

**Next Steps:**
1. Set up environment variables (`.env.local`)
2. Configure Row Level Security in Supabase dashboard
3. Start using Supabase clients in your components
4. Generate TypeScript types from your database schema
