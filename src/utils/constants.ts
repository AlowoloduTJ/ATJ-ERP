// User Roles
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
  WAREHOUSE: "warehouse",
  PRODUCTION: "production",
  ACCOUNTANT: "accountant",
  HR: "hr",
} as const;

// Permissions
export const PERMISSIONS = {
  // Warehouse
  WAREHOUSE_VIEW: "warehouse:view",
  WAREHOUSE_CREATE: "warehouse:create",
  WAREHOUSE_EDIT: "warehouse:edit",
  WAREHOUSE_DELETE: "warehouse:delete",

  // Production
  PRODUCTION_VIEW: "production:view",
  PRODUCTION_CREATE: "production:create",
  PRODUCTION_EDIT: "production:edit",
  PRODUCTION_DELETE: "production:delete",

  // Ledger
  LEDGER_VIEW: "ledger:view",
  LEDGER_CREATE: "ledger:create",
  LEDGER_EDIT: "ledger:edit",
  LEDGER_DELETE: "ledger:delete",

  // HR
  HR_VIEW: "hr:view",
  HR_CREATE: "hr:create",
  HR_EDIT: "hr:edit",
  HR_DELETE: "hr:delete",

  // Admin
  ADMIN_ALL: "admin:*",
} as const;

// Status Options
export const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
