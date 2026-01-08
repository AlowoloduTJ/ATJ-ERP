# 🔐 Permission System Guide - ATJ-ERP

## 🎯 Overview

The ATJ-ERP permission system allows admins to grant granular permissions to users across different modules. Permissions are assigned through roles, making it easy to manage access for groups of users.

## 📊 Permission Types

| Permission | Code | Description |
|------------|------|-------------|
| **Full** | `full` | Complete access - Create, Read, Update, Delete |
| **View + Request** | `view_request` | Can view all data and create requests |
| **View** | `view` | Read-only access |
| **Self Only** | `self_only` | Can only access own data |
| **Request** | `request` | Can only create requests |

## 👥 Roles

| Role | Description |
|------|-------------|
| **Super Admin** | Full system access, all modules |
| **Admin** | Full access except super admin functions |
| **Manager** | Department oversight, can approve requests |
| **Supervisor** | Team management, can view and create requests |
| **Staff** | Individual contributor, limited access |
| **Customer** | External user, minimal access |

## 📋 Permission Matrix

See `docs/permission-matrix-table.md` for the complete matrix.

## 🚀 Setup Instructions

### Step 1: Apply Database Schema

1. Run the main schema: `supabase/APPLY_SCHEMA.sql`
2. Run permissions setup: `supabase/11_permissions.sql`

### Step 2: Verify Permissions

```sql
-- Check if permissions were created
SELECT name, module, COUNT(*) 
FROM permissions 
GROUP BY name, module;

-- Check role assignments
SELECT r.name as role, p.name as permission, p.module
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
ORDER BY r.name, p.module;
```

### Step 3: Grant Permissions to Users

**Via Role Assignment (Recommended):**
```sql
-- Assign user to a role
UPDATE users 
SET role_id = (SELECT id FROM roles WHERE name = 'manager')
WHERE email = 'user@example.com';
```

**Via Direct Permission (Advanced):**
```sql
-- Grant specific permission to user's role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    (SELECT role_id FROM users WHERE email = 'user@example.com'),
    (SELECT id FROM permissions WHERE name = 'full' AND module = 'warehouse');
```

## 💻 Using Permissions in Code

### Server Actions

```typescript
import { getUserPermissions } from "@/actions/permissions";

// Get user's permissions
const result = await getUserPermissions(userId);
if (result.success) {
  const permissions = result.data;
  // Check if user has permission
  const hasFullWarehouse = permissions.some(
    p => p.module === 'warehouse' && p.permission === 'full'
  );
}
```

### Client Components

```typescript
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { hasPermission } = useAuth();
  
  if (hasPermission('warehouse:full')) {
    // Show full access UI
  } else if (hasPermission('warehouse:view')) {
    // Show read-only UI
  }
}
```

## 🔧 Admin Interface

Access the permission management page at:
- `/admin/permissions` - View and manage permission matrix

## 📚 Documentation

- **Matrix Table**: `docs/permission-matrix-table.md`
- **Visual Guide**: `docs/PERMISSION_MATRIX_VISUAL.md`
- **Detailed Matrix**: `docs/permission-matrix.md`

## ✅ Best Practices

1. **Use Roles First**: Assign users to roles rather than individual permissions
2. **Principle of Least Privilege**: Give users minimum permissions needed
3. **Regular Audits**: Review permissions quarterly
4. **Document Changes**: Log permission changes in audit trail

---

**Set up permissions to control access effectively!** 🔐
