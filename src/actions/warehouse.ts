/**
 * Warehouse Server Actions
 * CRUD operations for inventory and suppliers
 * 
 * @see https://supabase.com/docs/guides/database/overview
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, requireAuth, validateRequired, type ActionResult } from "./base";

// ============================================
// INVENTORY ACTIONS
// ============================================

export interface CreateInventoryInput {
  name: string;
  category_id?: string;
  sku?: string;
  quantity: number;
  unit: string;
  reorder_level?: number;
  unit_cost?: number;
  supplier_id?: string;
}

export interface UpdateInventoryInput {
  name?: string;
  category_id?: string;
  sku?: string;
  quantity?: number;
  unit?: string;
  reorder_level?: number;
  unit_cost?: number;
  supplier_id?: string;
  is_active?: boolean;
}

/**
 * Create a new inventory item
 */
export async function createInventory(
  input: CreateInventoryInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name", "quantity", "unit"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("inventory")
      .insert({
        name: input.name,
        category_id: input.category_id || null,
        sku: input.sku || null,
        quantity: input.quantity,
        unit: input.unit,
        reorder_level: input.reorder_level || 0,
        unit_cost: input.unit_cost || null,
        supplier_id: input.supplier_id || null,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create inventory: ${error.message}`);
    if (!data) throw new Error("Failed to create inventory: No data returned");

    return { id: data.id };
  });
}

/**
 * Get inventory item by ID
 */
export async function getInventory(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("inventory")
      .select(`
        *,
        category:inventory_categories(*),
        supplier:suppliers(*)
      `)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch inventory: ${error.message}`);
    if (!data) throw new Error("Inventory item not found");

    return data;
  });
}

/**
 * List inventory items with optional filters
 */
export async function listInventory(filters?: {
  category_id?: string;
  supplier_id?: string;
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("inventory")
      .select(`
        *,
        category:inventory_categories(*),
        supplier:suppliers(*)
      `)
      .order("created_at", { ascending: false });

    if (filters?.category_id) {
      query = query.eq("category_id", filters.category_id);
    }
    if (filters?.supplier_id) {
      query = query.eq("supplier_id", filters.supplier_id);
    }
    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch inventory: ${error.message}`);

    return data || [];
  });
}

/**
 * Update inventory item
 */
export async function updateInventory(
  id: string,
  input: UpdateInventoryInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("inventory")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update inventory: ${error.message}`);
    if (!data) throw new Error("Inventory item not found");

    return { id: data.id };
  });
}

/**
 * Delete inventory item (soft delete by setting is_active to false)
 */
export async function deleteInventory(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("inventory")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete inventory: ${error.message}`);
  });
}

// ============================================
// SUPPLIER ACTIONS
// ============================================

export interface CreateSupplierInput {
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateSupplierInput {
  name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
}

/**
 * Create a new supplier
 */
export async function createSupplier(
  input: CreateSupplierInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("suppliers")
      .insert(input)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create supplier: ${error.message}`);
    if (!data) throw new Error("Failed to create supplier: No data returned");

    return { id: data.id };
  });
}

/**
 * Get supplier by ID
 */
export async function getSupplier(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch supplier: ${error.message}`);
    if (!data) throw new Error("Supplier not found");

    return data;
  });
}

/**
 * List suppliers
 */
export async function listSuppliers(filters?: {
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("suppliers")
      .select("*")
      .order("name", { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch suppliers: ${error.message}`);

    return data || [];
  });
}

/**
 * Update supplier
 */
export async function updateSupplier(
  id: string,
  input: UpdateSupplierInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("suppliers")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update supplier: ${error.message}`);
    if (!data) throw new Error("Supplier not found");

    return { id: data.id };
  });
}

/**
 * Delete supplier (soft delete)
 */
export async function deleteSupplier(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("suppliers")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete supplier: ${error.message}`);
  });
}
