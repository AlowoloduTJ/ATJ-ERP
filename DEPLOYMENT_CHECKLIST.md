# Vercel Deployment Checklist

## ✅ Pre-Deployment

- [x] `.env.local` is in `.gitignore` (✅ `.env*` already ignored)
- [ ] All code committed to Git
- [ ] Code pushed to GitHub
- [ ] Supabase packages in `package.json`

## 📝 Step-by-Step Deployment

### 1. Commit and Push Code

```bash
# Add all files
git add .

# Commit
git commit -m "Add Supabase integration, server actions, database schema, and test page"

# Push to GitHub
git push origin main
```

### 2. Connect to Vercel

**Option A: Dashboard**
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import: `AlowoloduTJ/ATJ-ERP`
4. Vercel auto-detects Next.js

**Option B: CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### 3. Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable Name | Value From | Environments |
|--------------|------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | ✅ All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | ✅ All |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | ✅ All |

**Important**: 
- Copy exact values from `.env.local`
- Set for Production, Preview, AND Development
- Variable names are case-sensitive

### 4. Deploy

- First deployment happens automatically after connecting
- Or trigger manually: Deployments → Redeploy

### 5. Test

1. Visit: `https://your-app.vercel.app/test-db`
2. Check connection status
3. Create test supplier
4. Verify data persists
5. Check Supabase dashboard

## 🎯 Success Criteria

- ✅ Build succeeds on Vercel
- ✅ App loads without errors
- ✅ Test page shows "Connected"
- ✅ Can create data
- ✅ Data persists after refresh
- ✅ Data visible in Supabase

## 📚 Documentation

- **Complete Guide**: `VERCEL_DEPLOYMENT.md`
- **Environment Variables**: `VERCEL_ENV_VARIABLES.md`

---

**Ready!** Follow the steps above to deploy.
