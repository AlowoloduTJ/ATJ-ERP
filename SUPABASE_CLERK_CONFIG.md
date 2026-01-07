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

The JWT template in Clerk Dashboard should include the issuer claim:

```json
{
  "iss": "https://in-coral-65.clerk.accounts.dev",
  "sub": "{{user.id}}",
  ...
}
```

This ensures the `iss` (issuer) claim in the JWT matches what Supabase expects.

## How It Works

1. **User signs in** via Clerk
2. **Clerk generates JWT** with `iss: https://in-coral-65.clerk.accounts.dev`
3. **JWT is sent** to Supabase with requests
4. **Supabase verifies JWT** by:
   - Checking `iss` claim matches configured issuer
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
