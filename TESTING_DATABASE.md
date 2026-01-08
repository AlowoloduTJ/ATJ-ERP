# Database Connection Testing Guide

## 🧪 Test Page Created

A test page has been created at `/test-db` to verify your database connection.

## 📋 Prerequisites

Before testing, ensure:

1. ✅ **Supabase packages installed**:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. ✅ **Environment variables set** (`.env.local`):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. ✅ **Database schema applied**:
   - Run migrations or apply schema files
   - Ensure `suppliers` table exists

## 🚀 Testing Steps

### Step 1: Access Test Page

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: http://localhost:3000/test-db

### Step 2: Check Connection Status

- **Green indicator**: Database connection successful ✅
- **Red indicator**: Connection failed ❌
- **Spinning indicator**: Checking connection...

**If connection fails:**
- Check environment variables are set correctly
- Verify Supabase project is active
- Check browser console for errors

### Step 3: Test Read Operation

1. The page automatically loads suppliers on mount
2. Check the "Suppliers List" section
3. If empty, that's okay - we'll create test data next

**Expected**: List loads without errors (even if empty)

### Step 4: Test Create Operation

1. Fill in the "Create Test Supplier" form:
   - **Name** (required): e.g., "Test Supplier Inc"
   - **Contact Person**: e.g., "John Doe"
   - **Email**: e.g., "test@supplier.com"
   - **Phone**: e.g., "+1234567890"
   - **Address**: e.g., "123 Test St"

2. Click "Create Supplier"

3. **Expected Results**:
   - Success message appears
   - Form resets
   - New supplier appears in the list
   - Connection status shows "Connected"

### Step 5: Verify Data Persistence

1. **Refresh the page** (F5 or click browser refresh)
2. **Or click the "Refresh" button**

**Expected**: The supplier you created should still be in the list

### Step 6: Verify in Supabase Dashboard

1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to **Table Editor**
3. Select the **suppliers** table
4. **Expected**: Your test supplier should be visible

## 🔍 Troubleshooting

### Issue: "Connection failed" or Red Status

**Possible Causes:**
1. Environment variables not set
2. Wrong Supabase URL or keys
3. Supabase project paused or deleted
4. Network connectivity issues

**Solutions:**
1. Check `.env.local` file exists and has correct values
2. Verify keys in Supabase dashboard (Settings → API)
3. Restart dev server after changing environment variables
4. Check browser console for detailed error messages

### Issue: "Unauthorized" Error

**Possible Causes:**
1. Not signed in to Supabase Auth
2. Row Level Security (RLS) blocking access
3. Missing authentication

**Solutions:**
1. For testing, you can temporarily disable RLS on the `suppliers` table:
   ```sql
   ALTER TABLE suppliers DISABLE ROW LEVEL SECURITY;
   ```
2. Or set up authentication first
3. Or use service role key for testing (server-side only)

### Issue: "Table does not exist"

**Possible Causes:**
1. Schema not applied to database
2. Wrong table name
3. Database not initialized

**Solutions:**
1. Apply your schema files:
   ```bash
   supabase db reset  # For local
   # OR
   supabase db push   # For remote
   ```
2. Verify table exists in Supabase dashboard
3. Check table name matches (should be `suppliers`)

### Issue: "Failed to create supplier"

**Possible Causes:**
1. Validation error (missing required fields)
2. Foreign key constraint
3. Unique constraint violation
4. RLS policy blocking insert

**Solutions:**
1. Check all required fields are filled
2. Verify no duplicate names (if unique constraint exists)
3. Check RLS policies allow inserts
4. Review error message for specific issue

### Issue: Data doesn't persist after refresh

**Possible Causes:**
1. Transaction not committed
2. Reading from wrong database/environment
3. Cache issues

**Solutions:**
1. Check Supabase dashboard to verify data was saved
2. Clear browser cache and try again
3. Verify you're connected to the correct Supabase project
4. Check if you have multiple environments (dev/staging/prod)

## ✅ Success Criteria

Your database connection is working correctly if:

- ✅ Connection status shows "Connected"
- ✅ You can create a supplier successfully
- ✅ The supplier appears in the list immediately
- ✅ The supplier persists after page refresh
- ✅ The supplier appears in Supabase dashboard

## 📊 What Gets Tested

### Read Operations
- ✅ `listSuppliers()` - Fetches all suppliers
- ✅ Data loading on page mount
- ✅ Error handling for failed reads

### Write Operations
- ✅ `createSupplier()` - Creates new supplier
- ✅ Form submission handling
- ✅ Success/error feedback

### Data Persistence
- ✅ Data survives page refresh
- ✅ Data visible in Supabase dashboard
- ✅ Real-time updates (after refresh)

## 🔄 Next Steps After Testing

Once testing is successful:

1. **Test other modules**: Try inventory, products, employees, etc.
2. **Set up authentication**: Configure Supabase Auth
3. **Enable RLS**: Set up Row Level Security policies
4. **Add more features**: Extend with update/delete operations
5. **Remove test page**: Delete `/test-db` route when done (optional)

## 📚 Related Documentation

- **Server Actions Guide**: `SERVER_ACTIONS_GUIDE.md`
- **Supabase Setup**: `SUPABASE_SETUP.md`
- **Environment Variables**: `ENV_SETUP.md`

---

**Ready to test!** Navigate to http://localhost:3000/test-db and follow the steps above.
