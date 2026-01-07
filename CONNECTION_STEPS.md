# Connect to Supabase "ATJ-ERP" - Step by Step

## 🎯 Quick Connection (5 minutes)

### Step 1: Get Your Credentials (2 minutes)

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Sign in if needed

2. **Select Your Project**
   - Find and click on **"ATJ-ERP"** project

3. **Get API Credentials**
   - Click **Settings** (gear icon) in the left sidebar
   - Click **API** in the settings menu
   - You'll see three important values:

   **Copy these:**
   - ✅ **Project URL**: `https://xxxxx.supabase.co`
   - ✅ **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ✅ **service_role** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 2: Create .env.local File (1 minute)

1. **Create the file** in your project root:
   - Location: `C:\VAKEM1\atj-erp\.env.local`

2. **Add your credentials**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NEXT_PUBLIC_API_URL=/api
   ```

   **Replace:**
   - `https://xxxxx.supabase.co` with your actual Project URL
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual keys

3. **Save the file**

### Step 3: Restart Dev Server (1 minute)

```bash
# Stop current server (Ctrl+C if running)
# Then start again:
npm run dev
```

### Step 4: Test Connection (1 minute)

1. **Visit connection page**: http://localhost:3000/connect
   - Should show green "Connected" status

2. **Or visit test page**: http://localhost:3000/test-db
   - Should show "Connected to database"
   - Try creating a test supplier

## ✅ Verification Checklist

- [ ] `.env.local` file created in project root
- [ ] All 3 Supabase variables are set
- [ ] Values copied correctly (no extra spaces)
- [ ] Dev server restarted after creating `.env.local`
- [ ] Connection status shows "Connected"
- [ ] Can create test data
- [ ] Data visible in Supabase dashboard

## 🔍 Troubleshooting

### "Not Configured" Error

**Problem**: `.env.local` doesn't exist or variables are missing

**Solution**:
1. Check `.env.local` exists in `C:\VAKEM1\atj-erp\.env.local`
2. Verify all 3 variables are present
3. Restart dev server

### "Connection failed" Error

**Problem**: Wrong credentials or project not accessible

**Solution**:
1. Double-check values from Supabase dashboard
2. Ensure no extra spaces or quotes
3. Verify project is active (not paused)
4. Check internet connection

### "Table does not exist" Error

**Problem**: Database schema not applied

**Solution**:
1. Go to Supabase dashboard → SQL Editor
2. Run your schema files from `supabase/schemas/`
3. Or use: `supabase db push` (if CLI installed)

## 📚 Additional Resources

- **Detailed Guide**: `CONNECT_SUPABASE.md`
- **Quick Guide**: `QUICK_CONNECT_SUPABASE.md`
- **Test Page**: http://localhost:3000/test-db
- **Connection Page**: http://localhost:3000/connect

---

**Ready!** Follow the steps above to connect your project to Supabase "ATJ-ERP".
