# Quick Connect to Supabase "ATJ-ERP"

## 🚀 3-Step Connection

### Step 1: Get Your Credentials

1. Go to: https://app.supabase.com
2. Select your **"ATJ-ERP"** project
3. Go to **Settings** → **API**
4. Copy these 3 values:

   ```
   Project URL: https://xxxxx.supabase.co
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 2: Create .env.local

Create `.env.local` in the project root (`C:\VAKEM1\atj-erp\.env.local`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_API_URL=/api
```

**Replace the values** with your actual credentials from Step 1.

### Step 3: Test Connection

```bash
# Start dev server
npm run dev

# Visit in browser
http://localhost:3000/test-db
```

**Expected**: Green "Connected to database" status ✅

## ✅ Done!

Your project is now connected to Supabase "ATJ-ERP"!

## 🔍 Troubleshooting

**"Connection failed"**
- Check `.env.local` exists
- Verify values are correct (no quotes, no extra spaces)
- Restart dev server

**"Table does not exist"**
- Apply your schema in Supabase SQL Editor
- Or use: `supabase db push` (if CLI installed)

---

**See `CONNECT_SUPABASE.md` for detailed instructions.**
