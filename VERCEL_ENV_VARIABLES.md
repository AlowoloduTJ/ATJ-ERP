# Vercel Environment Variables Reference

## Required Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### 1. NEXT_PUBLIC_SUPABASE_URL
- **Type**: Public (exposed to browser)
- **Value**: Your Supabase project URL
- **Example**: `https://abcdefghijklmnop.supabase.co`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Type**: Public (exposed to browser)
- **Value**: Your Supabase anon/public key
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### 3. SUPABASE_SERVICE_ROLE_KEY
- **Type**: Secret (server-only)
- **Value**: Your Supabase service role key
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

## ⚠️ Important Notes

1. **Variable Names**: Use the exact names above (case-sensitive)
2. **NEXT_PUBLIC_**: Variables with this prefix are exposed to the browser
3. **No NEXT_PUBLIC_**: Server-only variables (keep secret!)
4. **All Environments**: Set for Production, Preview, and Development

## 📋 Quick Copy Checklist

Copy these from your `.env.local`:

```bash
# Copy these values to Vercel
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 🔍 Where to Find Values

1. **Supabase Dashboard**: https://app.supabase.com
2. **Settings** → **API**
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role → `SUPABASE_SERVICE_ROLE_KEY`
