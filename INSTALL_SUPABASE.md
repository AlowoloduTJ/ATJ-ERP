# Installing Supabase Client

## Installation Command

Run this command to install the required Supabase packages:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## What Gets Installed

- **`@supabase/supabase-js`** - Core Supabase JavaScript client
- **`@supabase/ssr`** - Server-Side Rendering helpers for Next.js App Router

## If Installation Fails

If you encounter file lock errors (EBUSY), try:

1. **Close any running dev servers**
   ```bash
   # Stop Next.js dev server (Ctrl+C)
   ```

2. **Close any IDEs or editors** that might have files open

3. **Try installation again**
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

4. **Alternative: Use yarn**
   ```bash
   yarn add @supabase/supabase-js @supabase/ssr
   ```

## Verify Installation

After installation, verify:

```bash
npm list @supabase/supabase-js @supabase/ssr
```

You should see both packages listed.

## Next Steps

After installation:

1. Set up environment variables (see `ENV_SETUP.md`)
2. Review the Supabase client setup (see `SUPABASE_SETUP.md`)
3. Start using Supabase clients in your components
