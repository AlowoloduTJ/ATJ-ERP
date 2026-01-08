# Connect to Supabase "ATJ-ERP" - Summary

## ✅ What You Need

1. **Supabase Project**: "ATJ-ERP" (already created)
2. **Credentials**: From Supabase dashboard
3. **Environment File**: `.env.local` in project root

## 🚀 Quick Setup (3 Steps)

### 1. Get Credentials from Supabase

Go to: https://app.supabase.com → **ATJ-ERP** → **Settings** → **API**

Copy:
- Project URL
- anon public key
- service_role key

### 2. Create .env.local

Create file: `C:\VAKEM1\atj-erp\.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_API_URL=/api
```

### 3. Test Connection

```bash
npm run dev
# Visit: http://localhost:3000/connect
```

## 📚 Documentation

- **Quick Guide**: `QUICK_CONNECT_SUPABASE.md`
- **Step-by-Step**: `CONNECTION_STEPS.md`
- **Detailed Guide**: `CONNECT_SUPABASE.md`
- **Environment Setup**: `SETUP_ENV.md`

## 🔗 Test Pages

- **Connection Status**: http://localhost:3000/connect
- **Database Test**: http://localhost:3000/test-db

---

**Follow `CONNECTION_STEPS.md` for detailed instructions!**
