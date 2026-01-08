# 📊 Database Overview - Based on Schema Files

## 🔍 Project Information

**Project Reference:** `svtlzyfmzeizkxeigbzc`  
**Database:** PostgreSQL (via Supabase)  
**Schema:** `public`

---

## 📋 Complete Table List (40+ Tables)

Based on your `supabase/APPLY_SCHEMA.sql` file, here are all tables organized by module:

### 🔐 Authentication & Authorization (5 tables)
1. `roles` - User roles (super_admin, admin, manager, etc.)
2. `permissions` - Permission definitions (full, view, request, etc.)
3. `role_permissions` - Junction table linking roles to permissions
4. `users` - User accounts
5. `sessions` - User session management

### 📦 Warehouse Module (8 tables)
6. `inventory_categories` - Inventory item categories
7. `suppliers` - Supplier/vendor information
8. `inventory` - Main inventory/stock table
9. `bulk_purchases` - Bulk purchase orders
10. `bulk_purchase_items` - Purchase order line items
11. `stock_transfers` - Stock transfer between locations
12. `stock_transfer_items` - Transfer line items
13. `stock_movements` - Audit trail of all inventory movements

### 🏭 Production Module (6 tables)
14. `products` - Finished product definitions
15. `production_orders` - Production work orders
16. `material_requisitions` - Material requests for production
17. `material_requisition_items` - Requisition line items
18. `work_in_progress` - WIP inventory tracking
19. `finished_goods` - Completed production output

### 💰 Ledger Module (11 tables)
20. `clients` - Business clients (B2B)
21. `customers` - End customers (B2C)
22. `office_divisions` - Organizational divisions
23. `expense_categories` - Expense classification
24. `expenses` - Office expense records
25. `client_transactions` - Client transaction history
26. `customer_transactions` - Customer transaction history
27. `division_transactions` - Division budget transactions
28. `chart_of_accounts` - Accounting chart of accounts
29. `journal_entries` - General journal entries
30. `journal_entry_lines` - Journal entry debit/credit lines

### 👥 HR Module (9 tables)
31. `departments` - Organizational departments
32. `employees` - Employee records
33. `attendance` - Employee attendance tracking
34. `leave_types` - Types of leave (sick, vacation, etc.)
35. `leaves` - Leave requests
36. `payroll` - Payroll records
37. `reimbursements` - Employee reimbursement requests
38. `reimbursement_items` - Reimbursement line items
39. `retirements` - Reimbursement retirement records

### 📝 Audit Module (1 table)
40. `audit_trails` - Comprehensive audit log

### ⚙️ Admin Module (2 tables)
41. `settings` - System-wide configuration
42. `approvals` - Generic approval workflow tracking

**Total: 42 tables**

---

## 🔐 Authentication & User Management Tables (Highlighted)

### 1. `users`
**Purpose:** Stores user accounts for system access

**Key Columns:**
- `id` (UUID, PK) - Unique user identifier
- `email` (VARCHAR(255), UNIQUE) - User email address
- `password_hash` (VARCHAR(255)) - Hashed password
- `name` (VARCHAR(255)) - User's full name
- `role_id` (UUID, FK → roles.id) - User's assigned role
- `is_active` (BOOLEAN) - Account status
- `last_login` (TIMESTAMP) - Last login timestamp
- `created_at`, `updated_at` (TIMESTAMP) - Audit timestamps

**Relationships:**
- → `roles` (via role_id)
- ← `sessions` (one user, many sessions)
- ← `employees` (optional, via user_id)

**Indexes:**
- `idx_users_email` - Fast email lookups
- `idx_users_role_id` - Role-based queries
- `idx_users_is_active` - Active user filtering

**Constraints:**
- PRIMARY KEY on `id`
- UNIQUE on `email`

---

### 2. `roles`
**Purpose:** Defines user roles (Super Admin, Admin, Manager, Supervisor, Staff, Customer)

**Key Columns:**
- `id` (UUID, PK) - Role identifier
- `name` (VARCHAR(100), UNIQUE) - Role name
- `description` (TEXT) - Role description
- `created_at`, `updated_at` (TIMESTAMP) - Audit timestamps

**Relationships:**
- ← `users` (many users per role)
- ↔ `permissions` (many-to-many via role_permissions)

**Constraints:**
- PRIMARY KEY on `id`
- UNIQUE on `name`

---

### 3. `permissions`
**Purpose:** Defines granular permissions (Full, View + Request, View, Self Only, Request)

**Key Columns:**
- `id` (UUID, PK) - Permission identifier
- `name` (VARCHAR(100)) - Permission name (full, view_request, view, self_only, request)
- `module` (VARCHAR(50)) - Module (warehouse, production, ledger, hr, audit, admin)
- `description` (TEXT) - Permission description
- `created_at` (TIMESTAMP) - Creation timestamp

**Relationships:**
- ↔ `roles` (many-to-many via role_permissions)

**Constraints:**
- PRIMARY KEY on `id`
- UNIQUE (name, module) - Same permission can exist for different modules

---

### 4. `role_permissions`
**Purpose:** Junction table linking roles to permissions (Many-to-Many relationship)

**Key Columns:**
- `role_id` (UUID, FK → roles.id) - Role reference
- `permission_id` (UUID, FK → permissions.id) - Permission reference

**Relationships:**
- → `roles`
- → `permissions`

**Constraints:**
- PRIMARY KEY (role_id, permission_id)
- FOREIGN KEY to `roles` (ON DELETE CASCADE)
- FOREIGN KEY to `permissions` (ON DELETE CASCADE)

---

### 5. `sessions`
**Purpose:** Manages user sessions and authentication tokens

**Key Columns:**
- `id` (UUID, PK) - Session identifier
- `user_id` (UUID, FK → users.id) - Session owner
- `token` (VARCHAR(255), UNIQUE) - Session token
- `expires_at` (TIMESTAMP) - Session expiration
- `created_at` (TIMESTAMP) - Creation timestamp

**Relationships:**
- → `users` (one user, many sessions)

**Constraints:**
- PRIMARY KEY on `id`
- UNIQUE on `token`
- FOREIGN KEY to `users` (ON DELETE CASCADE)

---

### 6. `employees` (HR Module, but linked to users)
**Purpose:** Employee records (can be linked to user accounts)

**Key Columns:**
- `id` (UUID, PK) - Employee identifier
- `employee_number` (VARCHAR(100), UNIQUE) - Employee ID
- `name` (VARCHAR(255)) - Employee name
- `email` (VARCHAR(255), UNIQUE) - Email
- `department_id` (UUID, FK → departments.id) - Department
- `user_id` (UUID, FK → users.id) - **Linked user account (optional)**
- `position`, `hire_date`, `salary` - Employment details
- `is_active` (BOOLEAN) - Active status

**Relationships:**
- → `departments`
- → `users` (optional link to user account)
- ← `attendance`, `leaves`, `payroll`, `reimbursements`

**Indexes:**
- `idx_employees_user_id` - User account linking
- `idx_employees_department_id` - Department queries
- `idx_employees_email` - Email lookups

---

## 📊 Table Statistics Summary

**Total Tables:** 42  
**Authentication Tables:** 5 (users, roles, permissions, role_permissions, sessions)  
**Business Logic Tables:** 37  
**Total Indexes:** 50+  
**Total Foreign Keys:** 60+

---

## 🔗 Key Relationships

### Authentication Flow:
```
users → roles → role_permissions → permissions
users → sessions
users ← employees (optional)
```

### Business Flow Examples:
```
suppliers → bulk_purchases → bulk_purchase_items → inventory
products → production_orders → material_requisitions → inventory
employees → attendance, leaves, payroll, reimbursements
clients/customers → transactions
```

---

## 📝 Notes

- All tables use UUID primary keys
- All tables have `created_at` and `updated_at` timestamps
- Most tables use `is_active` for soft deletes
- Foreign keys ensure referential integrity
- Indexes optimize common query patterns
- Status fields use VARCHAR for flexibility

---

**To verify your actual database, run the SQL queries in `scripts/query-database-overview.sql` in Supabase SQL Editor!**
