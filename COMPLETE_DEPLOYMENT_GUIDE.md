# Complete Deployment Guide: Vercel + Supabase + Clerk

A comprehensive step-by-step guide to deploy your ATJ-ERP application to Vercel with Supabase and Clerk integration.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Step 1: Prepare Your Code](#step-1-prepare-your-code)
3. [Step 2: Set Up Vercel Project](#step-2-set-up-vercel-project)
4. [Step 3: Configure Supabase](#step-3-configure-supabase)
5. [Step 4: Configure Clerk](#step-4-configure-clerk)
6. [Step 5: Add Environment Variables to Vercel](#step-5-add-environment-variables-to-vercel)
7. [Step 6: Configure Custom Domain (Optional)](#step-6-configure-custom-domain-optional)
8. [Step 7: Deploy and Test](#step-7-deploy-and-test)
9. [Step 8: Post-Deployment Verification](#step-8-post-deployment-verification)
10. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before starting, ensure you have:

- [ ] GitHub repository with your code pushed
- [ ] Supabase project created and active
- [ ] Clerk application created
- [ ] All environment variables from `.env.local` ready to copy
- [ ] Database schema applied in Supabase
- [ ] RLS policies configured (if using Row Level Security)

---

## 📝 Step 1: Prepare Your Code

### 1.1 Verify Code is Committed

```bash
cd C:\VAKEM1\atj-erp
git status
```

### 1.2 Commit and Push (if needed)

```bash
# Add all changes
git add .

# Commit
git commit -m "chore: prepare for deployment"

# Push to your branch
git push origin auth-flow
```

**Note:** Pushing to `auth-flow` creates a preview deployment. Merge to `main` for production.

---

## 🔗 Step 2: Set Up Vercel Project

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**AlowoloduTJ/ATJ-ERP
   - Select your GitHub repository: ``
   - Click **"Import"**

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected) ✅
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Click "Deploy"** (we'll add environment variables next)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project (from project root)
cd C:\VAKEM1\atj-erp
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🗄️ Step 3: Configure Supabase

### 3.1 Get Supabase Credentials

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Select your **ATJ-ERP** project

2. **Navigate to Settings → API:**
   - Copy **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **service_role** key → This is your `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **KEEP SECRET**

### 3.2 Configure Clerk Integration in Supabase

1. **Go to Authentication → Sign In/Up → Third Party Auth:**
   - Click **"Add new third-party authentication provider"**
   - Select **Clerk** as the provider

2. **Enter Clerk Configuration:**
   - **Issuer:** `https://in-coral-65.clerk.accounts.dev`
   - **JWKS Endpoint:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`

3. **Click "Save"**

### 3.3 Verify Database Schema

1. **Go to SQL Editor in Supabase:**
   - Run your schema files from `supabase/schemas/`
   - Or use the Table Editor to verify tables exist

2. **Verify RLS Policies:**
   - Go to **Authentication → Policies**
   - Ensure Row Level Security is enabled for your tables

---

## 🔐 Step 4: Configure Clerk

### 4.1 Get Clerk Credentials

1. **Go to Clerk Dashboard:**
   - Visit: https://dashboard.clerk.com
   - Select your application

2. **Navigate to API Keys:**
   - Copy **Publishable Key** → This is your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy **Secret Key** → This is your `CLERK_SECRET_KEY` ⚠️ **KEEP SECRET**

### 4.2 Configure JWT Template

1. **Go to JWT Templates:**
   - Navigate to **JWT Templates** in Clerk Dashboard
   - Create a new template named `supabase`

2. **Add JWT Template JSON:**
   
   **Note:** Clerk automatically sets reserved claims (`iss`, `sub`, `iat`, `exp`, `aud`). Do not include them in your template.
   
   ```json
   {
     "email": "{{user.primary_email_address}}",
     "username": "{{user.username}}",
     "two_factor_enabled": "{{user.two_factor_enabled}}",
     "phone_number_verified": "{{user.phone_number_verified}}",
     "full_name": "{{user.full_name}}",
     "first_name": "{{user.first_name}}",
     "last_name": "{{user.last_name}}",
     "primary_phone_number": "{{user.primary_phone_number}}",
     "role": "authenticated",
     "metadata": {
       "onboardingComplete": "{{user.public_metadata.onboardingComplete}}",
       "role": "{{user.public_metadata.role}}"
     }
   }
   ```

3. **Save the template**

### 4.3 Configure Domains (For Production)

1. **Go to Domains in Clerk Dashboard:**
   - Add your production domain: `atj-erp.company`
   - Add www subdomain: `www.atj-erp.company` (if using)

2. **Update Redirect URLs:**
   - **Sign-in URL:** `https://atj-erp.company/sign-in`
   - **Sign-up URL:** `https://atj-erp.company/sign-up`
   - **After sign-in:** `https://atj-erp.company/dashboard`
   - **After sign-up:** `https://atj-erp.company/onboarding`

### 4.4 Generate Production Keys (For Production)

1. **Switch to Production Mode:**
   - In Clerk Dashboard, ensure you're using production keys
   - Production keys start with `pk_live_` and `sk_live_`
   - Test keys start with `pk_test_` and `sk_test_`

---

## 🔑 Step 5: Add Environment Variables to Vercel

### 5.1 Navigate to Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Environment Variables**

### 5.2 Add Supabase Variables

Add these **3 Supabase variables** (enable for Production, Preview, and Development):

| Variable Name | Value | Type | Environments |
|--------------|-------|------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Public | ✅ All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Public | ✅ All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Secret | ✅ All |

**How to add:**
1. Click **"Add New"**
2. Enter the **Key** (exact name from table above)
3. Paste the **Value** (from your `.env.local` or Supabase Dashboard)
4. Select **Environments:** Production, Preview, Development
5. Click **"Save"**

### 5.3 Add Clerk Variables

Add these **2 Clerk variables** (enable for Production, Preview, and Development):

| Variable Name | Value | Type | Environments |
|--------------|-------|------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | Public | ✅ All |
| `CLERK_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Secret | ✅ All |

**Important:**
- Use `pk_live_` and `sk_live_` for **Production**
- Use `pk_test_` and `sk_test_` for **Preview/Development** (optional)

### 5.4 Add Clerk Redirect URLs (Optional)

These are usually set in code, but you can override with environment variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | ✅ All |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | ✅ All |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/dashboard` | ✅ All |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/onboarding` | ✅ All |

### 5.5 Verify All Variables

**Checklist - You should have at least 5 variables:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`

---

## 🌐 Step 6: Configure Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `atj-erp.company`
   - Click **"Add"**

### 6.2 Configure DNS Records

Vercel will show you DNS records to add at your domain registrar:

**Option 1: Apex Domain (atj-erp.company)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option 2: CNAME (Recommended)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Option 3: Subdomain (www.atj-erp.company)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3 Wait for DNS Propagation

- DNS changes can take **24-48 hours** to propagate
- Vercel will show **"Valid Configuration"** when ready
- SSL certificate is automatically provisioned by Vercel

### 6.4 Update Clerk for Production Domain

1. **In Clerk Dashboard → Domains:**
   - Add: `atj-erp.company`
   - Add: `www.atj-erp.company` (if using)

2. **Update Redirect URLs:**
   - Use your custom domain instead of Vercel URL

---

## 🚀 Step 7: Deploy and Test

### 7.1 Trigger Deployment

**Automatic (Recommended):**
- Push a new commit to GitHub
- Vercel automatically detects and deploys

**Manual:**
- Go to Vercel Dashboard → **Deployments**
- Click **"Redeploy"** on latest deployment
- Or click **"Deploy"** button

### 7.2 Monitor Build

1. **Watch Build Logs:**
   - Go to **Deployments** tab
   - Click on the deployment
   - Watch the build process

2. **Check for Errors:**
   - Build should complete successfully
   - If errors occur, check the logs and fix issues

### 7.3 Get Deployment URL

After successful deployment:
- **Preview:** `https://atj-erp-[hash].vercel.app` (for branches)
- **Production:** `https://atj-erp.vercel.app` or your custom domain

---

## ✅ Step 8: Post-Deployment Verification

### 8.1 Test Authentication Flow

1. **Visit your deployment URL**
2. **Test Sign Up:**
   - Go to `/sign-up`
   - Create a new account
   - Verify redirect to `/onboarding`

3. **Test Sign In:**
   - Go to `/sign-in`
   - Sign in with existing account
   - Verify redirect to `/dashboard`

4. **Test Onboarding:**
   - Complete the 3-screen onboarding flow
   - Verify redirect to `/dashboard` after completion

### 8.2 Test Protected Routes

1. **Test Dashboard:**
   - Visit `/dashboard`
   - Should be accessible when signed in
   - Should redirect to `/sign-in` when signed out

2. **Test Other Protected Routes:**
   - `/warehouse`
   - `/production`
   - Any other protected routes

### 8.3 Test Database Connection

1. **Test RLS (Row Level Security):**
   - Visit `/test-rls` (if available)
   - Create test data as User A
   - Sign out and sign in as User B
   - Verify User B cannot see User A's data

2. **Verify Data Persistence:**
   - Create data in the app
   - Refresh the page
   - Verify data persists

### 8.4 Test Legal Pages

1. **Visit `/privacy`**
2. **Visit `/terms`**
3. **Verify links in footer work**

### 8.5 Check Console for Errors

1. **Open Browser DevTools (F12)**
2. **Check Console tab:**
   - Should have no errors
   - Check for any warnings

3. **Check Network tab:**
   - Verify API requests succeed
   - Check for failed requests

---

## 🔧 Troubleshooting

### Build Fails: "Missing environment variable"

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify all 5 required variables are set
3. Ensure they're enabled for the correct environment (Production/Preview)
4. Redeploy after adding variables

### Build Fails: "Module not found"

**Solution:**
1. Ensure all dependencies are in `package.json`
2. Run `npm install` locally and commit `package-lock.json`
3. Push changes and redeploy

### Authentication Not Working

**Check:**
1. Clerk keys are correct in Vercel
2. Clerk domain is configured correctly
3. Redirect URLs match your deployment URL
4. JWT template is configured in Clerk Dashboard

### Database Connection Fails

**Check:**
1. Supabase keys are correct in Vercel
2. Supabase project is active (not paused)
3. Database schema is applied
4. RLS policies allow operations (if using RLS)

### Custom Domain Not Working

**Check:**
1. DNS records are correct at domain registrar
2. Wait for DNS propagation (24-48 hours)
3. Domain is added in Vercel Dashboard
4. SSL certificate is provisioned (may take a few minutes)

### "Missing publishableKey" Error

**Solution:**
1. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in Vercel
2. Use production keys (`pk_live_`) for production domain
3. Redeploy after adding the variable

### Prisma Build Error

**Solution:**
- This project uses Supabase, not Prisma
- The `prisma` folder should be excluded (already configured)
- If error persists, check `tsconfig.json` excludes `prisma`

---

## 📚 Quick Reference

### Environment Variables Summary

```bash
# Supabase (3 variables)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clerk (2 variables)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... (or pk_test_...)
CLERK_SECRET_KEY=sk_live_... (or sk_test_...)
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://app.supabase.com
- **Clerk Dashboard:** https://dashboard.clerk.com
- **Clerk JWKS Endpoint:** https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json

### Key Configuration Values

- **Clerk Issuer:** `https://in-coral-65.clerk.accounts.dev`
- **Clerk JWKS:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`
- **JWT Template Name:** `supabase`

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Build completes successfully
- [ ] All environment variables are set
- [ ] Authentication flow works (sign up, sign in, onboarding)
- [ ] Protected routes are accessible when signed in
- [ ] Protected routes redirect to sign-in when signed out
- [ ] Database connection works
- [ ] Data isolation works (RLS policies)
- [ ] Custom domain resolves (if configured)
- [ ] SSL certificate is active (🔒)
- [ ] No console errors
- [ ] Legal pages are accessible

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Clerk Docs:** https://clerk.com/docs
- **Project Documentation:** See other `.md` files in the project root

---

**Last Updated:** 2026-01-07  
**Project:** ATJ-ERP  
**Branch:** auth-flow
