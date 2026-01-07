# Vercel Deployment Guide

Complete guide for deploying ATJ-ERP to Vercel.

## ✅ Pre-Deployment Checklist

- [x] `.env.local` is in `.gitignore` (✅ Already configured - `.env*` is ignored)
- [ ] Supabase packages installed (`@supabase/supabase-js`, `@supabase/ssr`)
- [ ] Code committed to GitHub
- [ ] Environment variables ready to add in Vercel

## 📝 Step 1: Verify .gitignore

Your `.gitignore` already includes:
```
.env*
```

This means `.env.local` and all environment files are **NOT** committed to Git. ✅

**Important**: Never commit `.env.local` or any file containing secrets!

## 📦 Step 2: Commit and Push Code

### Check Current Status

```bash
git status
```

### Add All New Files

```bash
# Add all new files and changes
git add .

# Review what will be committed
git status
```

### Commit Changes

```bash
git commit -m "Add Supabase integration, server actions, and database schema"
```

### Push to GitHub

```bash
git push origin main
```

**Note**: The `supabase/` folder (including `supabase/schemas/` and `supabase/migrations/`) will be committed. This is correct - schema files should be in version control.

## 🔗 Step 3: Connect to Vercel

### Option A: Via Vercel Dashboard

1. Go to https://vercel.com
2. Sign in (or create account)
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository: `AlowoloduTJ/ATJ-ERP`
5. Vercel will detect it's a Next.js project automatically

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
cd C:\VAKEM1\atj-erp
vercel
```

## 🔐 Step 4: Add Environment Variables

### Important: Variable Names

**Note**: Your code uses these variable names:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Not** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_SECRET_KEY` - those are different naming conventions.

### In Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL (from `.env.local`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon/public key (from `.env.local`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your Supabase service role key (from `.env.local`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

### Getting Your Values

From your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Or from Supabase Dashboard:
1. Go to https://app.supabase.com
2. Select your project
3. **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## 🚀 Step 5: Deploy

### Automatic Deployment

After connecting GitHub:
1. Vercel automatically detects pushes to `main` branch
2. Creates a new deployment
3. Builds your Next.js app
4. Deploys to production

### Manual Deployment

If you need to trigger manually:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Or push a new commit to trigger deployment

### First Deployment

1. After adding environment variables, Vercel will:
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Deploy to production

2. Watch the build logs for any errors

3. Once deployed, you'll get a URL like: `https://atj-erp.vercel.app`

## 🧪 Step 6: Test Deployed App

### Test Database Connection

1. Navigate to: `https://your-app.vercel.app/test-db`
2. Check connection status (should be green)
3. Create a test supplier
4. Verify data persists after refresh

### Test Other Features

1. Landing page: `https://your-app.vercel.app/`
2. Login page: `https://your-app.vercel.app/login`
3. Dashboard: `https://your-app.vercel.app/dashboard`

### Verify in Supabase

1. Go to Supabase dashboard
2. Check Table Editor → `suppliers` table
3. Verify test data from deployed app appears

## 📊 Using the Same Database

**Important**: You're using the **same Supabase database** for:
- ✅ Local development
- ✅ Production (Vercel)

**This is fine for:**
- Learning and development
- Early launches and MVPs
- Small teams
- Testing

**Consider separate databases when:**
- You have production data you don't want to risk
- You need to test migrations safely
- You have multiple environments (dev/staging/prod)
- You're scaling to production

**For now, this setup is perfect!** You can always add separate databases later.

## 🔍 Troubleshooting

### Build Fails: "Module not found: @supabase/supabase-js"

**Solution**: Ensure packages are in `package.json`:
```bash
npm install @supabase/supabase-js @supabase/ssr
git add package.json package-lock.json
git commit -m "Add Supabase dependencies"
git push
```

### Build Fails: "Missing environment variable"

**Solution**: 
1. Check all 3 environment variables are set in Vercel
2. Ensure they're set for **Production**, **Preview**, and **Development**
3. Redeploy after adding variables

### App Works Locally but Not on Vercel

**Check:**
1. Environment variables are set correctly in Vercel
2. Variable names match exactly (case-sensitive)
3. No typos in values
4. Supabase project is active (not paused)

### "Connection failed" on Deployed App

**Check:**
1. Environment variables are set in Vercel
2. Values are correct (copy from `.env.local`)
3. Supabase project allows connections from Vercel domain
4. Check Vercel build logs for errors

### Data Not Persisting

**Check:**
1. You're using the same Supabase project
2. Database schema is applied
3. Tables exist in Supabase dashboard
4. RLS policies allow operations (or disabled for testing)

## 📚 Vercel Documentation

- **Deployment Guide**: https://vercel.com/docs/deployments/overview
- **Environment Variables**: https://vercel.com/docs/projects/environment-variables
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs

## ✅ Post-Deployment Checklist

- [ ] App builds successfully on Vercel
- [ ] Environment variables are set
- [ ] Test page (`/test-db`) works
- [ ] Can create and read data
- [ ] Data persists after refresh
- [ ] Supabase dashboard shows data from deployed app

## 🎯 Next Steps

After successful deployment:

1. **Set up custom domain** (optional)
2. **Configure preview deployments** for PRs
3. **Set up monitoring** and error tracking
4. **Add separate databases** when ready for production
5. **Enable Row Level Security** for production data

---

**Ready to deploy!** Follow the steps above to get your app live on Vercel.
