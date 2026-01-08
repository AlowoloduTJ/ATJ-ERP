// Common Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

// Warehouse Types
export interface Inventory {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email?: string;
  address?: string;
}

export interface BulkPurchase {
  id: string;
  supplierId: string;
  items: BulkPurchaseItem[];
  totalAmount: number;
  status: "pending" | "approved" | "received" | "cancelled";
  createdAt: Date;
}

export interface BulkPurchaseItem {
  inventoryId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Production Types
export interface ProductionOrder {
  id: string;
  orderNumber: string;
  productId: string;
  quantity: number;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
}

export interface MaterialRequisition {
  id: string;
  productionOrderId: string;
  items: MaterialRequisitionItem[];
  status: "pending" | "approved" | "rejected";
  requestedBy: string;
  approvedBy?: string;
  createdAt: Date;
}

export interface MaterialRequisitionItem {
  inventoryId: string;
  quantity: number;
  unit: string;
}

// Ledger Types
export interface Client {
  id: string;
  name: string;
  contact: string;
  email?: string;
  address?: string;
  balance: number;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email?: string;
  address?: string;
  balance: number;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
  approvedBy?: string;
  status: "pending" | "approved" | "rejected";
}

// HR Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  hireDate: Date;
  salary: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: "present" | "absent" | "late" | "leave";
}

export interface Leave {
  id: string;
  employeeId: string;
  type: string;
  startDate: Date;
  endDate: Date;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

// Audit Types
export interface AuditTrail {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, unknown>;
  timestamp: Date;
}
