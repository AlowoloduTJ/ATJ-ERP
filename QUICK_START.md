# Quick Start: Declarative Schema Workflow

## ✅ Step 1: Schema Review - COMPLETE

Your schema files are correctly organized:

```
supabase/schemas/
✅ 00_extensions.sql    (UUID extension)
✅ 01_auth.sql         (Users, roles, permissions)
✅ 02_warehouse.sql    (Inventory, suppliers)
✅ 03_production.sql   (Production orders)
✅ 04_ledger.sql       (Financial transactions)
✅ 05_hr.sql          (Employees, payroll, reimbursements)
✅ 06_audit.sql       (Audit trails)
✅ 07_admin.sql       (Settings, approvals)
✅ 08_indexes.sql     (Performance indexes)
```

**Schema is ready!** All files follow PostgreSQL best practices:
- ✅ UUID primary keys
- ✅ TIMESTAMP WITH TIME ZONE for all timestamps
- ✅ Proper foreign key relationships
- ✅ Correct dependency order

## 📝 Step 2: Install & Initialize Supabase

### Install Supabase CLI:
```bash
npm install -g supabase
```

### Initialize Project:
```bash
cd C:\VAKEM1\atj-erp
supabase init
```

This creates `supabase/config.toml` and `supabase/migrations/` directory.

## 🚀 Step 3: Generate Migration

### Start Local Supabase (if using local):
```bash
supabase start
```

### Generate Migration from Schema:
```bash
supabase db diff -f initial_schema --schema public
```

**What happens:**
- Reads all files in `supabase/schemas/`
- Compares with current database (empty if fresh)
- Generates migration file: `supabase/migrations/YYYYMMDDHHMMSS_initial_schema.sql`

### Review Generated Migration:
```bash
# View the migration file (adjust filename)
type supabase\migrations\*_initial_schema.sql
```

**Expected content:**
- CREATE EXTENSION statements
- CREATE TABLE statements (all 40+ tables)
- CREATE INDEX statements
- Foreign key constraints

## ✅ Step 4: Apply Migration

### Local Development:
```bash
supabase db migrate up
```

### Or Reset and Apply Fresh:
```bash
supabase db reset
```

**What happens:**
- Executes migration against database
- Creates all tables
- Creates all indexes
- Enforces foreign key constraints

## 🔍 Step 5: Verify in Dashboard

### Local Dashboard:
1. Open: http://localhost:54323
2. Go to **Table Editor**
3. Verify tables exist:
   - `roles`, `permissions`, `users`, `sessions`
   - `inventory_categories`, `suppliers`, `inventory`
   - `products`, `production_orders`
   - `clients`, `customers`, `expenses`
   - `departments`, `employees`, `attendance`
   - `audit_trails`, `settings`, `approvals`

### Check Relationships:
1. Go to **Database** → **Relationships**
2. Verify foreign keys are shown

## 📊 Step 6: Insert Sample Data

### Option 1: Use Seed File
```bash
# Using psql (if installed)
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed.sql
```

### Option 2: Via SQL Editor in Dashboard
1. Open http://localhost:54323
2. Go to **SQL Editor**
3. Copy and paste from `supabase/seed.sql`
4. Run the queries

### Option 3: Manual Insert via Table Editor
1. Open **Table Editor** in dashboard
2. Select a table (e.g., `roles`)
3. Click **Insert** → **Insert row**
4. Fill in data

## 📚 Documentation References

- **Main Guide**: https://supabase.com/docs/guides/local-development/declarative-database-schemas
- **CLI Commands**: https://supabase.com/docs/reference/cli
- **Migrations**: https://supabase.com/docs/guides/cli/local-development#database-migrations

## 🎯 Complete Command Sequence

```bash
# 1. Install (if needed)
npm install -g supabase

# 2. Initialize
cd C:\VAKEM1\atj-erp
supabase init

# 3. Start local Supabase
supabase start

# 4. Generate migration
supabase db diff -f initial_schema --schema public

# 5. Review migration (optional)
type supabase\migrations\*_initial_schema.sql

# 6. Apply migration
supabase db migrate up

# 7. Insert seed data (optional)
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed.sql

# 8. Open dashboard
# Visit: http://localhost:54323
```

## ⚠️ Troubleshooting

**"supabase: command not found"**
→ Install: `npm install -g supabase`

**"No schema files found"**
→ Check: `supabase/schemas/` directory exists

**"Migration not generated"**
→ Try: `supabase db diff -f test --schema public --use-migra`

**"Foreign key constraint fails"**
→ Check: Table creation order in migration file

---

**For detailed instructions, see `COMPLETE_WORKFLOW.md`**
