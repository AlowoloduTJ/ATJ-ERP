# JWT Template Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Template in Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **Configure** → **JWT Templates**
4. Click **"Create Template"**
5. Name: `supabase` (exactly as shown - case-sensitive)
6. Click **"Create"**

### Step 2: Add Template Content

Paste this JSON into the template editor:

```json
{
  "iss": "https://in-coral-65.clerk.accounts.dev",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "username": "{{user.username}}",
  "two_factor_enabled": "{{user.two_factor_enabled}}",
  "phone_number_verified": "{{user.phone_number_verified}}",
  "full_name": "{{user.full_name}}",
  "first_name": "{{user.first_name}}",
  "last_name": "{{user.last_name}}",
  "primary_phone_number": "{{user.primary_phone_number}}",
  "role": "authenticated",
  "aud": "authenticated",
  "iat": "{{session.created_at}}",
  "exp": "{{session.last_active_at}}",
  "metadata": {
    "onboardingComplete": "{{user.public_metadata.onboardingComplete}}",
    "role": "{{user.public_metadata.role}}"
  }
}
```

**Supabase Configuration:**
- **Issuer:** `https://in-coral-65.clerk.accounts.dev`
- **JWKS Endpoint:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`

7. Click **"Save"**

### Step 3: Test the Template

1. Sign in to your application
2. Visit: `http://localhost:3000/api/test-jwt`
3. You should see a JSON response with token details
4. Verify `sub`, `email`, and `role` are present

## ✅ Verification Checklist

- [ ] Template named `supabase` created in Clerk Dashboard
- [ ] Template JSON saved successfully
- [ ] `/api/test-jwt` endpoint returns token data
- [ ] Supabase authentication works (test with a protected table)

## 🔧 Code Already Updated

The following files have been updated to use the `supabase` template:

- ✅ `src/lib/supabase/server.ts` - Server-side client
- ✅ `src/lib/supabase/client.ts` - Client-side hook
- ✅ `src/app/api/test-jwt/route.ts` - Test endpoint

## 📚 Full Documentation

See `CLERK_JWT_TEMPLATE_SETUP.md` for detailed explanations and troubleshooting.

## 🆘 Troubleshooting

### "No token generated" error

- Verify template name is exactly `supabase` (case-sensitive)
- Check template is saved in Clerk Dashboard
- Ensure user is authenticated

### Supabase authentication fails

- Verify `sub` claim is present in token
- Check `role` is set to "authenticated"
- Review Supabase authentication logs

### Template not found

- Double-check template name spelling
- Verify template is saved (not just created)
- Try refreshing Clerk Dashboard
