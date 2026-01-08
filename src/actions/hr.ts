/**
 * HR Server Actions
 * CRUD operations for employees, departments, and attendance
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, requireAuth, validateRequired, type ActionResult } from "./base";

// ============================================
// DEPARTMENT ACTIONS
// ============================================

export interface CreateDepartmentInput {
  name: string;
  code?: string;
  description?: string;
}

/**
 * Create a new department
 */
export async function createDepartment(
  input: CreateDepartmentInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["name"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("departments")
      .insert(input)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create department: ${error.message}`);
    if (!data) throw new Error("Failed to create department: No data returned");

    return { id: data.id };
  });
}

/**
 * List departments
 */
export async function listDepartments(filters?: {
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("departments")
      .select("*")
      .order("name", { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch departments: ${error.message}`);

    return data || [];
  });
}

// ============================================
// EMPLOYEE ACTIONS
// ============================================

export interface CreateEmployeeInput {
  employee_number: string;
  name: string;
  email: string;
  phone?: string;
  department_id: string;
  position: string;
  hire_date: string;
  salary?: number;
  user_id?: string;
}

export interface UpdateEmployeeInput {
  name?: string;
  email?: string;
  phone?: string;
  department_id?: string;
  position?: string;
  salary?: number;
  is_active?: boolean;
  user_id?: string;
}

/**
 * Create a new employee
 */
export async function createEmployee(
  input: CreateEmployeeInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["employee_number", "name", "email", "department_id", "position", "hire_date"]);

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("employees")
      .insert(input)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create employee: ${error.message}`);
    if (!data) throw new Error("Failed to create employee: No data returned");

    return { id: data.id };
  });
}

/**
 * Get employee by ID
 */
export async function getEmployee(id: string): Promise<ActionResult<any>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("employees")
      .select(`
        *,
        department:departments(*),
        user:users(id, email, name)
      `)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch employee: ${error.message}`);
    if (!data) throw new Error("Employee not found");

    return data;
  });
}

/**
 * List employees
 */
export async function listEmployees(filters?: {
  department_id?: string;
  is_active?: boolean;
  search?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("employees")
      .select(`
        *,
        department:departments(*)
      `)
      .order("name", { ascending: true });

    if (filters?.department_id) {
      query = query.eq("department_id", filters.department_id);
    }
    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch employees: ${error.message}`);

    return data || [];
  });
}

/**
 * Update employee
 */
export async function updateEmployee(
  id: string,
  input: UpdateEmployeeInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("employees")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to update employee: ${error.message}`);
    if (!data) throw new Error("Employee not found");

    return { id: data.id };
  });
}

/**
 * Delete employee (soft delete)
 */
export async function deleteEmployee(id: string): Promise<ActionResult<void>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("employees")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`Failed to delete employee: ${error.message}`);
  });
}

// ============================================
// ATTENDANCE ACTIONS
// ============================================

export interface CreateAttendanceInput {
  employee_id: string;
  attendance_date: string;
  check_in?: string;
  check_out?: string;
  status: "present" | "absent" | "late" | "leave";
  hours_worked?: number;
  overtime_hours?: number;
  notes?: string;
}

/**
 * Create or update attendance record
 */
export async function createAttendance(
  input: CreateAttendanceInput
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    await requireAuth();
    validateRequired(input, ["employee_id", "attendance_date", "status"]);

    const supabase = await createServerClient();
    
    // Check if attendance already exists for this date
    const { data: existing } = await supabase
      .from("attendance")
      .select("id")
      .eq("employee_id", input.employee_id)
      .eq("attendance_date", input.attendance_date)
      .single();

    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from("attendance")
        .update({
          check_in: input.check_in || null,
          check_out: input.check_out || null,
          status: input.status,
          hours_worked: input.hours_worked || null,
          overtime_hours: input.overtime_hours || 0,
          notes: input.notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select("id")
        .single();

      if (error) throw new Error(`Failed to update attendance: ${error.message}`);
      return { id: data.id };
    } else {
      // Create new record
      const { data, error } = await supabase
        .from("attendance")
        .insert({
          employee_id: input.employee_id,
          attendance_date: input.attendance_date,
          check_in: input.check_in || null,
          check_out: input.check_out || null,
          status: input.status,
          hours_worked: input.hours_worked || null,
          overtime_hours: input.overtime_hours || 0,
          notes: input.notes || null,
        })
        .select("id")
        .single();

      if (error) throw new Error(`Failed to create attendance: ${error.message}`);
      if (!data) throw new Error("Failed to create attendance: No data returned");

      return { id: data.id };
    }
  });
}

/**
 * List attendance records
 */
export async function listAttendance(filters?: {
  employee_id?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
}): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();
    let query = supabase
      .from("attendance")
      .select(`
        *,
        employee:employees(name, employee_number)
      `)
      .order("attendance_date", { ascending: false });

    if (filters?.employee_id) {
      query = query.eq("employee_id", filters.employee_id);
    }
    if (filters?.start_date) {
      query = query.gte("attendance_date", filters.start_date);
    }
    if (filters?.end_date) {
      query = query.lte("attendance_date", filters.end_date);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch attendance: ${error.message}`);

    return data || [];
  });
}
