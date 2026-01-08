# Supabase + Clerk Configuration

## Clerk Instance Details

**Clerk Instance Domain:** `in-coral-65.clerk.accounts.dev`

**Issuer (iss):** `https://in-coral-65.clerk.accounts.dev`

**JWKS Endpoint:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`

## Supabase Configuration Steps

### Step 1: Access Supabase Dashboard

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your **ATJ-ERP** project
3. Navigate to **Authentication** → **Sign In/Up** → **Third Party Auth**

### Step 2: Configure Clerk Provider

1. Click **"Add new third-party authentication provider"** or edit existing Clerk provider
2. Select or add **Clerk** as the provider
3. Enter the following configuration:

   **Issuer:**
   ```
   https://in-coral-65.clerk.accounts.dev
   ```

   **JWKS Endpoint:**
   ```
   https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json
   ```

4. Click **"Save"** or **"Apply"**

### Step 3: Verify Configuration

1. **Test JWKS Endpoint:**
   - Visit: https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json
   - You should see JSON with public keys (JWKS format)
   - This confirms the endpoint is accessible

2. **Test Authentication:**
   - Sign in to your application
   - Make a request to a protected Supabase table
   - Verify RLS policies work correctly

## JWT Template Configuration

**⚠️ Important:** Clerk automatically sets reserved JWT claims (`iss`, `sub`, `iat`, `exp`, `aud`) and you cannot include them in your template. These are automatically added by Clerk based on your instance configuration.

The JWT template should only include custom claims:

```json
{
  "email": "{{user.primary_email_address}}",
  "role": "authenticated",
  "metadata": {
    "onboardingComplete": "{{user.public_metadata.onboardingComplete}}"
  }
}
```

Clerk automatically sets `iss` (issuer) to your instance URL (`https://in-coral-65.clerk.accounts.dev`), which Supabase uses for verification.

## How It Works

1. **User signs in** via Clerk
2. **Clerk generates JWT** with automatically set `iss: https://in-coral-65.clerk.accounts.dev` (plus `sub`, `iat`, `exp`, `aud`)
3. **JWT is sent** to Supabase with requests
4. **Supabase verifies JWT** by:
   - Checking `iss` claim (automatically set by Clerk) matches configured issuer
   - Fetching public keys from JWKS endpoint
   - Verifying token signature
   - Validating token expiration and claims

## Troubleshooting

### Authentication Fails

- Verify issuer in JWT template matches Supabase configuration
- Check JWKS endpoint is accessible (visit URL directly)
- Ensure Supabase has correct JWKS endpoint configured
- Review Supabase authentication logs

### JWKS Endpoint Not Found

- Verify Clerk instance domain is correct
- Check that `.well-known/jwks.json` path is accessible
- Ensure Clerk instance is active and not suspended

### Issuer Mismatch

- JWT `iss` claim must exactly match Supabase issuer configuration
- Case-sensitive: `https://in-coral-65.clerk.accounts.dev`
- No trailing slashes

## References

- **Clerk JWKS Endpoint:** [https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json](https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json)
- **Supabase Third-Party Auth Docs:** https://supabase.com/docs/guides/auth/third-party-auth
- **JWT Template Setup:** See `CREATE_JWT_TEMPLATE_INSTRUCTIONS.md`
