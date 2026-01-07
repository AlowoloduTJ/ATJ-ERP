# 🔐 Permission Matrix System - README

## 🎯 Overview

Complete permission matrix system for ATJ-ERP with 5 permission types across 10 modules for 6 user roles.

## 📊 Permission Matrix

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

## 🚀 Quick Setup

1. **Apply SQL:**
   ```sql
   -- Run in Supabase SQL Editor
   -- File: supabase/11_permissions.sql
   ```

2. **Verify:**
   ```sql
   SELECT r.name, p.module, p.name 
   FROM roles r
   JOIN role_permissions rp ON r.id = rp.role_id
   JOIN permissions p ON rp.permission_id = p.id;
   ```

3. **Use:**
   - View matrix: `/admin/permissions`
   - Grant permissions: Use server actions

## 📚 Documentation

- **Setup**: `APPLY_PERMISSIONS.md`
- **Guide**: `PERMISSION_SYSTEM_GUIDE.md`
- **Matrix**: `docs/permission-matrix-table.md`
- **Visual**: `docs/PERMISSION_MATRIX_VISUAL.md`

---

**Everything is ready!** ✅
