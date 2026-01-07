# Connect Your Project to Supabase "ATJ-ERP"

## 🎯 Complete Setup Guide

Your project is ready to connect to Supabase! Follow these steps:

## 📦 Step 1: Install Supabase Packages

**Run this command first:**

```bash
cd C:\VAKEM1\atj-erp
npm install @supabase/supabase-js @supabase/ssr
```

This installs the required Supabase libraries for Next.js.

## 🔑 Step 2: Get Your Supabase Credentials

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Sign in if needed

2. **Select "ATJ-ERP" Project**
   - Click on your project from the list

3. **Get API Credentials**
   - Click **Settings** (⚙️) in left sidebar
   - Click **API** in settings menu
   - You'll see three important values:

   **Copy these:**
   - ✅ **Project URL**: `https://xxxxx.supabase.co`
   - ✅ **anon public** key: Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ✅ **service_role** key: Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📝 Step 3: Create .env.local File

**Create a new file** at: `C:\VAKEM1\atj-erp\.env.local`

**Add this content** (replace with your actual values):

```bash
# Supabase Configuration for ATJ-ERP project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

**Example** (with real values):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzIwMCwiZXhwIjoxOTU0NTQzMjAwfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjAwLCJleHAiOjE5NTQ1NDMyMDB9.example
NEXT_PUBLIC_API_URL=/api
```

**Important:**
- File name must be exactly `.env.local` (starts with a dot)
- File location: Same folder as `package.json`
- No quotes around values
- No extra spaces

## 🚀 Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C if running)
# Then restart:
npm run dev
```

## ✅ Step 5: Test Connection

1. **Visit Connection Page**: http://localhost:3000/connect
   - Should show: ✅ **"Connected to Supabase"**

2. **Or Visit Test Page**: http://localhost:3000/test-db
   - Should show: ✅ **"Connected to database"**
   - Try creating a test supplier

3. **Verify in Supabase Dashboard**:
   - Go to Supabase → Table Editor
   - Check if test data appears

## 🔍 Troubleshooting

### "Module not found: @supabase/supabase-js"

**Solution**: Install packages:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### "Missing environment variable"

**Solution**:
- Check `.env.local` exists in project root
- Verify all 3 variables are set
- Restart dev server after creating file

### "Connection failed"

**Check**:
- Values are correct (no typos)
- No extra spaces or quotes
- Project URL format: `https://xxxxx.supabase.co`
- Supabase project is active (not paused)

### "Table does not exist"

**Solution**: Apply your database schema:
1. Go to Supabase → SQL Editor
2. Run schema files from `supabase/schemas/` folder
3. Or use Supabase CLI: `supabase db push`

## 📚 Additional Resources

- **Quick Start**: `START_HERE_CONNECT.md`
- **Step-by-Step**: `CONNECTION_STEPS.md`
- **Environment Setup**: `SETUP_ENV.md`
- **Detailed Guide**: `CONNECT_SUPABASE.md`

## ✅ Success Checklist

After setup, verify:
- [ ] Supabase packages installed
- [ ] `.env.local` file created
- [ ] All 3 environment variables set
- [ ] Dev server restarted
- [ ] Connection status shows "Connected"
- [ ] Can create test data
- [ ] Data visible in Supabase dashboard

---

**Ready!** Follow the steps above to connect your project to Supabase "ATJ-ERP". 🎯
