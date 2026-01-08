# Schema Files

This directory contains the declarative schema files that define the desired state of the ATJ-ERP database.

## File Execution Order

Files are numbered to ensure correct execution order:

1. **00_extensions.sql** - Must run first (enables UUID extension)
2. **01_auth.sql** - Authentication (required by other modules)
3. **02_warehouse.sql** - Warehouse module
4. **03_production.sql** - Production module (depends on warehouse for inventory)
5. **04_ledger.sql** - Ledger module (depends on hr for employees)
6. **05_hr.sql** - HR module (depends on auth for users)
7. **06_audit.sql** - Audit module (depends on auth for users)
8. **07_admin.sql** - Admin module (depends on auth for users)
9. **08_indexes.sql** - Indexes (must run last, after all tables exist)

## Schema Principles

- **Declarative**: These files define the desired final state, not migrations
- **Idempotent**: Can be run multiple times safely (uses `CREATE TABLE IF NOT EXISTS` patterns)
- **Complete**: Each file contains all necessary tables, constraints, and relationships for its module
- **Ordered**: Files are numbered to respect dependencies

## Making Changes

1. Edit the appropriate schema file
2. Run `supabase db diff -f <migration_name>` to generate migration
3. Review the generated migration
4. Apply with `supabase db migrate up`

See the main [README.md](../README.md) for detailed workflow instructions.
