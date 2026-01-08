# 📊 ATJ-ERP Database Structure Overview

## 🎯 Project Information

**Project Name:** ATJ-ERP  
**Database Type:** PostgreSQL (via Supabase)  
**Schema:** public

## 📋 Complete Table List (40+ Tables)

Based on your schema files, here's the complete database structure:

---

## 🔐 1. Authentication & Authorization Module (5 tables)

### `users`
**Purpose:** Stores user accounts for system access  
**Key Columns:**
- `id` (UUID, PK) - Unique user identifier
- `email` (VARCHAR(255), UNIQUE) - User email address
- `password_hash` (VARCHAR(255)) - Hashed password
- `name` (VARCHAR(255)) - User's full name
- `role_id` (UUID, FK → roles.id) - User's assigned role
- `is_active` (BOOLEAN) - Account status
- `last_login` (TIMESTAMP) - Last login timestamp

**Relationships:**
- → `roles` (via role_id)
- → `employees` (optional, via user_id in employees table)

**Indexes:**
- `idx_users_email` - Fast email lookups
- `idx_users_role_id` - Role-based queries
- `idx_users_is_active` - Active user filtering

---

### `roles`
**Purpose:** Defines user roles (Super Admin, Admin, Manager, etc.)  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(100), UNIQUE) - Role name
- `description` (TEXT) - Role description

**Relationships:**
- ← `users` (many users per role)
- ↔ `permissions` (many-to-many via role_permissions)

---

### `permissions`
**Purpose:** Defines granular permissions (Full, View, Request, etc.)  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(100)) - Permission name (full, view, request, etc.)
- `module` (VARCHAR(50)) - Module (warehouse, production, ledger, hr, admin)
- `description` (TEXT)

**Constraints:**
- UNIQUE (name, module) - Same permission can exist for different modules

**Relationships:**
- ↔ `roles` (many-to-many via role_permissions)

---

### `role_permissions`
**Purpose:** Junction table linking roles to permissions  
**Key Columns:**
- `role_id` (UUID, FK → roles.id)
- `permission_id` (UUID, FK → permissions.id)
- PRIMARY KEY (role_id, permission_id)

**Purpose:** Enables role-based access control (RBAC)

---

### `sessions`
**Purpose:** Manages user sessions and authentication tokens  
**Key Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id) - Session owner
- `token` (VARCHAR(255), UNIQUE) - Session token
- `expires_at` (TIMESTAMP) - Session expiration

**Relationships:**
- → `users` (one user, many sessions)

---

## 📦 2. Warehouse Module (8 tables)

### `inventory_categories`
**Purpose:** Categorizes inventory items  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255), UNIQUE) - Category name

**Relationships:**
- ← `inventory` (many inventory items per category)

---

### `suppliers`
**Purpose:** Stores supplier/vendor information  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255)) - Supplier name
- `contact_person`, `email`, `phone`, `address` - Contact details
- `is_active` (BOOLEAN) - Active status

**Relationships:**
- ← `inventory` (many inventory items per supplier)
- ← `bulk_purchases` (many purchases per supplier)

**Indexes:**
- Standard indexes for active status filtering

---

### `inventory`
**Purpose:** Main inventory/stock table  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255)) - Item name
- `sku` (VARCHAR(100), UNIQUE) - Stock keeping unit
- `quantity` (DECIMAL(10,2)) - Current stock level
- `unit` (VARCHAR(50)) - Unit of measure (kg, pcs, etc.)
- `reorder_level` (DECIMAL(10,2)) - Reorder threshold
- `unit_cost` (DECIMAL(10,2)) - Cost per unit
- `category_id` (UUID, FK) - Category
- `supplier_id` (UUID, FK) - Primary supplier

**Relationships:**
- → `inventory_categories`
- → `suppliers`
- ← `bulk_purchase_items`
- ← `stock_transfer_items`
- ← `stock_movements`
- ← `material_requisition_items`

**Indexes:**
- `idx_inventory_sku` - Fast SKU lookups
- `idx_inventory_category_id` - Category filtering
- `idx_inventory_supplier_id` - Supplier filtering

---

### `bulk_purchases`
**Purpose:** Tracks bulk purchase orders from suppliers  
**Key Columns:**
- `id` (UUID, PK)
- `purchase_number` (VARCHAR(100), UNIQUE) - Purchase order number
- `supplier_id` (UUID, FK) - Supplier
- `total_amount` (DECIMAL(10,2)) - Total purchase amount
- `status` (VARCHAR(50)) - pending, approved, received, cancelled
- `requested_by`, `approved_by` (UUID, FK → users.id)

**Relationships:**
- → `suppliers`
- → `users` (requestor, approver)
- ← `bulk_purchase_items` (one purchase, many items)

**Indexes:**
- `idx_bulk_purchases_status` - Status filtering
- `idx_bulk_purchases_supplier_id` - Supplier queries

---

### `bulk_purchase_items`
**Purpose:** Line items for bulk purchases  
**Key Columns:**
- `id` (UUID, PK)
- `bulk_purchase_id` (UUID, FK) - Parent purchase
- `inventory_id` (UUID, FK) - Item purchased
- `quantity` (DECIMAL(10,2)) - Quantity ordered
- `unit_price` (DECIMAL(10,2)) - Price per unit
- `total` (DECIMAL(10,2)) - Line total

**Relationships:**
- → `bulk_purchases`
- → `inventory`

---

### `stock_transfers`
**Purpose:** Tracks stock transfers between locations  
**Key Columns:**
- `id` (UUID, PK)
- `transfer_number` (VARCHAR(100), UNIQUE) - Transfer reference
- `from_location`, `to_location` (VARCHAR(255)) - Locations
- `status` (VARCHAR(50)) - pending, in-transit, completed, cancelled
- `transferred_by` (UUID, FK → users.id)

**Relationships:**
- → `users`
- ← `stock_transfer_items`

---

### `stock_transfer_items`
**Purpose:** Line items for stock transfers  
**Key Columns:**
- `id` (UUID, PK)
- `stock_transfer_id` (UUID, FK) - Parent transfer
- `inventory_id` (UUID, FK) - Item transferred
- `quantity` (DECIMAL(10,2)) - Quantity transferred

**Relationships:**
- → `stock_transfers`
- → `inventory`

---

### `stock_movements`
**Purpose:** Audit trail of all inventory movements  
**Key Columns:**
- `id` (UUID, PK)
- `inventory_id` (UUID, FK) - Item moved
- `movement_type` (VARCHAR(50)) - purchase, transfer_in, transfer_out, production_issue, production_receipt, adjustment
- `reference_id` (UUID) - Links to source document
- `reference_type` (VARCHAR(50)) - bulk_purchase, stock_transfer, production_order
- `quantity` (DECIMAL(10,2)) - Positive for in, negative for out
- `balance_after` (DECIMAL(10,2)) - Stock level after movement
- `moved_by` (UUID, FK → users.id)

**Relationships:**
- → `inventory`
- → `users`

**Indexes:**
- `idx_stock_movements_inventory_id` - Item history
- `idx_stock_movements_reference` - Document linking
- `idx_stock_movements_movement_type` - Type filtering

---

## 🏭 3. Production Module (6 tables)

### `products`
**Purpose:** Defines finished products  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255)) - Product name
- `sku` (VARCHAR(100), UNIQUE) - Product SKU
- `description` (TEXT)
- `unit` (VARCHAR(50)) - Unit of measure
- `is_active` (BOOLEAN)

**Relationships:**
- ← `production_orders` (many orders per product)
- ← `finished_goods` (production output)

---

### `production_orders`
**Purpose:** Tracks production orders/work orders  
**Key Columns:**
- `id` (UUID, PK)
- `order_number` (VARCHAR(100), UNIQUE) - Order reference
- `product_id` (UUID, FK) - Product to produce
- `quantity` (DECIMAL(10,2)) - Quantity to produce
- `status` (VARCHAR(50)) - pending, in-progress, completed, cancelled
- `start_date`, `end_date` (DATE) - Production dates
- `completed_at` (TIMESTAMP)
- `created_by` (UUID, FK → users.id)

**Relationships:**
- → `products`
- → `users`
- ← `material_requisitions`
- ← `work_in_progress`
- ← `finished_goods`

**Indexes:**
- `idx_production_orders_status` - Status filtering
- `idx_production_orders_product_id` - Product queries

---

### `material_requisitions`
**Purpose:** Requests for materials needed for production  
**Key Columns:**
- `id` (UUID, PK)
- `requisition_number` (VARCHAR(100), UNIQUE) - Requisition reference
- `production_order_id` (UUID, FK) - Related production order
- `status` (VARCHAR(50)) - pending, approved, rejected
- `requested_by`, `approved_by` (UUID, FK → users.id)

**Relationships:**
- → `production_orders`
- → `users`
- ← `material_requisition_items`

---

### `material_requisition_items`
**Purpose:** Line items for material requisitions  
**Key Columns:**
- `id` (UUID, PK)
- `material_requisition_id` (UUID, FK) - Parent requisition
- `inventory_id` (UUID, FK) - Material requested
- `quantity` (DECIMAL(10,2)) - Quantity needed
- `unit` (VARCHAR(50)) - Unit of measure
- `issued_quantity` (DECIMAL(10,2)) - Quantity actually issued

**Relationships:**
- → `material_requisitions`
- → `inventory`

---

### `work_in_progress`
**Purpose:** Tracks WIP inventory during production  
**Key Columns:**
- `id` (UUID, PK)
- `production_order_id` (UUID, FK) - Related order
- `quantity` (DECIMAL(10,2)) - WIP quantity
- `stage` (VARCHAR(100)) - Production stage
- `notes` (TEXT)

**Relationships:**
- → `production_orders`

---

### `finished_goods`
**Purpose:** Records completed production output  
**Key Columns:**
- `id` (UUID, PK)
- `production_order_id` (UUID, FK) - Source order
- `product_id` (UUID, FK) - Product produced
- `quantity` (DECIMAL(10,2)) - Quantity completed
- `quality_status` (VARCHAR(50)) - passed, failed, pending
- `completed_at` (TIMESTAMP)

**Relationships:**
- → `production_orders`
- → `products`

---

## 💰 4. Ledger Module (11 tables)

### `clients`
**Purpose:** Business clients (B2B customers)  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255)) - Client name
- `contact_person`, `email`, `phone`, `address` - Contact info
- `balance` (DECIMAL(10,2)) - Account balance
- `is_active` (BOOLEAN)

**Relationships:**
- ← `client_transactions` (transaction history)

---

### `customers`
**Purpose:** End customers (B2C)  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255)) - Customer name
- `contact_person`, `email`, `phone`, `address` - Contact info
- `balance` (DECIMAL(10,2)) - Account balance
- `is_active` (BOOLEAN)

**Relationships:**
- ← `customer_transactions` (transaction history)

---

### `office_divisions`
**Purpose:** Organizational divisions/departments for budgeting  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255), UNIQUE) - Division name
- `code` (VARCHAR(50), UNIQUE) - Division code
- `budget` (DECIMAL(10,2)) - Budget allocation
- `is_active` (BOOLEAN)

**Relationships:**
- ← `expenses` (expenses charged to division)
- ← `division_transactions` (budget transactions)

---

### `expense_categories`
**Purpose:** Categories for expense classification  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255), UNIQUE) - Category name
- `description` (TEXT)
- `is_active` (BOOLEAN)

**Relationships:**
- ← `expenses` (many expenses per category)

---

### `expenses`
**Purpose:** Office expense records  
**Key Columns:**
- `id` (UUID, PK)
- `expense_number` (VARCHAR(100), UNIQUE) - Expense reference
- `category_id` (UUID, FK) - Expense category
- `division_id` (UUID, FK) - Charged division
- `amount` (DECIMAL(10,2)) - Expense amount
- `description` (TEXT) - Expense description
- `expense_date` (DATE) - Expense date
- `status` (VARCHAR(50)) - pending, approved, rejected
- `requested_by`, `approved_by` (UUID, FK → users.id)
- `receipt_url` (VARCHAR(500)) - Receipt attachment

**Relationships:**
- → `expense_categories`
- → `office_divisions`
- → `users`

**Indexes:**
- `idx_expenses_status` - Status filtering
- `idx_expenses_category_id` - Category queries
- `idx_expenses_expense_date` - Date range queries

---

### `client_transactions`
**Purpose:** Transaction history for clients  
**Key Columns:**
- `id` (UUID, PK)
- `client_id` (UUID, FK) - Client
- `transaction_type` (VARCHAR(50)) - invoice, payment, credit_note, debit_note
- `reference_number` (VARCHAR(100)) - Reference
- `amount` (DECIMAL(10,2)) - Positive for invoice/debit, negative for payment/credit
- `balance_after` (DECIMAL(10,2)) - Balance after transaction
- `transaction_date` (DATE)
- `created_by` (UUID, FK → users.id)

**Relationships:**
- → `clients`
- → `users`

**Indexes:**
- `idx_client_transactions_client_id` - Client history
- `idx_client_transactions_transaction_date` - Date queries

---

### `customer_transactions`
**Purpose:** Transaction history for customers  
**Key Columns:** (Similar to client_transactions)
- `id` (UUID, PK)
- `customer_id` (UUID, FK) - Customer
- `transaction_type` (VARCHAR(50)) - invoice, payment, credit_note, debit_note
- `amount`, `balance_after` (DECIMAL(10,2))
- `transaction_date` (DATE)
- `created_by` (UUID, FK → users.id)

**Relationships:**
- → `customers`
- → `users`

---

### `division_transactions`
**Purpose:** Budget transactions for divisions  
**Key Columns:**
- `id` (UUID, PK)
- `division_id` (UUID, FK) - Division
- `transaction_type` (VARCHAR(50)) - budget_allocation, expense, adjustment
- `amount` (DECIMAL(10,2))
- `balance_after` (DECIMAL(10,2)) - Budget balance after
- `transaction_date` (DATE)
- `created_by` (UUID, FK → users.id)

**Relationships:**
- → `office_divisions`
- → `users`

---

### `chart_of_accounts`
**Purpose:** Accounting chart of accounts  
**Key Columns:**
- `id` (UUID, PK)
- `account_code` (VARCHAR(50), UNIQUE) - Account code
- `account_name` (VARCHAR(255)) - Account name
- `account_type` (VARCHAR(50)) - asset, liability, equity, revenue, expense
- `parent_account_id` (UUID, FK → chart_of_accounts.id) - Parent account (hierarchical)

**Relationships:**
- Self-referencing (parent-child hierarchy)
- ← `journal_entry_lines` (journal entries reference accounts)

---

### `journal_entries`
**Purpose:** General journal entries (double-entry bookkeeping)  
**Key Columns:**
- `id` (UUID, PK)
- `entry_number` (VARCHAR(100), UNIQUE) - Entry reference
- `entry_date` (DATE) - Entry date
- `description` (TEXT) - Entry description
- `reference` (VARCHAR(100)) - Reference number
- `created_by` (UUID, FK → users.id)

**Relationships:**
- → `users`
- ← `journal_entry_lines` (one entry, many lines)

**Indexes:**
- `idx_journal_entries_entry_date` - Date queries

---

### `journal_entry_lines`
**Purpose:** Debit/credit lines for journal entries  
**Key Columns:**
- `id` (UUID, PK)
- `journal_entry_id` (UUID, FK) - Parent entry
- `account_id` (UUID, FK) - Account
- `debit` (DECIMAL(10,2)) - Debit amount
- `credit` (DECIMAL(10,2)) - Credit amount
- `description` (TEXT) - Line description

**Relationships:**
- → `journal_entries`
- → `chart_of_accounts`

---

## 👥 5. HR Module (9 tables)

### `departments`
**Purpose:** Organizational departments  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255), UNIQUE) - Department name
- `code` (VARCHAR(50), UNIQUE) - Department code
- `description` (TEXT)
- `is_active` (BOOLEAN)

**Relationships:**
- ← `employees` (many employees per department)

---

### `employees`
**Purpose:** Employee records  
**Key Columns:**
- `id` (UUID, PK)
- `employee_number` (VARCHAR(100), UNIQUE) - Employee ID
- `name` (VARCHAR(255)) - Employee name
- `email` (VARCHAR(255), UNIQUE) - Email
- `phone` (VARCHAR(50)) - Phone
- `department_id` (UUID, FK) - Department
- `position` (VARCHAR(255)) - Job title
- `hire_date` (DATE) - Hire date
- `salary` (DECIMAL(10,2)) - Salary
- `is_active` (BOOLEAN)
- `user_id` (UUID, FK → users.id) - Linked user account (optional)

**Relationships:**
- → `departments`
- → `users` (optional link to user account)
- ← `attendance`
- ← `leaves`
- ← `payroll`
- ← `reimbursements`

**Indexes:**
- `idx_employees_department_id` - Department queries
- `idx_employees_employee_number` - Employee ID lookups
- `idx_employees_email` - Email lookups
- `idx_employees_user_id` - User account linking

---

### `attendance`
**Purpose:** Employee attendance records  
**Key Columns:**
- `id` (UUID, PK)
- `employee_id` (UUID, FK) - Employee
- `attendance_date` (DATE) - Date
- `check_in`, `check_out` (TIMESTAMP) - Time stamps
- `status` (VARCHAR(50)) - present, absent, late, leave
- `hours_worked` (DECIMAL(4,2)) - Hours worked
- `overtime_hours` (DECIMAL(4,2)) - Overtime

**Constraints:**
- UNIQUE (employee_id, attendance_date) - One record per employee per day

**Relationships:**
- → `employees`

**Indexes:**
- `idx_attendance_employee_id` - Employee history
- `idx_attendance_date` - Date queries
- `idx_attendance_status` - Status filtering

---

### `leave_types`
**Purpose:** Types of leave (sick, vacation, etc.)  
**Key Columns:**
- `id` (UUID, PK)
- `name` (VARCHAR(255), UNIQUE) - Leave type name
- `max_days` (INTEGER) - Maximum days allowed
- `is_paid` (BOOLEAN) - Paid leave flag
- `is_active` (BOOLEAN)

**Relationships:**
- ← `leaves` (many leave requests per type)

---

### `leaves`
**Purpose:** Leave requests  
**Key Columns:**
- `id` (UUID, PK)
- `leave_number` (VARCHAR(100), UNIQUE) - Leave reference
- `employee_id` (UUID, FK) - Employee
- `leave_type_id` (UUID, FK) - Leave type
- `start_date`, `end_date` (DATE) - Leave period
- `days` (INTEGER) - Number of days
- `status` (VARCHAR(50)) - pending, approved, rejected
- `reason` (TEXT) - Leave reason
- `requested_by`, `approved_by` (UUID, FK → users.id)
- `rejection_reason` (TEXT)

**Relationships:**
- → `employees`
- → `leave_types`
- → `users`

**Indexes:**
- `idx_leaves_employee_id` - Employee leave history
- `idx_leaves_status` - Status filtering
- `idx_leaves_start_date` - Date range queries

---

### `payroll`
**Purpose:** Payroll records  
**Key Columns:**
- `id` (UUID, PK)
- `payroll_number` (VARCHAR(100), UNIQUE) - Payroll reference
- `employee_id` (UUID, FK) - Employee
- `pay_period_start`, `pay_period_end` (DATE) - Pay period
- `basic_salary` (DECIMAL(10,2)) - Base salary
- `allowances` (DECIMAL(10,2)) - Allowances
- `deductions` (DECIMAL(10,2)) - Deductions
- `overtime_pay` (DECIMAL(10,2)) - Overtime
- `gross_pay` (DECIMAL(10,2)) - Gross pay
- `tax` (DECIMAL(10,2)) - Tax
- `net_pay` (DECIMAL(10,2)) - Net pay
- `status` (VARCHAR(50)) - draft, processed, paid
- `processed_by` (UUID, FK → users.id)

**Relationships:**
- → `employees`
- → `users`

**Indexes:**
- `idx_payroll_employee_id` - Employee payroll history
- `idx_payroll_status` - Status filtering
- `idx_payroll_pay_period_start` - Period queries

---

### `reimbursements`
**Purpose:** Employee reimbursement requests  
**Key Columns:**
- `id` (UUID, PK)
- `reimbursement_number` (VARCHAR(100), UNIQUE) - Reimbursement reference
- `employee_id` (UUID, FK) - Employee
- `total_amount` (DECIMAL(10,2)) - Total amount
- `status` (VARCHAR(50)) - pending, approved, rejected, retired
- `requested_by`, `approved_by` (UUID, FK → users.id)
- `retired_at` (TIMESTAMP) - Retirement date

**Relationships:**
- → `employees`
- → `users`
- ← `reimbursement_items`
- ← `retirements`

**Indexes:**
- `idx_reimbursements_employee_id` - Employee reimbursements
- `idx_reimbursements_status` - Status filtering

---

### `reimbursement_items`
**Purpose:** Line items for reimbursements  
**Key Columns:**
- `id` (UUID, PK)
- `reimbursement_id` (UUID, FK) - Parent reimbursement
- `description` (TEXT) - Item description
- `amount` (DECIMAL(10,2)) - Item amount
- `expense_date` (DATE) - Expense date
- `receipt_url` (VARCHAR(500)) - Receipt attachment

**Relationships:**
- → `reimbursements`

---

### `retirements`
**Purpose:** Retirement of reimbursements (accounting closure)  
**Key Columns:**
- `id` (UUID, PK)
- `reimbursement_id` (UUID, FK) - Related reimbursement
- `retirement_number` (VARCHAR(100), UNIQUE) - Retirement reference
- `status` (VARCHAR(50)) - pending, approved, rejected
- `submitted_by`, `approved_by` (UUID, FK → users.id)

**Relationships:**
- → `reimbursements`
- → `users`

---

## 📝 6. Audit Module (1 table)

### `audit_trails`
**Purpose:** Comprehensive audit log of all system actions  
**Key Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id) - User who performed action
- `action` (VARCHAR(100)) - create, update, delete, view, approve, reject
- `entity_type` (VARCHAR(100)) - inventory, production_order, expense, etc.
- `entity_id` (UUID) - ID of affected entity
- `changes` (JSONB) - Before/after values
- `ip_address` (VARCHAR(45)) - User IP
- `user_agent` (TEXT) - Browser/client info
- `timestamp` (TIMESTAMP) - Action timestamp

**Relationships:**
- → `users`

**Indexes:**
- `idx_audit_trails_user_id` - User activity
- `idx_audit_trails_entity` - Entity lookups
- `idx_audit_trails_timestamp` - Time-based queries
- `idx_audit_trails_action` - Action filtering

---

## ⚙️ 7. Admin Module (2 tables)

### `settings`
**Purpose:** System-wide configuration settings  
**Key Columns:**
- `id` (UUID, PK)
- `key` (VARCHAR(255), UNIQUE) - Setting key
- `value` (TEXT) - Setting value
- `type` (VARCHAR(50)) - string, number, boolean, json
- `description` (TEXT) - Setting description
- `updated_by` (UUID, FK → users.id) - Last updater
- `updated_at` (TIMESTAMP) - Last update time

**Relationships:**
- → `users`

---

### `approvals`
**Purpose:** Generic approval workflow tracking  
**Key Columns:**
- `id` (UUID, PK)
- `entity_type` (VARCHAR(100)) - bulk_purchase, expense, reimbursement, leave, etc.
- `entity_id` (UUID) - ID of entity being approved
- `status` (VARCHAR(50)) - pending, approved, rejected
- `requested_by`, `approved_by` (UUID, FK → users.id)
- `approved_at` (TIMESTAMP)
- `rejection_reason` (TEXT)

**Relationships:**
- → `users`

**Indexes:**
- `idx_approvals_entity` - Entity lookups
- `idx_approvals_status` - Status filtering
- `idx_approvals_requested_by` - Requestor queries

---

## 📊 Summary Statistics

**Total Tables:** 40+  
**Total Modules:** 7  
**Authentication Tables:** 5  
**Business Logic Tables:** 35+  
**Total Indexes:** 50+

---

## 🔍 Key Design Patterns

1. **UUID Primary Keys** - All tables use UUID for better distribution
2. **Audit Timestamps** - All tables have `created_at` and `updated_at`
3. **Soft Deletes** - Many tables use `is_active` flag instead of hard deletes
4. **Status Fields** - VARCHAR allows flexible status management
5. **Reference Numbers** - Unique reference numbers for traceability
6. **User Tracking** - `created_by`, `approved_by` fields track user actions
7. **Balance Tracking** - Transaction tables track `balance_after` for reconciliation

---

**This structure supports a complete ERP system with inventory, production, accounting, HR, and audit capabilities!** 📊
