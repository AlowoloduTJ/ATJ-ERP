-- ============================================================================
-- Permission System Setup
-- ============================================================================
-- Defines permission types and module permissions for ATJ-ERP
-- Run this AFTER applying the main schema and RLS
-- ============================================================================

-- ============================================================================
-- Permission Types
-- ============================================================================
-- These are the base permission types that can be assigned to users

-- Note: Permissions are already defined in the permissions table
-- This script seeds the actual permission records

-- ============================================================================
-- Insert Permission Types
-- ============================================================================

-- Full Access Permission (can do everything)
INSERT INTO permissions (name, description, module) VALUES
('full', 'Full access - can create, read, update, delete', 'warehouse'),
('full', 'Full access - can create, read, update, delete', 'production'),
('full', 'Full access - can create, read, update, delete', 'ledger'),
('full', 'Full access - can create, read, update, delete', 'hr'),
('full', 'Full access - can create, read, update, delete', 'audit'),
('full', 'Full access - can create, read, update, delete', 'admin')
ON CONFLICT (name, module) DO NOTHING;

-- View + Request Permission (can view and create requests)
INSERT INTO permissions (name, description, module) VALUES
('view_request', 'Can view data and create requests', 'warehouse'),
('view_request', 'Can view data and create requests', 'production'),
('view_request', 'Can view data and create requests', 'ledger'),
('view_request', 'Can view data and create requests', 'hr'),
('view_request', 'Can view data and create requests', 'audit')
ON CONFLICT (name, module) DO NOTHING;

-- View Only Permission (read-only access)
INSERT INTO permissions (name, description, module) VALUES
('view', 'View only - read access', 'warehouse'),
('view', 'View only - read access', 'production'),
('view', 'View only - read access', 'ledger'),
('view', 'View only - read access', 'hr'),
('view', 'View only - read access', 'audit')
ON CONFLICT (name, module) DO NOTHING;

-- Self Only Permission (can only access own data)
INSERT INTO permissions (name, description, module) VALUES
('self_only', 'Can only access own data', 'warehouse'),
('self_only', 'Can only access own data', 'production'),
('self_only', 'Can only access own data', 'ledger'),
('self_only', 'Can only access own data', 'hr'),
('self_only', 'Can only access own data', 'audit')
ON CONFLICT (name, module) DO NOTHING;

-- Request Only Permission (can only create requests)
INSERT INTO permissions (name, description, module) VALUES
('request', 'Can only create requests', 'warehouse'),
('request', 'Can only create requests', 'production'),
('request', 'Can only create requests', 'ledger'),
('request', 'Can only create requests', 'hr')
ON CONFLICT (name, module) DO NOTHING;

-- ============================================================================
-- Create Roles
-- ============================================================================

-- Super Admin (has all permissions)
INSERT INTO roles (name, description) VALUES
('super_admin', 'Super Administrator - Full system access')
ON CONFLICT (name) DO NOTHING;

-- Admin (has most permissions)
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator - Full access except super admin functions')
ON CONFLICT (name) DO NOTHING;

-- Manager (can view and approve)
INSERT INTO roles (name, description) VALUES
('manager', 'Manager - Can view all data and approve requests')
ON CONFLICT (name) DO NOTHING;

-- Supervisor (can view and request)
INSERT INTO roles (name, description) VALUES
('supervisor', 'Supervisor - Can view data and create requests')
ON CONFLICT (name) DO NOTHING;

-- Staff (limited access)
INSERT INTO roles (name, description) VALUES
('staff', 'Staff - Can view and create requests for own work')
ON CONFLICT (name) DO NOTHING;

-- Customer (external access)
INSERT INTO roles (name, description) VALUES
('customer', 'Customer - Limited external access')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- Assign Permissions to Roles
-- ============================================================================

-- Super Admin: Full access to everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'super_admin'
ON CONFLICT DO NOTHING;

-- Admin: Full access to most modules, view for audit
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
    AND (p.name = 'full' OR (p.name = 'view' AND p.module = 'audit'))
ON CONFLICT DO NOTHING;

-- Manager: View + Request for most, view for audit
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'manager'
    AND (p.name = 'view_request' OR (p.name = 'view' AND p.module = 'audit'))
ON CONFLICT DO NOTHING;

-- Supervisor: View + Request for assigned modules
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'supervisor'
    AND p.name = 'view_request'
ON CONFLICT DO NOTHING;

-- Staff: Self Only or Request for most modules
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'staff'
    AND (p.name = 'self_only' OR p.name = 'request')
ON CONFLICT DO NOTHING;

-- Customer: View only for customer ledger, request for orders
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'customer'
    AND (
        (p.name = 'view' AND p.module = 'ledger')
        OR (p.name = 'request' AND p.module = 'production')
    )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Permission Matrix Created
-- ============================================================================
-- Permissions are now set up and assigned to roles
-- Admins can grant specific permissions to users via the role_permissions table
-- ============================================================================
