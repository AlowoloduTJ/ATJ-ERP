# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Supabase Configuration
# Get these from: https://app.supabase.com → Settings → API

# Public (Client-Side) - Safe to expose in browser
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Server-Only (Keep Secret!) - Never expose to browser
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# API Configuration (existing)
NEXT_PUBLIC_API_URL=/api
```

## Getting Your Supabase Keys

1. Go to your Supabase project: https://app.supabase.com
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are exposed to the browser (safe for anon key)
- ❌ `SUPABASE_SERVICE_ROLE_KEY` should NEVER have `NEXT_PUBLIC_` prefix
- ❌ Never commit `.env.local` to version control (already in `.gitignore`)
- ✅ Use `.env.example` as a template (without actual keys)

## Verification

After setting up, verify the configuration:

```bash
# Check if variables are loaded (in development)
npm run dev

# The app should start without errors
# Check browser console for any missing variable warnings
```
