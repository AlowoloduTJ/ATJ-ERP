# Deploy to atj-erp.company via Vercel

## ✅ Step 1: Code Pushed
- ✅ Changes committed and pushed to `auth-flow` branch
- ✅ Build fixes applied (ESLint + Clerk errors resolved)

## 🔗 Step 2: Connect Project to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Select your GitHub repository: `AlowoloduTJ/ATJ-ERP`
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Link project (from project root)
cd C:\VAKEM1\atj-erp
vercel link

# Deploy
vercel --prod
```

## 🔐 Step 3: Add Environment Variables

**In Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables (copy from your `.env.local`):

### Supabase Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://svtlzyfmzeizkxeigbzc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Clerk Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
CLERK_SECRET_KEY=sk_test_... (or sk_live_... for production)
```

**Important:**
- ✅ Enable for **Production**, **Preview**, and **Development**
- ✅ Use production keys (`pk_live_`, `sk_live_`) for the custom domain
- ✅ Update Clerk dashboard with production domain

## 🌐 Step 4: Configure Custom Domain

### In Vercel Dashboard:

1. **Go to Project Settings:**
   - Navigate to your project in Vercel
   - Click **"Settings"** → **"Domains"**

2. **Add Custom Domain:**
   - Click **"Add Domain"**
   - Enter: `atj-erp.company`
   - Click **"Add"**

3. **Configure DNS:**
   Vercel will show you DNS records to add. You'll need to add these to your domain registrar:

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

4. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate
   - Vercel will show "Valid Configuration" when ready
   - You can check status in Vercel Dashboard → Domains

## 🔄 Step 5: Update Clerk for Production Domain

1. **Go to Clerk Dashboard:**
   - Visit: https://dashboard.clerk.com
   - Select your application

2. **Add Production Domain:**
   - Navigate to **"Domains"** or **"Settings"** → **"Domains"**
   - Add: `atj-erp.company`
   - Add: `www.atj-erp.company` (if using www)

3. **Update Redirect URLs:**
   - **Sign-in URL:** `https://atj-erp.company/sign-in`
   - **Sign-up URL:** `https://atj-erp.company/sign-up`
   - **After sign-in:** `https://atj-erp.company/dashboard`
   - **After sign-up:** `https://atj-erp.company/onboarding`

4. **Switch to Production Keys:**
   - Generate production keys in Clerk Dashboard
   - Update Vercel environment variables with production keys:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → `pk_live_...`
     - `CLERK_SECRET_KEY` → `sk_live_...`

## 🚀 Step 6: Deploy to Production

### If deploying from `auth-flow` branch:

1. **Merge to main (if ready):**
   ```bash
   git checkout main
   git merge auth-flow
   git push origin main
   ```

2. **Or deploy directly from auth-flow:**
   - Vercel will create a preview deployment
   - In Vercel Dashboard → Deployments → Select deployment → "Promote to Production"

### Manual Deployment:

1. **Trigger Deployment:**
   - Push a new commit, or
   - Go to Vercel Dashboard → Deployments → "Redeploy"

2. **Assign Domain:**
   - Go to deployment → "Domains"
   - Assign `atj-erp.company` to the production deployment

## ✅ Step 7: Verify Deployment

1. **Check Build Status:**
   - Go to Vercel Dashboard → Deployments
   - Verify build completed successfully

2. **Test Custom Domain:**
   - Visit: `https://atj-erp.company`
   - Verify the app loads correctly
   - Test authentication flow
   - Test database connections

3. **Check SSL Certificate:**
   - Vercel automatically provisions SSL certificates
   - Should show as secure (🔒) in browser
   - May take a few minutes after domain is configured

## 🔧 Troubleshooting

### Domain Not Working?
- Check DNS records are correct
- Wait for DNS propagation (can take 24-48 hours)
- Verify domain is added in Vercel Dashboard
- Check domain status in Vercel → Settings → Domains

### Build Fails?
- Verify all environment variables are set
- Check build logs in Vercel Dashboard
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set for production

### Clerk Errors?
- Verify production keys are used (not test keys)
- Check Clerk dashboard has `atj-erp.company` added
- Verify redirect URLs match your domain

## 📋 Quick Checklist

- [ ] Project connected to Vercel
- [ ] All environment variables added (Supabase + Clerk)
- [ ] Custom domain `atj-erp.company` added in Vercel
- [ ] DNS records configured at domain registrar
- [ ] Clerk dashboard updated with production domain
- [ ] Production Clerk keys added to Vercel
- [ ] Deployment successful
- [ ] Custom domain accessible and working
- [ ] SSL certificate active (🔒)

## 🎉 Success!

Once all steps are complete, your app will be live at:
- **Production:** https://atj-erp.company
- **Vercel URL:** https://atj-erp-*.vercel.app (backup URL)
