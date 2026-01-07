-- Seed Data for ATJ-ERP
-- Insert initial data for testing and development

-- ============================================
-- 1. ROLES & PERMISSIONS
-- ============================================

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full system access'),
  ('manager', 'Manager with department-level access'),
  ('warehouse', 'Warehouse staff with inventory access'),
  ('production', 'Production staff with production order access'),
  ('accountant', 'Accountant with ledger access'),
  ('hr', 'HR staff with employee management access'),
  ('employee', 'Standard employee with basic access')
ON CONFLICT (name) DO NOTHING;

-- Insert permissions
INSERT INTO permissions (name, description, module) VALUES
  -- Warehouse permissions
  ('warehouse:view', 'View warehouse data', 'warehouse'),
  ('warehouse:create', 'Create warehouse records', 'warehouse'),
  ('warehouse:edit', 'Edit warehouse records', 'warehouse'),
  ('warehouse:delete', 'Delete warehouse records', 'warehouse'),
  -- Production permissions
  ('production:view', 'View production data', 'production'),
  ('production:create', 'Create production orders', 'production'),
  ('production:edit', 'Edit production orders', 'production'),
  ('production:delete', 'Delete production orders', 'production'),
  -- Ledger permissions
  ('ledger:view', 'View ledger data', 'ledger'),
  ('ledger:create', 'Create ledger entries', 'ledger'),
  ('ledger:edit', 'Edit ledger entries', 'ledger'),
  ('ledger:delete', 'Delete ledger entries', 'ledger'),
  -- HR permissions
  ('hr:view', 'View HR data', 'hr'),
  ('hr:create', 'Create HR records', 'hr'),
  ('hr:edit', 'Edit HR records', 'hr'),
  ('hr:delete', 'Delete HR records', 'hr'),
  -- Admin permissions
  ('admin:*', 'Full admin access', 'admin')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to admin role (all permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON CONFLICT DO NOTHING;

-- ============================================
-- 2. USERS
-- ============================================

-- Insert admin user (password: admin123 - CHANGE IN PRODUCTION!)
-- Note: This is a placeholder hash. Use proper password hashing in production.
INSERT INTO users (email, password_hash, name, role_id, is_active)
SELECT 
  'admin@atj-erp.com',
  '$2a$10$placeholder_hash_change_in_production', -- Replace with bcrypt hash
  'System Administrator',
  r.id,
  true
FROM roles r
WHERE r.name = 'admin'
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 3. INVENTORY CATEGORIES
-- ============================================

INSERT INTO inventory_categories (name, description) VALUES
  ('Raw Materials', 'Raw materials for production'),
  ('Finished Goods', 'Completed products ready for sale'),
  ('Packaging', 'Packaging materials'),
  ('Office Supplies', 'General office supplies'),
  ('Tools & Equipment', 'Tools and equipment')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 4. SUPPLIERS
-- ============================================

INSERT INTO suppliers (name, contact_person, email, phone, address) VALUES
  ('ABC Supplies Ltd', 'John Doe', 'john@abcsupplies.com', '+1234567890', '123 Supply St, City'),
  ('XYZ Materials Inc', 'Jane Smith', 'jane@xyzmaterials.com', '+0987654321', '456 Material Ave, City'),
  ('Global Distributors', 'Bob Johnson', 'bob@globaldist.com', '+1122334455', '789 Distribution Rd, City')
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. DEPARTMENTS
-- ============================================

INSERT INTO departments (name, code, description) VALUES
  ('Operations', 'OPS', 'Operations department'),
  ('Finance', 'FIN', 'Finance and accounting'),
  ('Human Resources', 'HR', 'Human resources management'),
  ('Production', 'PROD', 'Production department'),
  ('Warehouse', 'WH', 'Warehouse and inventory')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 6. EXPENSE CATEGORIES
-- ============================================

INSERT INTO expense_categories (name, description) VALUES
  ('Office Rent', 'Monthly office rental expenses'),
  ('Utilities', 'Electricity, water, internet'),
  ('Travel', 'Business travel expenses'),
  ('Meals & Entertainment', 'Business meals and entertainment'),
  ('Supplies', 'Office and operational supplies'),
  ('Marketing', 'Marketing and advertising expenses')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 7. LEAVE TYPES
-- ============================================

INSERT INTO leave_types (name, max_days, is_paid, is_active) VALUES
  ('Annual Leave', 20, true, true),
  ('Sick Leave', 10, true, true),
  ('Personal Leave', 5, false, true),
  ('Maternity Leave', 90, true, true),
  ('Paternity Leave', 14, true, true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 8. OFFICE DIVISIONS
-- ============================================

INSERT INTO office_divisions (name, code, description, budget) VALUES
  ('Head Office', 'HO', 'Main headquarters', 100000.00),
  ('Branch Office 1', 'BO1', 'First branch office', 50000.00),
  ('Branch Office 2', 'BO2', 'Second branch office', 50000.00)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 9. CHART OF ACCOUNTS (Sample)
-- ============================================

INSERT INTO chart_of_accounts (account_code, account_name, account_type, is_active) VALUES
  ('1000', 'Cash', 'asset', true),
  ('1100', 'Accounts Receivable', 'asset', true),
  ('1200', 'Inventory', 'asset', true),
  ('2000', 'Accounts Payable', 'liability', true),
  ('3000', 'Equity', 'equity', true),
  ('4000', 'Revenue', 'revenue', true),
  ('5000', 'Cost of Goods Sold', 'expense', true),
  ('6000', 'Operating Expenses', 'expense', true)
ON CONFLICT (account_code) DO NOTHING;

-- ============================================
-- NOTES
-- ============================================

-- 1. Password hashes: Replace placeholder with actual bcrypt hashes
--    Use: bcrypt.hash('your_password', 10) or similar
-- 
-- 2. This seed file uses ON CONFLICT to allow re-running safely
-- 
-- 3. Adjust values as needed for your specific use case
-- 
-- 4. Add more seed data as needed (inventory items, employees, etc.)
