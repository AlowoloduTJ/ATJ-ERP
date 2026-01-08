-- ============================================================================
-- Enable Row Level Security (RLS) on All Tables
-- ============================================================================
-- This file enables RLS on all tables to protect sensitive data
-- Run this AFTER applying the main schema (APPLY_SCHEMA.sql)
-- ============================================================================

-- ============================================================================
-- Authentication & Authorization Tables
-- ============================================================================

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Warehouse Module Tables
-- ============================================================================

ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_transfer_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Production Module Tables
-- ============================================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_requisition_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_in_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE finished_goods ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Ledger Module Tables
-- ============================================================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE division_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entry_lines ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- HR Module Tables
-- ============================================================================

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE reimbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reimbursement_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE retirements ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Audit Module Tables
-- ============================================================================

ALTER TABLE audit_trails ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Admin Module Tables
-- ============================================================================

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS Enabled on All Tables
-- ============================================================================
-- Note: After enabling RLS, you need to create policies to allow access
-- See 10_rls_policies.sql for basic policies
-- ============================================================================
