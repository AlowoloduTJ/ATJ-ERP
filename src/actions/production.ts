/**
 * Production Server Actions
 * CRUD operations for products and production orders
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, requireAuth, validateRequired, type ActionResult } from "./base";

// ============================================
// PRODUCT ACTIONS
// ============================================

export interface CreateProductInput {
  name: string;
  sku?: string;
  description?: string;
  unit: string;
}

export interface UpdateProductInput {
  name?: string;
  sku?: string;
  description?: string;
  unit?: string;
  is_active?: boolean;
}

/**
 * Create a new product
 */
export async function createProduct(
  input: CreateProductInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name", "unit"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: input.name,
        sku: input.sku || null,
        description: input.description || null,
        unit: input.unit,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    if (!data) throw new Error("Failed to create product: No data returned");

    return { id: data.id };
  });
}

/**
 * Get product by ID
 */
export async function getProduct(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch product: ${error.message}`);
    if (!data) throw new Error("Product not found");

    return data;
  });
}

/**
 * List products
 */
export async function listProducts(filters?: {
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch products: ${error.message}`);

    return data || [];
  });
}

/**
 * Update product
 */
export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("products")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update product: ${error.message}`);
    if (!data) throw new Error("Product not found");

    return { id: data.id };
  });
}

/**
 * Delete product (soft delete)
 */
export async function deleteProduct(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("products")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete product: ${error.message}`);
  });
}

// ============================================
// PRODUCTION ORDER ACTIONS
// ============================================

export interface CreateProductionOrderInput {
  order_number: string;
  product_id: string;
  quantity: number;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export interface UpdateProductionOrderInput {
  order_number?: string;
  product_id?: string;
  quantity?: number;
  status?: "pending" | "in-progress" | "completed" | "cancelled";
  start_date?: string;
  end_date?: string;
  completed_at?: string;
  notes?: string;
}

/**
 * Create a new production order
 */
export async function createProductionOrder(
  input: CreateProductionOrderInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    const { user } = await requireAuth();
    validateRequired(input, ["order_number", "product_id", "quantity"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("production_orders")
      .insert({
        order_number: input.order_number,
        product_id: input.product_id,
        quantity: input.quantity,
        status: "pending",
        start_date: input.start_date || null,
        end_date: input.end_date || null,
        created_by: user.id,
        notes: input.notes || null,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create production order: ${error.message}`);
    if (!data) throw new Error("Failed to create production order: No data returned");

    return { id: data.id };
  });
}

/**
 * Get production order by ID
 */
export async function getProductionOrder(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("production_orders")
      .select(`
        *,
        product:products(*),
        creator:users!production_orders_created_by_fkey(name, email)
      `)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch production order: ${error.message}`);
    if (!data) throw new Error("Production order not found");

    return data;
  });
}

/**
 * List production orders
 */
export async function listProductionOrders(filters?: {
  status?: string;
  product_id?: string;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("production_orders")
      .select(`
        *,
        product:products(*)
      `)
      .order("created_at", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.product_id) {
      query = query.eq("product_id", filters.product_id);
    }
    if (filters?.search) {
      query = query.ilike("order_number", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch production orders: ${error.message}`);

    return data || [];
  });
}

/**
 * Update production order
 */
export async function updateProductionOrder(
  id: string,
  input: UpdateProductionOrderInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("production_orders")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update production order: ${error.message}`);
    if (!data) throw new Error("Production order not found");

    return { id: data.id };
  });
}

/**
 * Delete production order (soft delete by cancelling)
 */
export async function deleteProductionOrder(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("production_orders")
      .update({ 
        status: "cancelled",
        updated_at: new Date().toISOString() 
      })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete production order: ${error.message}`);
  });
}
