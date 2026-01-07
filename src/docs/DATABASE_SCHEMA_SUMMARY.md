# Database Schema Summary - MVP Requirements

## Overview

Based on the ATJ-ERP concept document and TypeScript type definitions, this document outlines the minimum data persistence requirements for the MVP.

## Main Entities & Fields for MVP

### 1. Authentication & Authorization (Core)

**users**
- Essential: id, email, password_hash, name, role_id, is_active
- Tracking: created_at, updated_at, last_login

**roles**
- Essential: id, name, permissions (via role_permissions junction)

**permissions**
- Essential: id, name, module

**sessions**
- Essential: id, user_id, token, expires_at

### 2. Warehouse Module

**inventory**
- Essential: id, name, category_id, quantity, unit, reorder_level
- Optional: sku, unit_cost, supplier_id
- Tracking: created_at, updated_at

**suppliers**
- Essential: id, name, contact_person
- Optional: email, phone, address

**bulk_purchases**
- Essential: id, purchase_number, supplier_id, total_amount, status
- Workflow: requested_by, approved_by, received_at

**bulk_purchase_items**
- Essential: id, bulk_purchase_id, inventory_id, quantity, unit_price, total

**stock_transfers**
- Essential: id, transfer_number, to_location, status
- Optional: from_location

**stock_movements**
- Essential: id, inventory_id, movement_type, quantity, balance_after
- Reference: reference_id, reference_type

### 3. Production Module

**products**
- Essential: id, name, unit
- Optional: sku, description

**production_orders**
- Essential: id, order_number, product_id, quantity, status
- Dates: start_date, end_date, completed_at

**material_requisitions**
- Essential: id, requisition_number, production_order_id, status
- Workflow: requested_by, approved_by

**material_requisition_items**
- Essential: id, material_requisition_id, inventory_id, quantity, unit

**work_in_progress**
- Essential: id, production_order_id, quantity

**finished_goods**
- Essential: id, production_order_id, product_id, quantity

### 4. Ledger Module

**clients**
- Essential: id, name, balance
- Contact: contact_person, email, phone, address

**customers**
- Essential: id, name, balance
- Contact: contact_person, email, phone, address

**office_divisions**
- Essential: id, name, budget
- Optional: code, description

**expense_categories**
- Essential: id, name

**expenses**
- Essential: id, expense_number, category_id, amount, description, expense_date, status
- Workflow: requested_by, approved_by
- Optional: division_id, receipt_url

**reimbursements**
- Essential: id, reimbursement_number, employee_id, total_amount, status
- Workflow: requested_by, approved_by, retired_at

**reimbursement_items**
- Essential: id, reimbursement_id, description, amount, expense_date

**retirements**
- Essential: id, reimbursement_id, retirement_number, status
- Workflow: submitted_by, approved_by

**client_transactions**
- Essential: id, client_id, transaction_type, amount, balance_after, transaction_date

**customer_transactions**
- Essential: id, customer_id, transaction_type, amount, balance_after, transaction_date

**division_transactions**
- Essential: id, division_id, transaction_type, amount, balance_after, transaction_date

**chart_of_accounts**
- Essential: id, account_code, account_name, account_type
- Hierarchy: parent_account_id

**journal_entries**
- Essential: id, entry_number, entry_date, description, created_by

**journal_entry_lines**
- Essential: id, journal_entry_id, account_id, debit, credit

### 5. HR Module

**departments**
- Essential: id, name
- Optional: code, description

**employees**
- Essential: id, employee_number, name, email, department_id, position, hire_date
- Optional: phone, salary, user_id (link to user account)

**attendance**
- Essential: id, employee_id, attendance_date, status
- Time tracking: check_in, check_out, hours_worked, overtime_hours

**leave_types**
- Essential: id, name
- Policy: max_days, is_paid

**leaves**
- Essential: id, leave_number, employee_id, leave_type_id, start_date, end_date, days, status, reason
- Workflow: requested_by, approved_by

**payroll**
- Essential: id, payroll_number, employee_id, pay_period_start, pay_period_end
- Calculations: basic_salary, allowances, deductions, overtime_pay, gross_pay, tax, net_pay
- Status: status, processed_by, processed_at

### 6. Audit Module

**audit_trails**
- Essential: id, user_id, action, entity_type, entity_id, timestamp
- Details: changes (JSONB), ip_address, user_agent

### 7. Admin Module

**settings**
- Essential: id, key, value, type

**approvals**
- Essential: id, entity_type, entity_id, status, requested_by
- Workflow: approved_by, approved_at, rejection_reason

## Entity Relationships Summary

### One-to-Many Relationships
- Users → Sessions
- Roles → Users
- Inventory Categories → Inventory
- Suppliers → Inventory, Bulk Purchases
- Bulk Purchases → Bulk Purchase Items
- Products → Production Orders
- Production Orders → Material Requisitions, WIP, Finished Goods
- Material Requisitions → Material Requisition Items
- Departments → Employees
- Employees → Attendance, Leaves, Payroll, Reimbursements
- Clients → Client Transactions
- Customers → Customer Transactions
- Office Divisions → Expenses, Division Transactions
- Expense Categories → Expenses
- Reimbursements → Reimbursement Items, Retirements
- Chart of Accounts → Journal Entry Lines
- Journal Entries → Journal Entry Lines
- Inventory → Stock Movements

### Many-to-Many Relationships
- Roles ↔ Permissions (via role_permissions)

### One-to-One Relationships
- Users ↔ Employees (optional, via user_id)

## Key Design Decisions

1. **UUID Primary Keys**: All tables use UUID for better distribution and security
2. **Status Fields**: VARCHAR to allow flexibility for future status additions
3. **Balance Fields**: Calculated fields maintained via transactions
4. **Audit Trail**: Comprehensive logging via audit_trails table
5. **Approval Workflow**: Centralized approvals table for all approval-required entities
6. **Stock Tracking**: Stock movements table provides complete inventory history
7. **Transaction Pattern**: All ledger transactions follow same pattern (type, amount, balance_after)
8. **Soft Deletes**: Using is_active flags instead of hard deletes for referential integrity

## MVP Priority

### Phase 1 (Core Functionality)
1. Authentication (users, roles, permissions, sessions)
2. Warehouse basics (inventory, suppliers, bulk_purchases)
3. Production basics (products, production_orders, material_requisitions)
4. HR basics (departments, employees, attendance)

### Phase 2 (Financial Tracking)
5. Ledger basics (clients, customers, expenses, transactions)
6. General ledger (chart_of_accounts, journal_entries)

### Phase 3 (Advanced Features)
7. Reimbursements and retirements
8. Payroll processing
9. Advanced reporting and analytics

## Data Integrity Rules

1. **Cascade Deletes**: Child records deleted when parent deleted (items, lines)
2. **Foreign Key Constraints**: All relationships enforced at database level
3. **Unique Constraints**: Prevent duplicates (email, sku, employee_number, etc.)
4. **Check Constraints**: Can be added for status values if needed
5. **Balance Calculations**: Must be maintained via transactions (not direct updates)

## Indexing Strategy

- Primary keys: Automatic indexes
- Foreign keys: Indexed for join performance
- Status fields: Indexed for filtering
- Date fields: Indexed for range queries
- Unique fields: Automatic unique indexes
- Composite indexes: For common query patterns (entity_type + entity_id)
