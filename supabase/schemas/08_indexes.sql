-- Indexes
-- Performance indexes for common query patterns
-- Note: Primary keys and unique constraints automatically create indexes

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Inventory
CREATE INDEX IF NOT EXISTS idx_inventory_category_id ON inventory(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_supplier_id ON inventory(supplier_id);
CREATE INDEX IF NOT EXISTS idx_inventory_sku ON inventory(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_is_active ON inventory(is_active);

-- Bulk Purchases
CREATE INDEX IF NOT EXISTS idx_bulk_purchases_status ON bulk_purchases(status);
CREATE INDEX IF NOT EXISTS idx_bulk_purchases_supplier_id ON bulk_purchases(supplier_id);
CREATE INDEX IF NOT EXISTS idx_bulk_purchases_requested_by ON bulk_purchases(requested_by);
CREATE INDEX IF NOT EXISTS idx_bulk_purchases_created_at ON bulk_purchases(created_at);

-- Stock Transfers
CREATE INDEX IF NOT EXISTS idx_stock_transfers_status ON stock_transfers(status);
CREATE INDEX IF NOT EXISTS idx_stock_transfers_created_at ON stock_transfers(created_at);

-- Stock Movements
CREATE INDEX IF NOT EXISTS idx_stock_movements_inventory_id ON stock_movements(inventory_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created_at ON stock_movements(created_at);
CREATE INDEX IF NOT EXISTS idx_stock_movements_reference ON stock_movements(reference_type, reference_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_movement_type ON stock_movements(movement_type);

-- Production Orders
CREATE INDEX IF NOT EXISTS idx_production_orders_status ON production_orders(status);
CREATE INDEX IF NOT EXISTS idx_production_orders_product_id ON production_orders(product_id);
CREATE INDEX IF NOT EXISTS idx_production_orders_created_by ON production_orders(created_by);
CREATE INDEX IF NOT EXISTS idx_production_orders_start_date ON production_orders(start_date);

-- Material Requisitions
CREATE INDEX IF NOT EXISTS idx_material_requisitions_status ON material_requisitions(status);
CREATE INDEX IF NOT EXISTS idx_material_requisitions_production_order_id ON material_requisitions(production_order_id);
CREATE INDEX IF NOT EXISTS idx_material_requisitions_requested_by ON material_requisitions(requested_by);

-- Employees
CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_employee_number ON employees(employee_number);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_is_active ON employees(is_active);
CREATE INDEX IF NOT EXISTS idx_employees_user_id ON employees(user_id);

-- Attendance
CREATE INDEX IF NOT EXISTS idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status);

-- Leaves
CREATE INDEX IF NOT EXISTS idx_leaves_employee_id ON leaves(employee_id);
CREATE INDEX IF NOT EXISTS idx_leaves_status ON leaves(status);
CREATE INDEX IF NOT EXISTS idx_leaves_leave_type_id ON leaves(leave_type_id);
CREATE INDEX IF NOT EXISTS idx_leaves_start_date ON leaves(start_date);

-- Payroll
CREATE INDEX IF NOT EXISTS idx_payroll_employee_id ON payroll(employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_status ON payroll(status);
CREATE INDEX IF NOT EXISTS idx_payroll_pay_period_start ON payroll(pay_period_start);

-- Reimbursements
CREATE INDEX IF NOT EXISTS idx_reimbursements_employee_id ON reimbursements(employee_id);
CREATE INDEX IF NOT EXISTS idx_reimbursements_status ON reimbursements(status);
CREATE INDEX IF NOT EXISTS idx_reimbursements_requested_by ON reimbursements(requested_by);

-- Expenses
CREATE INDEX IF NOT EXISTS idx_expenses_status ON expenses(status);
CREATE INDEX IF NOT EXISTS idx_expenses_category_id ON expenses(category_id);
CREATE INDEX IF NOT EXISTS idx_expenses_division_id ON expenses(division_id);
CREATE INDEX IF NOT EXISTS idx_expenses_requested_by ON expenses(requested_by);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date);

-- Reimbursements
CREATE INDEX IF NOT EXISTS idx_reimbursements_employee_id ON reimbursements(employee_id);
CREATE INDEX IF NOT EXISTS idx_reimbursements_status ON reimbursements(status);
CREATE INDEX IF NOT EXISTS idx_reimbursements_requested_by ON reimbursements(requested_by);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_client_transactions_client_id ON client_transactions(client_id);
CREATE INDEX IF NOT EXISTS idx_client_transactions_transaction_date ON client_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_customer_transactions_customer_id ON customer_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_transactions_transaction_date ON customer_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_division_transactions_division_id ON division_transactions(division_id);
CREATE INDEX IF NOT EXISTS idx_division_transactions_transaction_date ON division_transactions(transaction_date);

-- Journal Entries
CREATE INDEX IF NOT EXISTS idx_journal_entries_entry_date ON journal_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_by ON journal_entries(created_by);
CREATE INDEX IF NOT EXISTS idx_journal_entry_lines_account_id ON journal_entry_lines(account_id);
CREATE INDEX IF NOT EXISTS idx_journal_entry_lines_journal_entry_id ON journal_entry_lines(journal_entry_id);

-- Audit Trails
CREATE INDEX IF NOT EXISTS idx_audit_trails_user_id ON audit_trails(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_trails_entity ON audit_trails(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_trails_timestamp ON audit_trails(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_trails_action ON audit_trails(action);

-- Approvals
CREATE INDEX IF NOT EXISTS idx_approvals_entity ON approvals(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_requested_by ON approvals(requested_by);
