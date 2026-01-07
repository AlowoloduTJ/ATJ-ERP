# Test Your Supabase Connection

## ✅ Environment Variables Set

Your `.env.local` file has been created with:
- ✅ Project URL: `https://svtlzyfmzeizkxeigbzc.supabase.co`
- ✅ Anon Key: Configured
- ✅ Service Role Key: Configured

## 🚀 Test Connection

### Step 1: Restart Dev Server

```bash
# Stop current server (Ctrl+C if running)
cd C:\VAKEM1\atj-erp
npm run dev
```

### Step 2: Visit Test Pages

1. **Connection Status Page**: http://localhost:3000/connect
   - Should show: ✅ **"Connected to Supabase"**

2. **Database Test Page**: http://localhost:3000/test-db
   - Should show: ✅ **"Connected to database"**
   - Try creating a test supplier
   - Verify data persists after refresh

### Step 3: Verify in Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select your project
3. Go to **Table Editor**
4. Check if test data appears in the `suppliers` table

## ✅ Success Indicators

- [ ] Dev server starts without errors
- [ ] Connection status shows "Connected"
- [ ] Can create test data
- [ ] Data persists after refresh
- [ ] Data visible in Supabase dashboard

## 🔍 Troubleshooting

### "Missing environment variable" Error

**Solution**: 
- Verify `.env.local` exists in `C:\VAKEM1\atj-erp\.env.local`
- Restart dev server after creating file
- Check for typos in variable names

### "Connection failed" Error

**Check**:
- Values are correct (no extra spaces)
- Project URL format is correct
- Supabase project is active (not paused)
- Internet connection is working

### "Table does not exist" Error

**Solution**: Apply your database schema:
1. Go to Supabase → SQL Editor
2. Run schema files from `supabase/schemas/` folder
3. Or use: `supabase db push` (if CLI installed)

---

**Ready to test!** Restart your dev server and visit the test pages. 🎯
