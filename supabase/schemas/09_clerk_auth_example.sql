-- ============================================================================
-- Clerk + Supabase Integration Example
-- ============================================================================
-- This file demonstrates how to create a table with Clerk authentication
-- and Row Level Security (RLS) policies for data isolation.
--
-- This example uses a "user_tasks" table, but the pattern applies to any
-- table that needs user-specific data isolation.
-- ============================================================================

-- Step 1: Create a table with user_id that auto-fills from Clerk
-- The user_id column automatically gets the Clerk user ID from the session token
-- when new records are created using auth.jwt()->>'sub'

CREATE TABLE IF NOT EXISTS user_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  user_id TEXT NOT NULL DEFAULT (auth.jwt()->>'sub'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable Row Level Security (RLS)
-- RLS ensures users can only access their own data

ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies to restrict access

-- Policy: Users can view only their own tasks
CREATE POLICY "Users can view their own tasks"
ON user_tasks
FOR SELECT
TO authenticated
USING ((auth.jwt()->>'sub') = user_id);

-- Policy: Users can insert only their own tasks
-- The default value ensures user_id is set, but we also check it
CREATE POLICY "Users must insert their own tasks"
ON user_tasks
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt()->>'sub') = user_id);

-- Policy: Users can update only their own tasks
CREATE POLICY "Users can update their own tasks"
ON user_tasks
FOR UPDATE
TO authenticated
USING ((auth.jwt()->>'sub') = user_id)
WITH CHECK ((auth.jwt()->>'sub') = user_id);

-- Policy: Users can delete only their own tasks
CREATE POLICY "Users can delete their own tasks"
ON user_tasks
FOR DELETE
TO authenticated
USING ((auth.jwt()->>'sub') = user_id);

-- ============================================================================
-- Notes:
-- ============================================================================
-- 1. The user_id column uses DEFAULT (auth.jwt()->>'sub') which automatically
--    extracts the Clerk user ID from the JWT token's 'sub' claim.
--
-- 2. RLS policies use (auth.jwt()->>'sub') to identify the current user from
--    the Clerk session token.
--
-- 3. The 'authenticated' role in Supabase is automatically assigned when a
--    valid JWT token is present (from Clerk).
--
-- 4. This pattern ensures complete data isolation - users can only see and
--    modify their own records.
-- ============================================================================
