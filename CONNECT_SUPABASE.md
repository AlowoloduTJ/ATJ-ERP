# Connect to Supabase Project "ATJ-ERP"

## 🎯 Goal

Connect your Next.js app to your Supabase project named "ATJ-ERP".

## 📋 Method 1: Using Supabase CLI (Recommended)

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

Or using npm locally:
```bash
npm install -g supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

This will open your browser to authenticate.

### Step 3: Link Your Project

```bash
cd C:\VAKEM1\atj-erp
supabase link --project-ref <your-project-ref>
```

**To find your project reference:**
1. Go to https://app.supabase.com
2. Select your "ATJ-ERP" project
3. Go to **Settings** → **General**
4. Copy the **Reference ID** (looks like: `abcdefghijklmnop`)

**Or use the project URL:**
- Your project URL is: `https://<project-ref>.supabase.co`
- Extract the `<project-ref>` part

### Step 4: Verify Connection

```bash
supabase projects list
```

You should see your "ATJ-ERP" project listed.

## 📋 Method 2: Manual Setup (Easier for Now)

### Step 1: Get Your Supabase Credentials

1. Go to https://app.supabase.com
2. Select your **"ATJ-ERP"** project
3. Navigate to **Settings** → **API**
4. Copy these values:

   - **Project URL**: `https://<project-ref>.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 2: Create/Update .env.local

Create or update `.env.local` in the project root:

```bash
# Supabase Configuration for ATJ-ERP project
# Get these from: https://app.supabase.com → Your Project → Settings → API

# Public (Client-Side) - Safe to expose
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Server-Only (Keep Secret!) - Never expose
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

**Replace:**
- `your-project-ref` with your actual project reference
- `your-anon-key-here` with your anon/public key
- `your-service-role-key-here` with your service role key

### Step 3: Verify Connection

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit: http://localhost:3000/test-db

3. Check connection status (should be green "Connected")

## 🔍 Finding Your Project Reference

Your Supabase project URL format is:
```
https://<project-ref>.supabase.co
```

**Example:**
- If your URL is: `https://abcdefghijklmnop.supabase.co`
- Your project reference is: `abcdefghijklmnop`

## ✅ Verification Steps

### 1. Check Environment Variables

```bash
# In your .env.local file, verify:
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### 2. Test Connection

1. Visit: http://localhost:3000/test-db
2. Connection status should show "Connected"
3. Try creating a test supplier
4. Verify data appears in Supabase dashboard

### 3. Check Supabase Dashboard

1. Go to https://app.supabase.com
2. Select "ATJ-ERP" project
3. Go to **Table Editor**
4. Verify you can see your tables

## 🚨 Common Issues

### Issue: "Missing Supabase environment variables"

**Solution**: 
- Check `.env.local` exists in project root
- Verify variable names are correct (case-sensitive)
- Restart dev server after creating `.env.local`

### Issue: "Connection failed"

**Check:**
- Project URL is correct
- Keys are correct (no extra spaces)
- Supabase project is active (not paused)
- Internet connection is working

### Issue: "Table does not exist"

**Solution**: Apply your database schema:
```bash
# If using Supabase CLI
supabase db push

# Or manually run schema files in Supabase SQL Editor
```

## 📚 Next Steps

After connecting:

1. ✅ Test database connection (`/test-db` page)
2. ✅ Apply database schema (if not done)
3. ✅ Test CRUD operations
4. ✅ Set up authentication (optional)
5. ✅ Deploy to Vercel

## 🔗 Quick Reference

- **Supabase Dashboard**: https://app.supabase.com
- **Project Settings**: Settings → API
- **Test Page**: http://localhost:3000/test-db
- **Documentation**: `SUPABASE_SETUP.md`

---

**Ready to connect!** Follow Method 2 (Manual Setup) for the quickest connection.
