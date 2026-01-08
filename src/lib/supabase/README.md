# Supabase Clients

This directory contains Supabase client configurations for different Next.js contexts.

## Files

- **`client.ts`** - Client-side client (for "use client" components)
- **`server.ts`** - Server-side client (for Server Components and API Routes)
- **`middleware.ts`** - Middleware client (for Next.js middleware)
- **`index.ts`** - Centralized exports

## Quick Start

### Client Component
```tsx
"use client"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
```

### Server Component
```tsx
import { createServerClient } from "@/lib/supabase/server"

const supabase = await createServerClient()
```

### API Route
```tsx
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerClient()
  // ...
}
```

### Middleware
```tsx
import { createMiddlewareClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  // ...
}
```

## Documentation

See `SUPABASE_SETUP.md` in the project root for complete documentation.
