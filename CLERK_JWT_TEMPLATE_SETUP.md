# Clerk JWT Template Setup for Supabase

## Overview

This guide walks you through creating a custom JWT template in Clerk for Supabase integration. The code has been updated to use a template named `supabase`, which provides better control over the token structure and ensures compatibility with Supabase's authentication system.

## ⚠️ Important: Create Template First

**Before deploying**, you must create the `supabase` JWT template in Clerk Dashboard. If the template doesn't exist, Supabase authentication will fail.

## Step 1: Create JWT Template in Clerk Dashboard

### 1.1 Navigate to JWT Templates

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **JWT Templates** in the left sidebar
   - If you don't see it, go to **Configure** → **JWT Templates**

### 1.2 Create New Template

1. Click **"Create Template"** or **"New Template"**
2. Name your template: `supabase` (this name will be used in code)
3. Click **"Create"**

### 1.3 Configure Template Claims

In the template editor, add the following JSON structure:

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

**⚠️ Important Note:**
Clerk automatically sets reserved JWT claims (`iss`, `sub`, `iat`, `exp`, `aud`) and you cannot include them in your template. These are automatically added by Clerk based on your instance configuration.

**Supabase Third-Party Auth Configuration:**

When setting up Clerk in Supabase Dashboard, use these values:

- **Issuer (iss):** `https://in-coral-65.clerk.accounts.dev`
- **JWKS Endpoint:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`

**Where to configure:**
1. Go to Supabase Dashboard → Authentication → Sign In/Up → Third Party Auth
2. Add or edit Clerk provider
3. Enter the Issuer and JWKS Endpoint values above
4. Save configuration

The JWKS endpoint is used by Supabase to verify JWT token signatures. You can verify it's accessible at: [https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json](https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json)

**Key Claims Explained:**
- `sub`: Subject (user ID) - **Automatically set by Clerk**, required by Supabase
- `email`: User's email address
- `role`: Set to "authenticated" for Supabase RLS
- `aud`: Audience - **Automatically set by Clerk** to "authenticated" for Supabase
- `iat`: Issued at timestamp - **Automatically set by Clerk**
- `exp`: Expiration timestamp - **Automatically set by Clerk**
- `iss`: Issuer - **Automatically set by Clerk** to your instance URL
- `metadata`: Custom metadata from user's publicMetadata

### 1.4 Save Template

1. Review your template configuration
2. Click **"Save"** or **"Apply"**

## Step 2: Update Code to Use Template

After creating the template, update your Supabase client code to use it.

### 2.1 Update Server-Side Client

Update `src/lib/supabase/server.ts`:

```typescript
export async function createSupabaseClient() {
  validateSupabaseConfig();
  
  const { getToken } = await auth();
  // Request token with 'supabase' template
  const clerkToken = await getToken({ template: 'supabase' });
  
  return createClient(supabaseUrl!, supabaseAnonKey!, {
    global: {
      fetch: async (url, options = {}) => {
        const token = clerkToken || await getToken({ template: 'supabase' });
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
      },
    },
  });
}
```

### 2.2 Update Client-Side Client

Update `src/lib/supabase/client.ts`:

```typescript
export function useSupabaseClient() {
  const { session } = useSession();
  
  return useMemo(() => {
    validateSupabaseConfig();
    
    return createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        fetch: async (url, options = {}) => {
          // Request token with 'supabase' template
          const clerkToken = await session?.getToken({ template: 'supabase' });
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              ...(clerkToken && { Authorization: `Bearer ${clerkToken}` }),
            },
          });
        },
      },
    });
  }, [session]);
}
```

## Step 3: Verify Template Usage

### 3.1 Test Token Generation

Create a test API route to verify the token structure:

```typescript
// src/app/api/test-jwt/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getToken } = await auth();
  const token = await getToken({ template: 'supabase' });
  
  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }
  
  // Decode token to inspect claims (for testing only)
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  );
  
  return NextResponse.json({
    success: true,
    tokenPreview: {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      metadata: payload.metadata,
    },
  });
}
```

### 3.2 Test Supabase Connection

After updating the code, test that Supabase can authenticate requests:

1. Sign in to your application
2. Make a request to a protected Supabase table
3. Verify RLS policies work correctly
4. Check Supabase logs to ensure authentication succeeds

## Alternative: Session Token Customization

If you prefer to customize the session token instead of creating a separate JWT template:

### Option A: Customize Default Session Token

1. Go to **Sessions** → **Customize session token**
2. Add custom claims to the default session token
3. This affects all tokens, not just Supabase

### Option B: Use Template for Specific Use Cases

1. Create template for Supabase-specific needs
2. Use default token for other integrations
3. More flexible and maintainable

## Troubleshooting

### Token Not Generated

- Verify template name matches exactly (case-sensitive)
- Check that user is authenticated
- Verify template is saved in Clerk Dashboard

### Supabase Authentication Fails

- Ensure `sub` claim is present (required by Supabase)
- Verify `role` is set to "authenticated"
- Check that Supabase is configured to accept Clerk tokens
- Review Supabase authentication logs

### Metadata Not Available

- Ensure metadata is in `publicMetadata`, not `unsafeMetadata`
- Verify template includes metadata claims
- Check that metadata is set before token generation

## Best Practices

1. **Template Naming**: Use descriptive names like `supabase`, `api`, etc.
2. **Minimal Claims**: Only include claims needed by the service
3. **Security**: Never include sensitive data in JWT tokens
4. **Testing**: Always test token structure before deploying
5. **Documentation**: Document template structure for team reference

## References

- [Clerk JWT Templates Documentation](https://clerk.com/docs/backend-requests/making/jwt-templates)
- [Supabase Third-Party Auth](https://supabase.com/docs/guides/auth/third-party-auth)
- [Supabase JWT Structure](https://supabase.com/docs/guides/auth/row-level-security)
