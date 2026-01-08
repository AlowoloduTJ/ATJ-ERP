# Supabase Declarative Schema Management

This directory contains the declarative database schema for ATJ-ERP using Supabase's recommended approach.

## 📚 Official Documentation

For detailed information on Supabase's declarative schema management, refer to:
- [Supabase Declarative Database Schemas Guide](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli/getting-started)

## 📁 Schema File Structure

The schema is organized into logical modules in the `schemas/` directory:

```
supabase/
├── schemas/
│   ├── 00_extensions.sql      # PostgreSQL extensions (UUID)
│   ├── 01_auth.sql            # Authentication & authorization
│   ├── 02_warehouse.sql       # Warehouse & inventory management
│   ├── 03_production.sql     # Production orders & material management
│   ├── 04_ledger.sql         # Financial ledger & transactions
│   ├── 05_hr.sql             # Human resources management
│   ├── 06_audit.sql          # Audit trails
│   ├── 07_admin.sql          # System settings & approvals
│   └── 08_indexes.sql         # Performance indexes
└── README.md                  # This file
```

## 🔄 Workflow

### 1. Initialize Supabase Project

If you haven't already, initialize Supabase in your project:

```bash
supabase init
```

This creates the necessary configuration files.

### 2. Define Your Schema

The schema files in `supabase/schemas/` represent the **desired final state** of your database. These are NOT migration files - they define what your database should look like.

**Key Principles:**
- ✅ Each file represents a logical module
- ✅ Files are numbered to ensure correct execution order
- ✅ Use `CREATE TABLE` statements (not `ALTER TABLE`)
- ✅ Include all constraints, indexes, and relationships
- ✅ Use `TIMESTAMP WITH TIME ZONE` for all timestamp fields (PostgreSQL best practice)

### 3. Generate Migration Files

When you make changes to your schema files, generate migration files by comparing your declared schema with the current database state:

```bash
supabase db diff -f <migration_name>
```

For example:
```bash
supabase db diff -f add_inventory_tracking
```

This command:
- Compares your `schemas/` files with the current database
- Generates a migration file in `supabase/migrations/`
- Creates the necessary `CREATE`, `ALTER`, or `DROP` statements

### 4. Apply Migrations Locally

Start your local Supabase environment and apply migrations:

```bash
# Start local Supabase (includes PostgreSQL, PostgREST, etc.)
supabase start

# Apply all pending migrations
supabase db migrate up
```

Or use the reset command to start fresh:
```bash
supabase db reset
```

### 5. Deploy to Production

When ready to deploy to your production Supabase project:

```bash
# Login to Supabase
supabase login

# Link your local project to remote project
supabase link --project-ref <your-project-ref>

# Push migrations to production
supabase db push
```

## 📋 Schema File Details

### 00_extensions.sql
- Enables PostgreSQL extensions (UUID generation)

### 01_auth.sql
- Users, roles, permissions
- Session management
- Role-based access control

### 02_warehouse.sql
- Inventory categories and items
- Suppliers
- Bulk purchases and items
- Stock transfers
- Stock movements (audit trail for inventory)

### 03_production.sql
- Products
- Production orders
- Material requisitions
- Work in progress (WIP)
- Finished goods

### 04_ledger.sql
- Clients and customers
- Office divisions
- Expenses and categories
- Reimbursements and retirements
- Client/customer/division transactions
- Chart of accounts
- Journal entries and lines

### 05_hr.sql
- Departments
- Employees
- Attendance tracking
- Leave types and leave requests
- Payroll

### 06_audit.sql
- Audit trails for all system changes
- Tracks user actions, entity changes, IP addresses

### 07_admin.sql
- System settings (key-value store)
- Approval workflows

### 08_indexes.sql
- Performance indexes for common query patterns
- Composite indexes for multi-column queries
- Indexes on foreign keys for join performance

## 🎯 Best Practices

### PostgreSQL Data Types

- **UUID**: All primary keys use UUID for better distribution and security
- **DECIMAL(10,2)**: Monetary values and quantities (supports up to 99,999,999.99)
- **TIMESTAMP WITH TIME ZONE**: All timestamp fields (not `TIMESTAMP` without timezone)
- **VARCHAR(n)**: Text fields with known length limits
- **TEXT**: Unlimited text fields
- **JSONB**: Structured data (audit trail changes)

### Constraints

- **Primary Keys**: UUID with `uuid_generate_v4()` default
- **Foreign Keys**: All relationships enforced with `REFERENCES` constraints
- **Unique Constraints**: Prevent duplicates (email, sku, employee_number, etc.)
- **NOT NULL**: Required fields explicitly marked
- **DEFAULT Values**: Sensible defaults (timestamps, booleans, numeric zeros)

### Cascade Behavior

- **ON DELETE CASCADE**: Used for child records (items, lines) that should be deleted with parent
- **ON DELETE SET NULL**: Not used (we prefer explicit handling)
- **ON DELETE RESTRICT**: Default behavior for most relationships

### Indexing Strategy

- Primary keys: Automatic indexes
- Foreign keys: Indexed for join performance
- Status fields: Indexed for filtering
- Date fields: Indexed for range queries
- Composite indexes: For common query patterns (entity_type + entity_id)

## 🔍 Making Schema Changes

### Example: Adding a New Table

1. **Edit the appropriate schema file** (or create a new one):
   ```sql
   -- In 02_warehouse.sql
   CREATE TABLE inventory_adjustments (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       inventory_id UUID REFERENCES inventory(id) NOT NULL,
       adjustment_type VARCHAR(50) NOT NULL,
       quantity DECIMAL(10,2) NOT NULL,
       reason TEXT,
       adjusted_by UUID REFERENCES users(id),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Generate migration**:
   ```bash
   supabase db diff -f add_inventory_adjustments
   ```

3. **Review the generated migration** in `supabase/migrations/`

4. **Apply locally**:
   ```bash
   supabase db migrate up
   ```

5. **Test your changes**

6. **Deploy to production**:
   ```bash
   supabase db push
   ```

### Example: Modifying an Existing Table

1. **Update the schema file**:
   ```sql
   -- In 01_auth.sql, modify users table
   CREATE TABLE users (
       -- ... existing columns ...
       phone VARCHAR(50),  -- Add new column
       -- ... rest of table ...
   );
   ```

2. **Generate migration**:
   ```bash
   supabase db diff -f add_user_phone
   ```

3. **Review and apply** as above

## ⚠️ Important Notes

1. **Schema files are the source of truth**: Always edit schema files, not migration files directly
2. **Migration files are generated**: Don't manually edit migration files unless absolutely necessary
3. **Order matters**: Schema files are numbered to ensure correct execution order
4. **Dependencies**: Some tables depend on others (e.g., `employees` depends on `departments` and `users`)
5. **Time zones**: Always use `TIMESTAMP WITH TIME ZONE` for consistency across time zones

## 🚀 Getting Started

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Initialize Supabase** (if not already done):
   ```bash
   supabase init
   ```

3. **Start local development**:
   ```bash
   supabase start
   ```

4. **Apply schema**:
   ```bash
   supabase db reset  # This will apply all schema files
   ```

5. **Verify schema**:
   ```bash
   supabase db diff  # Should show no differences if schema matches
   ```

## 📖 Additional Resources

- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [PostgreSQL Best Practices](https://www.postgresql.org/docs/current/ddl-best-practices.html)
- [UUID vs Serial Primary Keys](https://www.postgresql.org/docs/current/datatype-uuid.html)

---

**Last Updated**: Based on Supabase declarative schema management guide
**Schema Version**: MVP v1.0
