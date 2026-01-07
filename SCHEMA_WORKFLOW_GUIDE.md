# Declarative Schema Workflow - Step-by-Step Guide

## Prerequisites

1. **Install Supabase CLI** (if not installed):
   ```bash
   npm install -g supabase
   # OR
   brew install supabase/tap/supabase  # macOS
   ```

2. **Verify installation**:
   ```bash
   supabase --version
   ```

## Step 1: Review Schema Files ✅

Your schema files are organized in `supabase/schemas/`:

- ✅ **00_extensions.sql** - UUID extension
- ✅ **01_auth.sql** - Users, roles, permissions
- ✅ **02_warehouse.sql** - Inventory, suppliers, purchases
- ✅ **03_production.sql** - Products, production orders
- ✅ **04_ledger.sql** - Financial transactions
- ✅ **05_hr.sql** - Employees, attendance, payroll
- ✅ **06_audit.sql** - Audit trails
- ✅ **07_admin.sql** - Settings, approvals
- ✅ **08_indexes.sql** - Performance indexes

**Schema Review Checklist:**
- ✅ All tables use UUID primary keys
- ✅ All timestamps use `TIMESTAMP WITH TIME ZONE`
- ✅ Foreign key relationships are properly defined
- ✅ Unique constraints on appropriate fields
- ✅ Indexes defined for performance

## Step 2: Initialize Supabase (If Not Done)

```bash
cd C:\VAKEM1\atj-erp
supabase init
```

This creates:
- `supabase/config.toml` - Configuration file
- `supabase/migrations/` - Migration directory (empty initially)

## Step 3: Generate Migration from Schema

The `supabase db diff` command compares your declared schema files with the current database state and generates a migration.

### For Local Development:

```bash
# Start local Supabase (if not running)
supabase start

# Generate migration from schema files
supabase db diff -f initial_schema --schema public
```

**What happens:**
- Supabase reads all files in `supabase/schemas/`
- Compares with current database state
- Generates migration file in `supabase/migrations/`
- Creates `CREATE TABLE`, `CREATE INDEX`, etc. statements

### For Remote/Production:

```bash
# Link to your Supabase project
supabase login
supabase link --project-ref <your-project-ref>

# Generate migration comparing schema to remote database
supabase db diff -f initial_schema --schema public
```

## Step 4: Review Generated Migration

The migration file will be created in `supabase/migrations/` with a timestamp prefix, e.g.:
```
supabase/migrations/20240106120000_initial_schema.sql
```

**What to check:**
- ✅ All tables are included
- ✅ Foreign keys are correct
- ✅ Indexes are included
- ✅ No unexpected DROP statements (if starting fresh)

## Step 5: Apply Migration

### Local Development:

```bash
# Apply the migration
supabase db migrate up

# OR reset and apply all (fresh start)
supabase db reset
```

### Remote/Production:

```bash
# Push migration to remote database
supabase db push
```

**What happens:**
- Migration is executed against the database
- Tables are created
- Indexes are created
- Foreign keys are enforced

## Step 6: Verify in Dashboard

1. **Local Dashboard**: Visit `http://localhost:54323` (after `supabase start`)
2. **Production Dashboard**: Visit your Supabase project dashboard
3. **Check Tables**: Go to Table Editor → Verify all tables exist
4. **Check Relationships**: Go to Database → Relationships → Verify foreign keys

## Step 7: Insert Sample Data

Create a seed file or use SQL directly:

```sql
-- Example: Insert sample roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('manager', 'Manager with limited admin access'),
  ('employee', 'Standard employee access');

-- Example: Insert sample user
INSERT INTO users (email, password_hash, name, role_id)
SELECT 
  'admin@atj-erp.com',
  '$2a$10$...', -- Hashed password
  'Admin User',
  id
FROM roles WHERE name = 'admin';

-- Example: Insert sample department
INSERT INTO departments (name, code) VALUES
  ('Operations', 'OPS'),
  ('Finance', 'FIN'),
  ('Human Resources', 'HR');
```

## Troubleshooting

### Issue: "No schema files found"
**Solution**: Ensure schema files are in `supabase/schemas/` directory

### Issue: "Migration conflicts"
**Solution**: Review existing migrations and resolve conflicts manually

### Issue: "Foreign key constraint fails"
**Solution**: Ensure tables are created in correct order (dependencies first)

### Issue: "Extension not found"
**Solution**: Ensure `00_extensions.sql` runs first

## Documentation References

- **Main Guide**: [Supabase Declarative Database Schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
- **CLI Commands**: [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- **Migrations**: [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- **Local Development**: [Local Development Setup](https://supabase.com/docs/guides/cli/local-development)

## Next Steps After Schema Setup

1. **Create Seed Data**: Add initial data (roles, permissions, admin user)
2. **Set Up Row Level Security (RLS)**: Configure access policies
3. **Create Functions**: Add database functions for business logic
4. **Set Up Triggers**: Automate audit trails, balance calculations
5. **Configure API**: Set up PostgREST API access
