-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================
-- Basic policies for development/testing
-- For production, customize these policies based on your security requirements
-- ============================================================================

-- ============================================================================
-- Policy: Allow authenticated users to read all data
-- ============================================================================
-- This is a permissive policy for development
-- In production, create more restrictive policies based on user roles

-- Warehouse Tables
CREATE POLICY "Allow authenticated read on suppliers" ON suppliers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on inventory" ON inventory
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on inventory_categories" ON inventory_categories
    FOR SELECT USING (auth.role() = 'authenticated');

-- Production Tables
CREATE POLICY "Allow authenticated read on products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on production_orders" ON production_orders
    FOR SELECT USING (auth.role() = 'authenticated');

-- Ledger Tables
CREATE POLICY "Allow authenticated read on clients" ON clients
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on customers" ON customers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on expenses" ON expenses
    FOR SELECT USING (auth.role() = 'authenticated');

-- HR Tables
CREATE POLICY "Allow authenticated read on employees" ON employees
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on departments" ON departments
    FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================================
-- Policy: Allow service role (admin) full access
-- ============================================================================
-- Service role key bypasses RLS, so this is handled automatically
-- No policies needed for service role operations

-- ============================================================================
-- Policy: For testing - allow anonymous access (TEMPORARY)
-- ============================================================================
-- ⚠️ WARNING: These policies allow unauthenticated access
-- Remove or restrict these in production!

-- Allow anonymous read for testing (suppliers table)
CREATE POLICY "Allow anonymous read on suppliers for testing" ON suppliers
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert on suppliers for testing" ON suppliers
    FOR INSERT WITH CHECK (true);

-- Allow anonymous read on other commonly tested tables
CREATE POLICY "Allow anonymous read on inventory for testing" ON inventory
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read on products for testing" ON products
    FOR SELECT USING (true);

-- ============================================================================
-- Note: For Production
-- ============================================================================
-- 1. Remove anonymous access policies
-- 2. Create role-based policies (admin, manager, employee, etc.)
-- 3. Implement user-specific data access (users can only see their own data)
-- 4. Add policies for INSERT, UPDATE, DELETE operations
-- 5. Consider using Supabase Auth for user authentication
-- ============================================================================
