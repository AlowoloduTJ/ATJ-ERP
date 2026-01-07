# Stage 1: Clerk + Supabase Setup Guide

## ✅ Automated Steps Completed

- [x] ClerkProvider added to root layout (`src/app/layout.tsx`)
- [ ] @clerk/nextjs package installation (pending - file lock issue)

## 📋 Manual Steps Required

### Step 1: Install @clerk/nextjs Package

**Issue:** There's a file lock preventing npm install. This usually happens when the dev server is running.

**Solution:**
1. Stop your dev server (Ctrl+C in the terminal running `npm run dev`)
2. Run: `npm install @clerk/nextjs`
3. Restart dev server: `npm run dev`

---

### Step 2: Configure Clerk for Supabase Compatibility

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Integrations** → **Connect with Supabase**
3. Follow Clerk's setup wizard to configure your Clerk instance for Supabase compatibility
4. **Copy your Clerk instance domain** (you'll need this for Supabase)
   - It will look like: `your-app.clerk.accounts.dev`
5. Keep the Clerk dashboard tab open - you'll need API keys from here

---

### Step 3: Configure Session Token (CRITICAL for Onboarding)

**⚠️ This MUST be done before building anything!**

1. In Clerk Dashboard, navigate to: **Sessions** → **Customize session token**
2. In the JSON editor, add this custom claim (copy exactly as shown):

```json
{
  "role": "authenticated",
  "metadata": "{{user.public_metadata}}"
}
```

3. Click **Save**

**Why this matters:** Your middleware checks the JWT session token. Without this configuration, publicMetadata won't be in the JWT, and the onboarding status check will fail, causing infinite redirect loops.

---

### Step 4: Set Up Supabase Third-Party Auth

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your **ATJ-ERP** project
3. Navigate to **Authentication** → **Sign In/Up** → **Third Party Auth**
4. Click **Add new third-party authentication provider**
5. Select or add **Clerk** as the provider
6. Enter your **Clerk instance domain** (from Step 2)
7. Follow the prompts to complete the connection
8. Verify the integration is active

---

### Step 5: Add Environment Variables

After completing the steps above, add these environment variables to your `.env.local` file:

**From Clerk Dashboard (Settings → API Keys):**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Copy from "Publishable key"
- `CLERK_SECRET_KEY` - Copy from "Secret key"

**Redirect URLs (use these exact values):**
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding`

**Your `.env.local` file should look like this:**

```bash
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk variables (add these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

---

### Step 6: Test Clerk Connection

After completing all steps:

1. Restart your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Check the browser console for any Clerk-related errors
4. Verify that Clerk is initialized (you should see Clerk components working)

---

## 🎯 Next Steps

Once Stage 1 is complete, we'll proceed to Stage 2: Creating Auth Pages and User Button.
