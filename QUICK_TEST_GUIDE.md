# Quick Database Connection Test

## 🚀 Quick Start

### Step 1: Install Supabase Packages

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Step 2: Set Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Get these from: https://app.supabase.com → Settings → API

### Step 3: Start Dev Server

```bash
npm run dev
```

### Step 4: Open Test Page

Navigate to: **http://localhost:3000/test-db**

## ✅ What to Test

1. **Connection Status** - Should show green "Connected"
2. **Create Supplier** - Fill form and submit
3. **Verify in List** - New supplier appears
4. **Refresh Page** - Data persists after refresh
5. **Check Dashboard** - Verify in Supabase dashboard

## 🔍 Troubleshooting

### "Module not found: @supabase/supabase-js"

**Solution**: Install packages:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### "Connection failed"

**Check:**
- Environment variables are set in `.env.local`
- Restart dev server after adding env vars
- Supabase project is active
- Keys are correct (check Supabase dashboard)

### "Table does not exist"

**Solution**: Apply your database schema:
```bash
# If using Supabase CLI
supabase db reset  # Local
# OR
supabase db push   # Remote
```

### "Authentication required"

**For testing**, you can temporarily disable RLS:
```sql
ALTER TABLE suppliers DISABLE ROW LEVEL SECURITY;
```

Or set up authentication first.

## 📊 Success Indicators

✅ Green connection status
✅ Can create suppliers
✅ Data appears in list
✅ Data persists after refresh
✅ Data visible in Supabase dashboard

---

**See `TESTING_DATABASE.md` for detailed instructions.**
