/**
 * Permission Management Server Actions
 * Allows admins to grant permissions to users
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, requireAuth, type ActionResult } from "./base";

/**
 * Check if user has admin permissions
 */
async function requireAdmin() {
  const { user, supabase } = await requireAuth();
  
  // Get user's role
  const { data: userData, error } = await supabase
    .from("users")
    .select(`
      role:roles (
        name
      )
    `)
    .eq("id", user.id)
    .single();

  if (error || !userData) {
    throw new Error("Failed to verify user role");
  }

  const roleName = (userData.role as any)?.name;
  
  // Only super_admin and admin can manage permissions
  if (roleName !== "super_admin" && roleName !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return { user, supabase };
}

// Permission types
export type PermissionType = "full" | "view_request" | "view" | "self_only" | "request";
export type PermissionTypeOrNone = PermissionType | "none";

// Module types
export type ModuleType = 
  | "warehouse" 
  | "production" 
  | "ledger" 
  | "hr" 
  | "audit" 
  | "admin";

/**
 * Grant permission to a user for a specific module
 */
export async function grantPermission(
  userId: string,
  module: ModuleType,
  permissionType: PermissionType
): Promise<ActionResult<{ success: boolean }>> {
  return withErrorHandling(async () => {
    // Require admin access
    const { user } = await requireAuth();
    
    // TODO: Check if user has admin permissions
    // For now, allow if authenticated

    const supabase = await createServerClient();

    // Find the permission
    const { data: permission, error: permError } = await supabase
      .from("permissions")
      .select("id")
      .eq("name", permissionType)
      .eq("module", module)
      .single();

    if (permError || !permission) {
      throw new Error(`Permission '${permissionType}' not found for module '${module}'`);
    }

    // Get user's role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role_id")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      throw new Error("User not found");
    }

    if (!userData.role_id) {
      throw new Error("User does not have a role assigned");
    }

    // Add permission to user's role
    const { error: rolePermError } = await supabase
      .from("role_permissions")
      .insert({
        role_id: userData.role_id,
        permission_id: permission.id,
      })
      .select();

    if (rolePermError) {
      // If already exists, that's okay
      if (!rolePermError.message.includes("duplicate")) {
        throw new Error(`Failed to grant permission: ${rolePermError.message}`);
      }
    }

    return { success: true };
  });
}

/**
 * Revoke permission from a user for a specific module
 */
export async function revokePermission(
  userId: string,
  module: ModuleType,
  permissionType: PermissionType
): Promise<ActionResult<{ success: boolean }>> {
  return withErrorHandling(async () => {
    await requireAuth();

    const supabase = await createServerClient();

    // Find the permission
    const { data: permission, error: permError } = await supabase
      .from("permissions")
      .select("id")
      .eq("name", permissionType)
      .eq("module", module)
      .single();

    if (permError || !permission) {
      throw new Error(`Permission '${permissionType}' not found for module '${module}'`);
    }

    // Get user's role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role_id")
      .eq("id", userId)
      .single();

    if (userError || !userData || !userData.role_id) {
      throw new Error("User or role not found");
    }

    // Remove permission from role
    const { error } = await supabase
      .from("role_permissions")
      .delete()
      .eq("role_id", userData.role_id)
      .eq("permission_id", permission.id);

    if (error) {
      throw new Error(`Failed to revoke permission: ${error.message}`);
    }

    return { success: true };
  });
}

/**
 * Get all permissions for a user
 */
export async function getUserPermissions(
  userId: string
): Promise<ActionResult<Array<{ module: string; permission: string }>>> {
  return withErrorHandling(async () => {
    const supabase = await createServerClient();

    // Get user's role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role_id")
      .eq("id", userId)
      .single();

    if (userError || !userData || !userData.role_id) {
      throw new Error("User or role not found");
    }

    // Get all permissions for the role
    const { data: permissions, error: permError } = await supabase
      .from("role_permissions")
      .select(`
        permission:permissions (
          name,
          module
        )
      `)
      .eq("role_id", userData.role_id);

    if (permError) {
      throw new Error(`Failed to get permissions: ${permError.message}`);
    }

    const result = (permissions || []).map((p: any) => ({
      module: p.permission.module,
      permission: p.permission.name,
    }));

    return result;
  });
}

/**
 * Get permission matrix (all roles and their permissions)
 */
export async function getPermissionMatrix(): Promise<
  ActionResult<
    Array<{
      role: string;
      module: string;
      permission: string;
    }>
  >
> {
  return withErrorHandling(async () => {
    const supabase = await createServerClient();

    const { data: matrix, error } = await supabase
      .from("role_permissions")
      .select(`
        role:roles (name),
        permission:permissions (
          name,
          module
        )
      `);

    if (error) {
      throw new Error(`Failed to get permission matrix: ${error.message}`);
    }

    const result = (matrix || []).map((m: any) => ({
      role: m.role.name,
      module: m.permission.module,
      permission: m.permission.name,
    }));

    return result;
  });
}

/**
 * Change permission type for a role and module
 * This updates the permission by removing the old one and adding the new one
 * If newPermissionType is "none", removes all permissions for that module
 */
export async function changePermission(
  roleName: string,
  module: ModuleType,
  newPermissionType: PermissionTypeOrNone
): Promise<ActionResult<{ success: boolean }>> {
  return withErrorHandling(async () => {
    // Require admin access
    await requireAdmin();

    const supabase = await createServerClient();

    // Get the role
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .select("id")
      .eq("name", roleName)
      .single();

    if (roleError || !role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    // Get all current permissions for this role and module
    const { data: currentPermissions, error: currentError } = await supabase
      .from("role_permissions")
      .select(`
        permission_id,
        permission:permissions (
          name,
          module
        )
      `)
      .eq("role_id", role.id);

    if (currentError) {
      throw new Error(`Failed to get current permissions: ${currentError.message}`);
    }

    // Find permissions for this module
    const modulePermissions = (currentPermissions || []).filter(
      (p: any) => p.permission?.module === module
    );

    // Remove all existing permissions for this role and module
    if (modulePermissions.length > 0) {
      const permissionIds = modulePermissions.map((p: any) => p.permission_id);
      const { error: deleteError } = await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", role.id)
        .in("permission_id", permissionIds);

      if (deleteError) {
        throw new Error(`Failed to remove old permissions: ${deleteError.message}`);
      }
    }

    // If new permission is not "none", add the new permission
    if (newPermissionType !== "none") {
      // Find the new permission
      const { data: newPermission, error: permError } = await supabase
        .from("permissions")
        .select("id")
        .eq("name", newPermissionType)
        .eq("module", module)
        .single();

      if (permError || !newPermission) {
        throw new Error(`Permission '${newPermissionType}' not found for module '${module}'`);
      }

      // Add the new permission
      const { error: insertError } = await supabase
        .from("role_permissions")
        .insert({
          role_id: role.id,
          permission_id: newPermission.id,
        });

      if (insertError) {
        throw new Error(`Failed to add new permission: ${insertError.message}`);
      }
    }

    return { success: true };
  });
}
