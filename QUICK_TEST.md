# 🚀 Quick Connection Test

## ✅ Server Status

**Dev server is starting...**

Wait 10-15 seconds, then:

## 📋 Test Steps

### 1. Open Connection Page
```
http://localhost:3000/connect
```

**Expected:** ✅ Green "Connected" status

### 2. Open Database Test Page
```
http://localhost:3000/test-db
```

**Expected:** ✅ Can create and view suppliers

### 3. Check Supabase Dashboard
- Go to: https://app.supabase.com
- Select your project
- **Table Editor** → `suppliers` table
- Verify test data appears

## ✅ Success Indicators

- ✅ Connection status: "Connected"
- ✅ Can create test data
- ✅ Data persists after refresh
- ✅ Data visible in Supabase

## 🔍 If Issues

**"Missing environment variable"**
→ Restart dev server

**"Table does not exist"**
→ Apply schema in Supabase SQL Editor

**"Connection failed"**
→ Check Supabase project is active

---

**Ready to test!** Open the pages above. 🎯
