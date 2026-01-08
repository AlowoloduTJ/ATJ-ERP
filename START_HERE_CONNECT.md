# 🚀 Connect to Supabase "ATJ-ERP" - Start Here

## ✅ Quick Connection Guide

### Step 1: Install Supabase Packages (If Not Done)

```bash
cd C:\VAKEM1\atj-erp
npm install @supabase/supabase-js @supabase/ssr
```

### Step 2: Get Your Supabase Credentials

1. Go to: **https://app.supabase.com**
2. Select your **"ATJ-ERP"** project
3. Go to **Settings** → **API**
4. Copy these 3 values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Create .env.local File

Create file: `C:\VAKEM1\atj-erp\.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_API_URL=/api
```

**Replace** the placeholder values with your actual credentials from Step 2.

### Step 4: Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 5: Test Connection

Visit: **http://localhost:3000/connect**

Should show: ✅ **"Connected to Supabase"**

## 📚 Full Documentation

- **Quick Guide**: `QUICK_CONNECT_SUPABASE.md`
- **Step-by-Step**: `CONNECTION_STEPS.md`
- **Detailed Guide**: `CONNECT_SUPABASE.md`
- **Environment Setup**: `SETUP_ENV.md`

## 🔗 Test Pages

- **Connection Status**: http://localhost:3000/connect
- **Database Test**: http://localhost:3000/test-db

---

**Follow the steps above to connect your project!** 🎯
