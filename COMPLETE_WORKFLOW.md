# Complete Declarative Schema Workflow

This guide walks you through the complete workflow from schema review to data insertion.

## 📋 Prerequisites Checklist

- [ ] Supabase CLI installed
- [ ] Supabase project initialized
- [ ] Schema files reviewed
- [ ] Local Supabase running (for local development)

## Step 1: Install Supabase CLI

### Windows (using npm):
```bash
npm install -g supabase
```

### macOS (using Homebrew):
```bash
brew install supabase/tap/supabase
```

### Verify Installation:
```bash
supabase --version
```

**Documentation**: [Supabase CLI Installation](https://supabase.com/docs/guides/cli/getting-started)

## Step 2: Initialize Supabase Project

```bash
cd C:\VAKEM1\atj-erp
supabase init
```

This creates:
- `supabase/config.toml` - Configuration file
- `supabase/migrations/` - Directory for migration files

**What to check:**
- ✅ `supabase/config.toml` exists
- ✅ `supabase/migrations/` directory exists

## Step 3: Review Schema Files ✅

Your schema is organized in `supabase/schemas/`:

```
supabase/schemas/
├── 00_extensions.sql    ✅ UUID extension
├── 01_auth.sql         ✅ Users, roles, permissions
├── 02_warehouse.sql    ✅ Inventory, suppliers
├── 03_production.sql   ✅ Production orders
├── 04_ledger.sql       ✅ Financial transactions
├── 05_hr.sql          ✅ Employees, payroll
├── 06_audit.sql       ✅ Audit trails
├── 07_admin.sql       ✅ Settings
└── 08_indexes.sql     ✅ Performance indexes
```

**Schema Review Checklist:**
- ✅ All 9 schema files present
- ✅ Files numbered correctly (00-08)
- ✅ All use `TIMESTAMP WITH TIME ZONE`
- ✅ Foreign keys properly defined
- ✅ Dependencies respected (employees before reimbursements)

## Step 4: Start Local Supabase (For Local Development)

```bash
supabase start
```

This starts:
- PostgreSQL database (port 54322)
- PostgREST API (port 54321)
- Supabase Studio (port 54323)
- Realtime (port 54324)

**Access Local Dashboard:**
- Studio: http://localhost:54323
- Database connection: `postgresql://postgres:postgres@localhost:54322/postgres`

## Step 5: Generate Migration from Schema

The `supabase db diff` command compares your declared schema with the current database and generates a migration.

### For Local Development:

```bash
# Generate migration from schema files
supabase db diff -f initial_schema --schema public
```

**What this does:**
1. Reads all files in `supabase/schemas/`
2. Compares with current database state (empty if fresh)
3. Generates migration file in `supabase/migrations/`
4. Creates all `CREATE TABLE`, `CREATE INDEX` statements

**Expected Output:**
```
Creating new migration: supabase/migrations/20240106120000_initial_schema.sql
```

### For Remote/Production Database:

```bash
# First, link to your Supabase project
supabase login
supabase link --project-ref <your-project-ref>

# Then generate migration comparing schema to remote
supabase db diff -f initial_schema --schema public
```

**Documentation**: [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)

## Step 6: Review Generated Migration

The migration file will be in `supabase/migrations/` with format:
```
YYYYMMDDHHMMSS_initial_schema.sql
```

**Open and review the file:**

```bash
# View the migration file
cat supabase/migrations/*_initial_schema.sql
# OR on Windows
type supabase\migrations\*_initial_schema.sql
```

**What to verify:**
- ✅ All tables from schema files are included
- ✅ Extensions are created first
- ✅ Tables are in correct order (dependencies respected)
- ✅ Foreign keys are included
- ✅ Indexes are included
- ✅ No unexpected `DROP` statements (if starting fresh)

**Example migration structure:**
```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE roles (...);
CREATE TABLE permissions (...);
CREATE TABLE users (...);
-- ... all other tables ...

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
-- ... all other indexes ...
```

## Step 7: Apply Migration

### Local Development:

```bash
# Apply the migration
supabase db migrate up

# OR reset database and apply all migrations (fresh start)
supabase db reset
```

**What happens:**
- Migration is executed against local database
- All tables are created
- All indexes are created
- Foreign key constraints are enforced

**Verify:**
```bash
# Check migration status
supabase db migrate list
```

### Remote/Production:

```bash
# Push migration to remote database
supabase db push
```

**⚠️ Warning**: This applies changes to your production database. Review carefully first!

**Documentation**: [Applying Migrations](https://supabase.com/docs/guides/cli/local-development#applying-migrations)

## Step 8: Verify Tables in Dashboard

### Local Dashboard:
1. Open http://localhost:54323
2. Go to **Table Editor**
3. Verify all tables are listed:
   - roles, permissions, users, sessions
   - inventory_categories, suppliers, inventory
   - products, production_orders
   - clients, customers, expenses
   - departments, employees, attendance
   - audit_trails, settings, approvals

### Check Relationships:
1. Go to **Database** → **Relationships**
2. Verify foreign key relationships are shown
3. Check that relationships match your schema

### Check Indexes:
1. Go to **Database** → **Indexes**
2. Verify indexes from `08_indexes.sql` are created

## Step 9: Insert Sample Data

### Option 1: Use Seed File

A seed file is provided at `supabase/seed.sql`. Apply it:

```bash
# For local development
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed.sql

# OR using Supabase CLI
supabase db execute -f supabase/seed.sql
```

### Option 2: Manual Insert via Dashboard

1. Open Supabase Studio (http://localhost:54323)
2. Go to **Table Editor**
3. Select a table (e.g., `roles`)
4. Click **Insert** → **Insert row**
5. Fill in data and save

### Option 3: SQL Editor

1. Open Supabase Studio
2. Go to **SQL Editor**
3. Run SQL commands:

```sql
-- Insert sample role
INSERT INTO roles (name, description) 
VALUES ('admin', 'Administrator with full access');

-- Insert sample user (with proper password hash)
INSERT INTO users (email, password_hash, name, role_id)
SELECT 
  'admin@atj-erp.com',
  '$2a$10$...', -- Replace with actual bcrypt hash
  'Admin User',
  id
FROM roles WHERE name = 'admin';

-- Insert sample department
INSERT INTO departments (name, code) 
VALUES ('Operations', 'OPS');
```

## Step 10: Test the Structure

### Verify Data Integrity:

```sql
-- Check foreign key relationships
SELECT 
  u.email,
  r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id;

-- Check inventory structure
SELECT 
  i.name,
  ic.name as category,
  s.name as supplier
FROM inventory i
LEFT JOIN inventory_categories ic ON i.category_id = ic.id
LEFT JOIN suppliers s ON i.supplier_id = s.id;
```

### Test Constraints:

```sql
-- Try to insert duplicate email (should fail)
INSERT INTO users (email, password_hash, name) 
VALUES ('admin@atj-erp.com', 'hash', 'Duplicate');

-- Try to insert invalid foreign key (should fail)
INSERT INTO users (email, password_hash, name, role_id) 
VALUES ('test@test.com', 'hash', 'Test', '00000000-0000-0000-0000-000000000000');
```

## Troubleshooting

### Issue: "supabase: command not found"
**Solution**: Install Supabase CLI (see Step 1)

### Issue: "No schema files found"
**Solution**: Ensure files are in `supabase/schemas/` directory

### Issue: "Migration file not generated"
**Solution**: 
- Check that `supabase init` was run
- Verify schema files exist in `supabase/schemas/`
- Try `supabase db diff -f test --schema public --use-migra`

### Issue: "Foreign key constraint fails"
**Solution**: 
- Check table creation order in migration
- Ensure parent tables are created before child tables
- Review dependencies in schema files

### Issue: "Extension uuid-ossp does not exist"
**Solution**: 
- Ensure `00_extensions.sql` runs first
- Check that extension is enabled in database

## Documentation References

- **Main Guide**: [Declarative Database Schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
- **CLI Reference**: [Supabase CLI](https://supabase.com/docs/reference/cli)
- **Migrations**: [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- **Local Development**: [Local Development Setup](https://supabase.com/docs/guides/cli/local-development)

## Next Steps

After schema is set up:

1. **Row Level Security (RLS)**: Configure access policies
2. **Database Functions**: Add business logic functions
3. **Triggers**: Automate audit trails, balance calculations
4. **API Setup**: Configure PostgREST for API access
5. **Seed Data**: Add comprehensive initial data

---

**Ready to proceed?** Start with Step 1 and work through each step sequentially.
