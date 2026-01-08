# Step-by-Step: Create JWT Template in Clerk Dashboard

## 📋 Prerequisites

- Access to [Clerk Dashboard](https://dashboard.clerk.com/)
- Your Clerk application selected
- Admin permissions to create JWT templates

---

## 🎯 Step-by-Step Instructions

### Step 1: Navigate to JWT Templates

1. **Open Clerk Dashboard**
   - Go to: https://dashboard.clerk.com/
   - Sign in with your Clerk account

2. **Select Your Application**
   - Click on your application name from the list
   - If you have multiple applications, make sure you select the correct one

3. **Find JWT Templates Section**
   - Look for **"Configure"** in the left sidebar menu
   - Click on **"Configure"** to expand the menu
   - Click on **"JWT Templates"**
   
   **Alternative path:**
   - Some Clerk dashboards show **"JWT Templates"** directly in the sidebar
   - Look for it under **"Settings"** or **"Configuration"**

### Step 2: Create New Template

1. **Click "Create Template" Button**
   - You'll see a button labeled **"Create Template"** or **"New Template"**
   - It's usually in the top-right corner of the page
   - Click it to start creating a new template

2. **Enter Template Name**
   - A dialog or form will appear
   - In the **"Name"** field, enter exactly: `supabase`
   - ⚠️ **Important:** The name must be exactly `supabase` (lowercase, no spaces)
   - This name is case-sensitive and must match what's in your code

3. **Click "Create" or "Next"**
   - Click the button to proceed to the template editor

### Step 3: Configure Template Content

1. **Open the Template Editor**
   - You'll see a JSON editor or text area
   - This is where you'll paste the template configuration

2. **Clear Any Default Content**
   - If there's any default JSON, delete it first
   - Start with a clean editor

3. **Paste the Template JSON**
   - Copy the entire JSON block below
   - Paste it into the editor

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

**Important Configuration for Supabase:**

When configuring Clerk as a third-party auth provider in Supabase, use these values:

- **Issuer:** `https://in-coral-65.clerk.accounts.dev`
- **JWKS Endpoint:** `https://in-coral-65.clerk.accounts.dev/.well-known/jwks.json`

These are configured in Supabase Dashboard → Authentication → Third Party Auth → Clerk settings.

4. **Verify JSON Format**
   - Make sure there are no syntax errors
   - The JSON should be properly formatted with correct brackets and commas
   - Most editors will highlight syntax errors in red

### Step 4: Save the Template

1. **Review Your Template**
   - Double-check the template name is `supabase`
   - Verify the JSON is correctly formatted
   - Ensure all required fields are present

2. **Click "Save" or "Apply"**
   - Look for a **"Save"**, **"Apply"**, or **"Create"** button
   - Usually located at the bottom-right of the dialog
   - Click it to save your template

3. **Confirm Success**
   - You should see a success message
   - The template should now appear in your JWT Templates list
   - You should see `supabase` in the list of templates

---

## ✅ Verification Checklist

After creating the template, verify:

- [ ] Template name is exactly `supabase` (lowercase)
- [ ] Template appears in your JWT Templates list
- [ ] JSON is saved correctly (no errors shown)
- [ ] Template is active/enabled (if there's a toggle)

---

## 🧪 Test Your Template

### Option 1: Use the Test Endpoint

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Sign in to your application**

3. **Visit the test endpoint:**
   - Open: `http://localhost:3000/api/test-jwt`
   - You should see a JSON response with token details

4. **Verify the response includes:**
   - `success: true`
   - `tokenPreview.sub` (user ID)
   - `tokenPreview.email` (user email)
   - `tokenPreview.role` (should be "authenticated")

### Option 2: Test with Supabase

1. **Sign in to your application**

2. **Make a request to a protected Supabase table**

3. **Verify authentication works:**
   - Check that RLS policies are enforced
   - Verify you can only access your own data

---

## 📝 Template Fields Explained

| Field | Description | Required |
|-------|-------------|----------|
| `sub` | Subject (User ID) - Used by Supabase for RLS | ✅ Yes |
| `email` | User's primary email address | ✅ Yes |
| `role` | Set to "authenticated" for Supabase RLS | ✅ Yes |
| `aud` | Audience - Set to "authenticated" | ✅ Yes |
| `iat` | Issued at timestamp | Optional |
| `exp` | Expiration timestamp | Optional |
| `metadata` | Custom metadata from user's publicMetadata | Optional |

---

## 🔧 Troubleshooting

### Template Not Found Error

**Problem:** Code returns "No token generated" or "Template not found"

**Solutions:**
1. Verify template name is exactly `supabase` (case-sensitive)
2. Check template is saved (not just created)
3. Refresh Clerk Dashboard and verify template exists
4. Ensure you're using the correct Clerk application

### JSON Syntax Errors

**Problem:** Clerk Dashboard shows JSON errors

**Solutions:**
1. Copy the JSON exactly as shown (no extra spaces)
2. Ensure all brackets `{}` and commas are correct
3. Check that all quotes are straight quotes `"`, not curly quotes `"`
4. Remove any trailing commas

### Token Missing Claims

**Problem:** Token doesn't include expected fields

**Solutions:**
1. Verify user has the required data (email, metadata, etc.)
2. Check that `publicMetadata` is set correctly
3. Ensure template variables use correct syntax: `{{user.id}}`
4. Test with a user that has complete profile data

### Supabase Authentication Fails

**Problem:** Supabase rejects the token

**Solutions:**
1. Verify `sub` claim is present (required by Supabase)
2. Check `role` is set to "authenticated"
3. Ensure Supabase is configured to accept Clerk tokens
4. Review Supabase authentication logs in dashboard

---

## 📚 Additional Resources

- **Clerk JWT Templates Docs:** https://clerk.com/docs/backend-requests/making/jwt-templates
- **Supabase Third-Party Auth:** https://supabase.com/docs/guides/auth/third-party-auth
- **Full Setup Guide:** See `CLERK_JWT_TEMPLATE_SETUP.md`

---

## 🎉 Success!

Once you've completed these steps:

1. ✅ Template created in Clerk Dashboard
2. ✅ Template tested with `/api/test-jwt`
3. ✅ Supabase authentication working

Your JWT template is ready to use! The code will automatically request tokens using this template when making Supabase requests.

---

## 💡 Quick Reference

**Template Name:** `supabase`

**Required Claims:**
- `sub` (user ID)
- `email` (user email)
- `role` ("authenticated")
- `aud` ("authenticated")

**Test Endpoint:** `/api/test-jwt`

**Code Files Using Template:**
- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
