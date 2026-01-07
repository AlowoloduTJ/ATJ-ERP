/**
 * Ledger Server Actions
 * CRUD operations for clients, customers, and expenses
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, requireAuth, validateRequired, type ActionResult } from "./base";

// ============================================
// CLIENT ACTIONS
// ============================================

export interface CreateClientInput {
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateClientInput {
  name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
}

/**
 * Create a new client
 */
export async function createClient(
  input: CreateClientInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("clients")
      .insert({
        ...input,
        balance: 0,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create client: ${error.message}`);
    if (!data) throw new Error("Failed to create client: No data returned");

    return { id: data.id };
  });
}

/**
 * Get client by ID
 */
export async function getClient(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch client: ${error.message}`);
    if (!data) throw new Error("Client not found");

    return data;
  });
}

/**
 * List clients
 */
export async function listClients(filters?: {
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("clients")
      .select("*")
      .order("name", { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch clients: ${error.message}`);

    return data || [];
  });
}

/**
 * Update client
 */
export async function updateClient(
  id: string,
  input: UpdateClientInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("clients")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update client: ${error.message}`);
    if (!data) throw new Error("Client not found");

    return { id: data.id };
  });
}

/**
 * Delete client (soft delete)
 */
export async function deleteClient(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("clients")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete client: ${error.message}`);
  });
}

// ============================================
// CUSTOMER ACTIONS (similar to clients)
// ============================================

export interface CreateCustomerInput {
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateCustomerInput {
  name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
}

/**
 * Create a new customer
 */
export async function createCustomer(
  input: CreateCustomerInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("customers")
      .insert({
        ...input,
        balance: 0,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create customer: ${error.message}`);
    if (!data) throw new Error("Failed to create customer: No data returned");

    return { id: data.id };
  });
}

/**
 * List customers
 */
export async function listCustomers(filters?: {
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("customers")
      .select("*")
      .order("name", { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch customers: ${error.message}`);

    return data || [];
  });
}

// ============================================
// EXPENSE ACTIONS
// ============================================

export interface CreateExpenseInput {
  expense_number: string;
  category_id: string;
  division_id?: string;
  amount: number;
  description: string;
  expense_date: string;
  receipt_url?: string;
}

export interface UpdateExpenseInput {
  category_id?: string;
  division_id?: string;
  amount?: number;
  description?: string;
  expense_date?: string;
  status?: "pending" | "approved" | "rejected";
  receipt_url?: string;
}

/**
 * Create a new expense
 */
export async function createExpense(
  input: CreateExpenseInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    const { user } = await requireAuth();
    validateRequired(input, ["expense_number", "category_id", "amount", "description", "expense_date"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("expenses")
      .insert({
        expense_number: input.expense_number,
        category_id: input.category_id,
        division_id: input.division_id || null,
        amount: input.amount,
        description: input.description,
        expense_date: input.expense_date,
        status: "pending",
        requested_by: user.id,
        receipt_url: input.receipt_url || null,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create expense: ${error.message}`);
    if (!data) throw new Error("Failed to create expense: No data returned");

    return { id: data.id };
  });
}

/**
 * List expenses
 */
export async function listExpenses(filters?: {
  status?: string;
  category_id?: string;
  division_id?: string;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("expenses")
      .select(`
        *,
        category:expense_categories(*),
        division:office_divisions(*),
        requester:users!expenses_requested_by_fkey(name, email)
      `)
      .order("created_at", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.category_id) {
      query = query.eq("category_id", filters.category_id);
    }
    if (filters?.division_id) {
      query = query.eq("division_id", filters.division_id);
    }
    if (filters?.search) {
      query = query.ilike("description", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch expenses: ${error.message}`);

    return data || [];
  });
}

/**
 * Approve expense
 */
export async function approveExpense(
  id: string
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    const { user } = await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("expenses")
      .update({
        status: "approved",
        approved_by: user.id,
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to approve expense: ${error.message}`);
    if (!data) throw new Error("Expense not found");

    return { id: data.id };
  });
}
