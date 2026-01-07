# Setup Environment Variables for Supabase "ATJ-ERP"

## 🎯 Goal

Create `.env.local` file with your Supabase "ATJ-ERP" project credentials.

## 📝 Step-by-Step Instructions

### Step 1: Get Your Supabase Credentials

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Sign in if needed

2. **Select "ATJ-ERP" Project**
   - Click on your project from the list

3. **Navigate to API Settings**
   - Click **Settings** (⚙️ icon) in left sidebar
   - Click **API** in the settings menu

4. **Copy These Values:**
   - **Project URL**: Looks like `https://abcdefghijklmnop.supabase.co`
   - **anon public** key: Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role** key: Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 2: Create .env.local File

**Location**: `C:\VAKEM1\atj-erp\.env.local`

**Content** (replace with your actual values):

```bash
# Supabase Configuration for ATJ-ERP project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

**Example** (with placeholder values):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzIwMCwiZXhwIjoxOTU0NTQzMjAwfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjAwLCJleHAiOjE5NTQ1NDMyMDB9.example
NEXT_PUBLIC_API_URL=/api
```

### Step 3: Verify File Location

The file should be at:
```
C:\VAKEM1\atj-erp\.env.local
```

**Important**: 
- File name is exactly `.env.local` (starts with a dot)
- File is in the project root (same folder as `package.json`)

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test Connection

1. Visit: http://localhost:3000/connect
   - Should show "Connected to Supabase" ✅

2. Or visit: http://localhost:3000/test-db
   - Should show green connection status
   - Try creating a test supplier

## ✅ Success Indicators

- ✅ Connection status shows "Connected"
- ✅ Can create test data
- ✅ Data persists after refresh
- ✅ Data visible in Supabase dashboard

## 🔍 Troubleshooting

### File Not Found Error

**Problem**: `.env.local` not in correct location

**Solution**: 
- Ensure file is in `C:\VAKEM1\atj-erp\.env.local`
- Same folder as `package.json`

### "Missing environment variable" Error

**Problem**: Variable names incorrect or missing

**Solution**:
- Check variable names are exact (case-sensitive):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- No extra spaces or quotes
- Restart dev server after creating file

### "Connection failed" Error

**Problem**: Wrong credentials

**Solution**:
- Double-check values from Supabase dashboard
- Ensure no typos
- Verify project is active

---

**Ready!** Create `.env.local` with your Supabase credentials to connect.
