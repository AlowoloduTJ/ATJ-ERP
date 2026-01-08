# 🔐 Apply Permissions System

## Quick Setup

### Step 1: Apply Main Schema

If you haven't already, apply the main database schema:
```sql
-- Run in Supabase SQL Editor
-- File: supabase/APPLY_SCHEMA.sql
```

### Step 2: Apply Permissions

Apply the permissions system:
```sql
-- Run in Supabase SQL Editor
-- File: supabase/11_permissions.sql
```

This will:
- ✅ Create all permission types (Full, View + Request, View, Self Only, Request)
- ✅ Create all roles (Super Admin, Admin, Manager, Supervisor, Staff, Customer)
- ✅ Assign permissions to roles based on the matrix

### Step 3: Verify

Check that permissions were created:
```sql
-- Count permissions by type
SELECT name, COUNT(*) as count
FROM permissions
GROUP BY name
ORDER BY name;

-- View role permissions
SELECT 
    r.name as role,
    p.module,
    p.name as permission
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
ORDER BY r.name, p.module;
```

## Permission Matrix

After applying, the following matrix will be in place:

| Module | Super Admin | Admin | Manager | Supervisor | Staff | Customer |
|--------|-------------|-------|---------|------------|-------|----------|
| Warehouse | Full | Full | View + Request | View + Request | Self Only | - |
| Production | Full | Full | View + Request | View + Request | Request | Request |
| Client Ledger | Full | Full | View + Request | View + Request | Self Only | - |
| Customer Ledger | Full | Full | View + Request | View + Request | View | View |
| Division Ledger | Full | Full | View + Request | View + Request | Self Only | - |
| Office Expenses | Full | Full | View + Request | View + Request | Request | - |
| Reimbursement | Full | Full | View + Request | View + Request | Self Only | - |
| HR | Full | Full | View + Request | View + Request | Self Only | - |
| Audit | Full | View | View | View | - | - |
| Admin Panel | Full | Full | - | - | - | - |

## Next Steps

1. **Assign Users to Roles**
   ```sql
   UPDATE users 
   SET role_id = (SELECT id FROM roles WHERE name = 'admin')
   WHERE email = 'admin@example.com';
   ```

2. **Access Permission Management**
   - Go to `/admin/permissions` in your app
   - View the permission matrix
   - Manage user permissions

---

**Permissions are now set up!** ✅
