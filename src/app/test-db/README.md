# Database Test Page

This page tests your Supabase database connection and CRUD operations.

## Features

- ✅ Connection status indicator
- ✅ Create supplier form
- ✅ Suppliers list with refresh
- ✅ Error handling and feedback
- ✅ Data persistence verification

## Access

Navigate to: **http://localhost:3000/test-db**

## Prerequisites

1. Install Supabase packages:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. Set environment variables (`.env.local`):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

3. Apply database schema (ensure `suppliers` table exists)

## Testing Flow

1. Check connection status (should be green)
2. Create a test supplier
3. Verify it appears in the list
4. Refresh the page
5. Verify data persists
6. Check Supabase dashboard

## Troubleshooting

See `TESTING_DATABASE.md` for detailed troubleshooting steps.
