/**
 * Permission Management Page
 * Allows admins to view and manage user permissions
 */

"use client";

import { useState, useEffect, useTransition } from "react";
import { getPermissionMatrix, changePermission } from "@/actions/permissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/data/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PermissionType = "full" | "view_request" | "view" | "self_only" | "request";
type ModuleType = "warehouse" | "production" | "ledger" | "hr" | "audit" | "admin";

interface PermissionMatrixItem {
  role: string;
  module: string;
  permission: string;
}

const modules: ModuleType[] = ["warehouse", "production", "ledger", "hr", "audit", "admin"];
const roles = ["super_admin", "admin", "manager", "supervisor", "staff", "customer"];
const permissionTypes: PermissionType[] = ["full", "view_request", "view", "self_only", "request"];
const allPermissionTypes: (PermissionType | "none")[] = ["none", ...permissionTypes];

const permissionLabels: Record<PermissionType | "none", string> = {
  full: "Full",
  view_request: "View + Request",
  view: "View",
  self_only: "Self Only",
  request: "Request",
  none: "No Access",
};

const moduleLabels: Record<ModuleType, string> = {
  warehouse: "Warehouse",
  production: "Production",
  ledger: "Ledger",
  hr: "HR",
  audit: "Audit",
  admin: "Admin Panel",
};

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  supervisor: "Supervisor",
  staff: "Staff",
  customer: "Customer",
};

export default function PermissionsPage() {
  const [matrix, setMatrix] = useState<PermissionMatrixItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadMatrix();
  }, []);

  async function loadMatrix() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await getPermissionMatrix();

    if (result.success) {
      setMatrix(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  function getPermission(role: string, module: ModuleType): PermissionType | "none" {
    const item = matrix.find((m) => m.role === role && m.module === module);
    return item ? (item.permission as PermissionType) : "none";
  }

  async function handlePermissionChange(
    roleName: string,
    module: ModuleType,
    newPermission: PermissionType | "none"
  ) {
    startTransition(async () => {
      setError(null);
      setSuccess(null);

      try {
        const result = await changePermission(roleName, module, newPermission as PermissionType);

        if (result.success) {
          setSuccess(`Permission updated successfully for ${roleLabels[roleName]} - ${moduleLabels[module]}`);
          // Reload matrix to reflect changes
          await loadMatrix();
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update permission");
      }
    });
  }

  const columns: Column<{ role: string; permissions: Record<ModuleType, PermissionType | "none"> }>[] = [
    {
      key: "role",
      header: "Role",
      render: (item) => <span className="font-semibold">{roleLabels[item.role] || item.role}</span>,
    },
    ...modules.map((module) => ({
      key: module,
      header: moduleLabels[module],
      render: (item: { role: string; permissions: Record<ModuleType, PermissionType | "none"> }) => {
        const currentPermission = item.permissions[module] || "none";
        const isReadOnly = item.role === "super_admin"; // Super admin permissions are read-only

        if (isReadOnly) {
          const variant = currentPermission === "full" ? "default" : currentPermission === "none" ? "outline" : "secondary";
          return <Badge variant={variant}>{permissionLabels[currentPermission]}</Badge>;
        }

        return (
          <Select
            value={currentPermission}
            onValueChange={(value) => handlePermissionChange(item.role, module, value as PermissionType | "none")}
            disabled={isPending}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allPermissionTypes.map((perm) => (
                <SelectItem key={perm} value={perm}>
                  {permissionLabels[perm]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    })),
  ];

  const tableData = roles.map((role) => ({
    role,
    permissions: modules.reduce(
      (acc, module) => {
        acc[module] = getPermission(role, module);
        return acc;
      },
      {} as Record<ModuleType, PermissionType | "none">
    ),
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Permission Matrix</h1>
        <p className="text-muted-foreground">
          View and manage user permissions across all modules
        </p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">
              <strong>Error:</strong> {error}
            </div>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="text-green-600">
              <strong>Success:</strong> {success}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Current permissions for each role across all modules. Click on a permission to change it.
              </CardDescription>
            </div>
            <Button onClick={loadMatrix} disabled={loading} variant="outline">
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable
              data={tableData}
              columns={columns}
              emptyMessage="No permissions found"
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Full</p>
              <p className="text-sm text-muted-foreground">
                Complete access - can create, read, update, and delete all data
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">View + Request</p>
              <p className="text-sm text-muted-foreground">
                Can view all data and create requests/orders
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">View</p>
              <p className="text-sm text-muted-foreground">
                Read-only access - can view data but not modify
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Self Only</p>
              <p className="text-sm text-muted-foreground">
                Can only access own data and create requests for self
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Request</p>
              <p className="text-sm text-muted-foreground">
                Can only create requests - cannot view other data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
