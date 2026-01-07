# ATJ-ERP Database Schema

## Overview

Based on the concept document and TypeScript types, this document defines the minimum viable database schema for the ATJ-ERP MVP. The schema supports all core modules: Warehouse, Production, Ledger, HR, Audit, and Admin.

## Main Entities & Fields

### 1. Authentication & Authorization

#### `users`
- `id` (UUID, PRIMARY KEY)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255), NOT NULL)
- `name` (VARCHAR(255), NOT NULL)
- `role_id` (UUID, FOREIGN KEY → roles.id)
- `is_active` (BOOLEAN, DEFAULT true)
- `last_login` (TIMESTAMP)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `roles`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(100), UNIQUE, NOT NULL)
- `description` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `permissions`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(100), UNIQUE, NOT NULL)
- `description` (TEXT)
- `module` (VARCHAR(50), NOT NULL) -- warehouse, production, ledger, hr, admin
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `role_permissions`
- `role_id` (UUID, FOREIGN KEY → roles.id)
- `permission_id` (UUID, FOREIGN KEY → permissions.id)
- PRIMARY KEY (role_id, permission_id)

#### `sessions`
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID, FOREIGN KEY → users.id)
- `token` (VARCHAR(255), UNIQUE, NOT NULL)
- `expires_at` (TIMESTAMP, NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())

### 2. Warehouse Module

#### `inventory_categories`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), UNIQUE, NOT NULL)
- `description` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `inventory`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `category_id` (UUID, FOREIGN KEY → inventory_categories.id)
- `sku` (VARCHAR(100), UNIQUE)
- `quantity` (DECIMAL(10,2), DEFAULT 0, NOT NULL)
- `unit` (VARCHAR(50), NOT NULL) -- kg, pcs, liters, etc.
- `reorder_level` (DECIMAL(10,2), DEFAULT 0)
- `unit_cost` (DECIMAL(10,2))
- `supplier_id` (UUID, FOREIGN KEY → suppliers.id)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `suppliers`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `contact_person` (VARCHAR(255))
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `address` (TEXT)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `bulk_purchases`
- `id` (UUID, PRIMARY KEY)
- `purchase_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `supplier_id` (UUID, FOREIGN KEY → suppliers.id, NOT NULL)
- `total_amount` (DECIMAL(10,2), NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, received, cancelled
- `requested_by` (UUID, FOREIGN KEY → users.id)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `received_at` (TIMESTAMP)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `bulk_purchase_items`
- `id` (UUID, PRIMARY KEY)
- `bulk_purchase_id` (UUID, FOREIGN KEY → bulk_purchases.id, NOT NULL)
- `inventory_id` (UUID, FOREIGN KEY → inventory.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `unit_price` (DECIMAL(10,2), NOT NULL)
- `total` (DECIMAL(10,2), NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `stock_transfers`
- `id` (UUID, PRIMARY KEY)
- `transfer_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `from_location` (VARCHAR(255))
- `to_location` (VARCHAR(255), NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, in-transit, completed, cancelled
- `transferred_by` (UUID, FOREIGN KEY → users.id)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `stock_transfer_items`
- `id` (UUID, PRIMARY KEY)
- `stock_transfer_id` (UUID, FOREIGN KEY → stock_transfers.id, NOT NULL)
- `inventory_id` (UUID, FOREIGN KEY → inventory.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `stock_movements`
- `id` (UUID, PRIMARY KEY)
- `inventory_id` (UUID, FOREIGN KEY → inventory.id, NOT NULL)
- `movement_type` (VARCHAR(50), NOT NULL) -- purchase, transfer_in, transfer_out, production_issue, production_receipt, adjustment
- `reference_id` (UUID) -- links to bulk_purchase, stock_transfer, production_order, etc.
- `reference_type` (VARCHAR(50)) -- bulk_purchase, stock_transfer, production_order, etc.
- `quantity` (DECIMAL(10,2), NOT NULL) -- positive for in, negative for out
- `balance_after` (DECIMAL(10,2), NOT NULL)
- `moved_by` (UUID, FOREIGN KEY → users.id)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())

### 3. Production Module

#### `products`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `sku` (VARCHAR(100), UNIQUE)
- `description` (TEXT)
- `unit` (VARCHAR(50), NOT NULL)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `production_orders`
- `id` (UUID, PRIMARY KEY)
- `order_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `product_id` (UUID, FOREIGN KEY → products.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, in-progress, completed, cancelled
- `start_date` (DATE)
- `end_date` (DATE)
- `completed_at` (TIMESTAMP)
- `created_by` (UUID, FOREIGN KEY → users.id)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `material_requisitions`
- `id` (UUID, PRIMARY KEY)
- `requisition_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `production_order_id` (UUID, FOREIGN KEY → production_orders.id, NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected
- `requested_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `rejection_reason` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `material_requisition_items`
- `id` (UUID, PRIMARY KEY)
- `material_requisition_id` (UUID, FOREIGN KEY → material_requisitions.id, NOT NULL)
- `inventory_id` (UUID, FOREIGN KEY → inventory.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `unit` (VARCHAR(50), NOT NULL)
- `issued_quantity` (DECIMAL(10,2), DEFAULT 0)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `work_in_progress`
- `id` (UUID, PRIMARY KEY)
- `production_order_id` (UUID, FOREIGN KEY → production_orders.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `stage` (VARCHAR(100))
- `notes` (TEXT)
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `finished_goods`
- `id` (UUID, PRIMARY KEY)
- `production_order_id` (UUID, FOREIGN KEY → production_orders.id, NOT NULL)
- `product_id` (UUID, FOREIGN KEY → products.id, NOT NULL)
- `quantity` (DECIMAL(10,2), NOT NULL)
- `quality_status` (VARCHAR(50)) -- passed, failed, pending
- `completed_at` (TIMESTAMP, DEFAULT NOW())
- `created_at` (TIMESTAMP, DEFAULT NOW())

### 4. Ledger Module

#### `clients`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `contact_person` (VARCHAR(255))
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `address` (TEXT)
- `balance` (DECIMAL(10,2), DEFAULT 0)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `customers`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `contact_person` (VARCHAR(255))
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `address` (TEXT)
- `balance` (DECIMAL(10,2), DEFAULT 0)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `office_divisions`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), UNIQUE, NOT NULL)
- `code` (VARCHAR(50), UNIQUE)
- `description` (TEXT)
- `budget` (DECIMAL(10,2), DEFAULT 0)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `expense_categories`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), UNIQUE, NOT NULL)
- `description` (TEXT)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `expenses`
- `id` (UUID, PRIMARY KEY)
- `expense_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `category_id` (UUID, FOREIGN KEY → expense_categories.id, NOT NULL)
- `division_id` (UUID, FOREIGN KEY → office_divisions.id)
- `amount` (DECIMAL(10,2), NOT NULL)
- `description` (TEXT, NOT NULL)
- `expense_date` (DATE, NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected
- `requested_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `receipt_url` (VARCHAR(500))
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `reimbursements`
- `id` (UUID, PRIMARY KEY)
- `reimbursement_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `employee_id` (UUID, FOREIGN KEY → employees.id, NOT NULL)
- `total_amount` (DECIMAL(10,2), NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected, retired
- `requested_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `retired_at` (TIMESTAMP)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `reimbursement_items`
- `id` (UUID, PRIMARY KEY)
- `reimbursement_id` (UUID, FOREIGN KEY → reimbursements.id, NOT NULL)
- `description` (TEXT, NOT NULL)
- `amount` (DECIMAL(10,2), NOT NULL)
- `expense_date` (DATE, NOT NULL)
- `receipt_url` (VARCHAR(500))
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `retirements`
- `id` (UUID, PRIMARY KEY)
- `reimbursement_id` (UUID, FOREIGN KEY → reimbursements.id, NOT NULL)
- `retirement_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected
- `submitted_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `client_transactions`
- `id` (UUID, PRIMARY KEY)
- `client_id` (UUID, FOREIGN KEY → clients.id, NOT NULL)
- `transaction_type` (VARCHAR(50), NOT NULL) -- invoice, payment, credit_note, debit_note
- `reference_number` (VARCHAR(100))
- `amount` (DECIMAL(10,2), NOT NULL) -- positive for invoice/debit, negative for payment/credit
- `balance_after` (DECIMAL(10,2), NOT NULL)
- `transaction_date` (DATE, NOT NULL)
- `description` (TEXT)
- `created_by` (UUID, FOREIGN KEY → users.id)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `customer_transactions`
- `id` (UUID, PRIMARY KEY)
- `customer_id` (UUID, FOREIGN KEY → customers.id, NOT NULL)
- `transaction_type` (VARCHAR(50), NOT NULL) -- invoice, payment, credit_note, debit_note
- `reference_number` (VARCHAR(100))
- `amount` (DECIMAL(10,2), NOT NULL)
- `balance_after` (DECIMAL(10,2), NOT NULL)
- `transaction_date` (DATE, NOT NULL)
- `description` (TEXT)
- `created_by` (UUID, FOREIGN KEY → users.id)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `division_transactions`
- `id` (UUID, PRIMARY KEY)
- `division_id` (UUID, FOREIGN KEY → office_divisions.id, NOT NULL)
- `transaction_type` (VARCHAR(50), NOT NULL) -- budget_allocation, expense, adjustment
- `amount` (DECIMAL(10,2), NOT NULL)
- `balance_after` (DECIMAL(10,2), NOT NULL)
- `transaction_date` (DATE, NOT NULL)
- `description` (TEXT)
- `created_by` (UUID, FOREIGN KEY → users.id)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `chart_of_accounts`
- `id` (UUID, PRIMARY KEY)
- `account_code` (VARCHAR(50), UNIQUE, NOT NULL)
- `account_name` (VARCHAR(255), NOT NULL)
- `account_type` (VARCHAR(50), NOT NULL) -- asset, liability, equity, revenue, expense
- `parent_account_id` (UUID, FOREIGN KEY → chart_of_accounts.id)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `journal_entries`
- `id` (UUID, PRIMARY KEY)
- `entry_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `entry_date` (DATE, NOT NULL)
- `description` (TEXT, NOT NULL)
- `reference` (VARCHAR(100))
- `created_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `journal_entry_lines`
- `id` (UUID, PRIMARY KEY)
- `journal_entry_id` (UUID, FOREIGN KEY → journal_entries.id, NOT NULL)
- `account_id` (UUID, FOREIGN KEY → chart_of_accounts.id, NOT NULL)
- `debit` (DECIMAL(10,2), DEFAULT 0)
- `credit` (DECIMAL(10,2), DEFAULT 0)
- `description` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())

### 5. HR Module

#### `departments`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), UNIQUE, NOT NULL)
- `code` (VARCHAR(50), UNIQUE)
- `description` (TEXT)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `employees`
- `id` (UUID, PRIMARY KEY)
- `employee_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `phone` (VARCHAR(50))
- `department_id` (UUID, FOREIGN KEY → departments.id, NOT NULL)
- `position` (VARCHAR(255), NOT NULL)
- `hire_date` (DATE, NOT NULL)
- `salary` (DECIMAL(10,2))
- `is_active` (BOOLEAN, DEFAULT true)
- `user_id` (UUID, FOREIGN KEY → users.id) -- links to user account if exists
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `attendance`
- `id` (UUID, PRIMARY KEY)
- `employee_id` (UUID, FOREIGN KEY → employees.id, NOT NULL)
- `attendance_date` (DATE, NOT NULL)
- `check_in` (TIMESTAMP)
- `check_out` (TIMESTAMP)
- `status` (VARCHAR(50), NOT NULL) -- present, absent, late, leave
- `hours_worked` (DECIMAL(4,2))
- `overtime_hours` (DECIMAL(4,2), DEFAULT 0)
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())
- UNIQUE (employee_id, attendance_date)

#### `leave_types`
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR(255), UNIQUE, NOT NULL)
- `max_days` (INTEGER)
- `is_paid` (BOOLEAN, DEFAULT true)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())

#### `leaves`
- `id` (UUID, PRIMARY KEY)
- `leave_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `employee_id` (UUID, FOREIGN KEY → employees.id, NOT NULL)
- `leave_type_id` (UUID, FOREIGN KEY → leave_types.id, NOT NULL)
- `start_date` (DATE, NOT NULL)
- `end_date` (DATE, NOT NULL)
- `days` (INTEGER, NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected
- `reason` (TEXT, NOT NULL)
- `requested_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `rejection_reason` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `payroll`
- `id` (UUID, PRIMARY KEY)
- `payroll_number` (VARCHAR(100), UNIQUE, NOT NULL)
- `employee_id` (UUID, FOREIGN KEY → employees.id, NOT NULL)
- `pay_period_start` (DATE, NOT NULL)
- `pay_period_end` (DATE, NOT NULL)
- `basic_salary` (DECIMAL(10,2), NOT NULL)
- `allowances` (DECIMAL(10,2), DEFAULT 0)
- `deductions` (DECIMAL(10,2), DEFAULT 0)
- `overtime_pay` (DECIMAL(10,2), DEFAULT 0)
- `gross_pay` (DECIMAL(10,2), NOT NULL)
- `tax` (DECIMAL(10,2), DEFAULT 0)
- `net_pay` (DECIMAL(10,2), NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- draft, processed, paid
- `processed_by` (UUID, FOREIGN KEY → users.id)
- `processed_at` (TIMESTAMP)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

### 6. Audit Module

#### `audit_trails`
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `action` (VARCHAR(100), NOT NULL) -- create, update, delete, view, approve, reject
- `entity_type` (VARCHAR(100), NOT NULL) -- inventory, production_order, expense, etc.
- `entity_id` (UUID, NOT NULL)
- `changes` (JSONB) -- stores before/after values
- `ip_address` (VARCHAR(45))
- `user_agent` (TEXT)
- `timestamp` (TIMESTAMP, DEFAULT NOW())

### 7. Admin Module

#### `settings`
- `id` (UUID, PRIMARY KEY)
- `key` (VARCHAR(255), UNIQUE, NOT NULL)
- `value` (TEXT)
- `type` (VARCHAR(50)) -- string, number, boolean, json
- `description` (TEXT)
- `updated_by` (UUID, FOREIGN KEY → users.id)
- `updated_at` (TIMESTAMP, DEFAULT NOW())

#### `approvals`
- `id` (UUID, PRIMARY KEY)
- `entity_type` (VARCHAR(100), NOT NULL) -- bulk_purchase, expense, reimbursement, leave, etc.
- `entity_id` (UUID, NOT NULL)
- `status` (VARCHAR(50), NOT NULL) -- pending, approved, rejected
- `requested_by` (UUID, FOREIGN KEY → users.id, NOT NULL)
- `approved_by` (UUID, FOREIGN KEY → users.id)
- `approved_at` (TIMESTAMP)
- `rejection_reason` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

## Entity Relationships

### Key Relationships

1. **Users ↔ Roles**: Many-to-Many (via role_permissions)
2. **Roles ↔ Permissions**: Many-to-Many (via role_permissions)
3. **Users ↔ Employees**: One-to-One (optional - employee may have user account)
4. **Inventory ↔ Suppliers**: Many-to-One
5. **Inventory ↔ Categories**: Many-to-One
6. **BulkPurchases ↔ Suppliers**: Many-to-One
7. **BulkPurchaseItems ↔ BulkPurchases**: One-to-Many
8. **BulkPurchaseItems ↔ Inventory**: Many-to-One
9. **ProductionOrders ↔ Products**: Many-to-One
10. **MaterialRequisitions ↔ ProductionOrders**: Many-to-One
11. **MaterialRequisitionItems ↔ MaterialRequisitions**: One-to-Many
12. **MaterialRequisitionItems ↔ Inventory**: Many-to-One
13. **Employees ↔ Departments**: Many-to-One
14. **Attendance ↔ Employees**: One-to-Many
15. **Leaves ↔ Employees**: One-to-Many
16. **Leaves ↔ LeaveTypes**: Many-to-One
17. **Payroll ↔ Employees**: One-to-Many
18. **Expenses ↔ ExpenseCategories**: Many-to-One
19. **Expenses ↔ OfficeDivisions**: Many-to-One
20. **Reimbursements ↔ Employees**: Many-to-One
21. **ReimbursementItems ↔ Reimbursements**: One-to-Many
22. **ClientTransactions ↔ Clients**: One-to-Many
23. **CustomerTransactions ↔ Customers**: One-to-Many
24. **DivisionTransactions ↔ OfficeDivisions**: One-to-Many
25. **JournalEntries ↔ JournalEntryLines**: One-to-Many
26. **JournalEntryLines ↔ ChartOfAccounts**: Many-to-One
27. **StockMovements ↔ Inventory**: One-to-Many

## PostgreSQL Data Types Summary

- **UUID**: Primary keys and foreign keys
- **VARCHAR(n)**: Text fields with length limits
- **TEXT**: Unlimited text fields
- **DECIMAL(10,2)**: Monetary and quantity values (supports up to 99,999,999.99)
- **INTEGER**: Count values (days, quantities)
- **BOOLEAN**: True/false flags
- **DATE**: Date-only values
- **TIMESTAMP**: Date and time values
- **JSONB**: Structured data (audit trail changes)

## Indexes Recommended

1. `users.email` - UNIQUE index (already via UNIQUE constraint)
2. `inventory.sku` - UNIQUE index
3. `inventory.category_id` - For filtering
4. `bulk_purchases.status` - For filtering
5. `production_orders.status` - For filtering
6. `attendance.employee_id, attendance_date` - UNIQUE index
7. `audit_trails.entity_type, entity_id` - For lookups
8. `audit_trails.user_id, timestamp` - For user activity
9. `journal_entries.entry_date` - For date range queries
10. `stock_movements.inventory_id, created_at` - For inventory history

## Notes

- All tables include `created_at` and `updated_at` timestamps for audit purposes
- Status fields use VARCHAR to allow for future status additions
- Balance fields are calculated fields that should be updated via transactions
- All monetary values use DECIMAL(10,2) for precision
- UUIDs are used for all primary keys for better distribution and security
- Foreign keys ensure referential integrity
- Unique constraints prevent duplicate entries where needed
