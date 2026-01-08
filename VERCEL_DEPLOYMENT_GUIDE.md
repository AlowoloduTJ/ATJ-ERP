# Deploy to Vercel - Complete Guide

## 🚀 Deployment Options

### Option 1: Deploy via GitHub (Recommended)

If your repository is already connected to Vercel, pushing to GitHub will automatically trigger a deployment.

**Steps:**
1. **Commit any uncommitted changes:**
   ```bash
   git add .
   git commit -m "chore: prepare for deployment"
   git push origin auth-flow
   ```

2. **Vercel will automatically:**
   - Detect the push
   - Start a new build
   - Deploy to preview URL (for `auth-flow` branch)
   - Deploy to production (if merged to `main`)

### Option 2: Deploy via Vercel CLI

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**Login to Vercel:**
```bash
vercel login
```

**Deploy:**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 3: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `AlowoloduTJ/ATJ-ERP`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all required variables (see below)

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Get your deployment URL

---

## 🔑 Required Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Clerk Configuration
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
CLERK_SECRET_KEY=sk_test_... (or sk_live_... for production)
```

### Clerk Redirect URLs
```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding
```

### API Configuration
```bash
NEXT_PUBLIC_API_URL=/api
```

**Important:**
- Set these for **Production**, **Preview**, and **Development** environments
- Use `pk_live_...` and `sk_live_...` for production
- Use `pk_test_...` and `sk_test_...` for preview/development

---

## 📋 Pre-Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Clerk domains configured (production domain added)
- [ ] Supabase project is active
- [ ] No build errors locally (`npm run build` succeeds)
- [ ] All dependencies installed (`npm install` completed)

---

## 🎯 Deployment Workflow

### For Preview (auth-flow branch):

1. **Push to GitHub:**
   ```bash
   git push origin auth-flow
   ```

2. **Vercel automatically:**
   - Creates preview deployment
   - Builds the project
   - Deploys to preview URL

3. **Test Preview:**
   - Visit the preview URL from Vercel dashboard
   - Test all features
   - Verify environment variables work

### For Production (main branch):

1. **Merge to main:**
   ```bash
   git checkout main
   git merge auth-flow
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects merge to main
   - Builds production version
   - Deploys to production domain

3. **Verify Production:**
   - Visit your production domain
   - Test all features
   - Monitor for errors

---

## 🔍 Troubleshooting

### Build Fails

**Check:**
- Environment variables are set correctly
- All dependencies are in `package.json`
- No TypeScript errors
- Build logs in Vercel dashboard

### Environment Variables Not Working

**Check:**
- Variables are set for correct environment (Production/Preview)
- Variable names are exact (case-sensitive)
- No extra spaces or quotes
- Redeploy after adding variables

### Authentication Not Working

**Check:**
- Clerk keys are correct (test vs live)
- Clerk domain is configured in Supabase
- Redirect URLs match your Vercel domain
- Session token is configured in Clerk

---

## ✅ After Deployment

1. **Test the deployment:**
   - Visit the deployment URL
   - Test signup flow
   - Test login flow
   - Test protected routes

2. **Monitor:**
   - Check Vercel dashboard for errors
   - Monitor function logs
   - Check browser console

3. **Update:**
   - Add custom domain (if needed)
   - Configure analytics
   - Set up monitoring

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Ready to deploy?** Follow the steps above based on your preferred method!
