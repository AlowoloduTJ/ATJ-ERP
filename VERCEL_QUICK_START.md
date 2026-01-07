# Vercel Deployment - Quick Start

## 🚀 5-Minute Deployment Guide

### Step 1: Commit & Push (2 minutes)

```bash
cd C:\VAKEM1\atj-erp
git add .
git commit -m "Add Supabase integration and server actions"
git push origin main
```

### Step 2: Connect to Vercel (1 minute)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import: `AlowoloduTJ/ATJ-ERP`
5. Click **"Import"**

### Step 3: Add Environment Variables (2 minutes)

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

| Variable | Value From |
|---------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Copy from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Copy from `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Copy from `.env.local` |

**Important:**
- ✅ Set for **Production**, **Preview**, AND **Development**
- ✅ Copy exact values (no extra spaces)
- ✅ Variable names are case-sensitive

### Step 4: Deploy (Automatic)

Vercel will:
1. Detect Next.js automatically
2. Install dependencies
3. Build your app
4. Deploy to production

Watch the build logs for progress!

### Step 5: Test (1 minute)

1. Visit your deployment URL: `https://your-app.vercel.app`
2. Test page: `https://your-app.vercel.app/test-db`
3. Verify connection works
4. Create test data
5. Check Supabase dashboard

## ✅ Done!

Your app is now live on Vercel!

## 📚 Full Guide

See `VERCEL_DEPLOYMENT.md` for detailed instructions and troubleshooting.
