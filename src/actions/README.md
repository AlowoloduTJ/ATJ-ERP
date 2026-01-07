# Server Actions

Server actions for database operations using Supabase.

## Structure

```
src/actions/
├── base.ts          # Base utilities (error handling, validation)
├── warehouse.ts     # Inventory and supplier operations
├── production.ts    # Product and production order operations
├── ledger.ts        # Client, customer, and expense operations
├── hr.ts           # Employee, department, and attendance operations
├── index.ts        # Centralized exports
└── README.md       # This file
```

## Usage

### In Client Components

```tsx
"use client"

import { useState } from "react"
import { createInventory, listInventory } from "@/actions"

export function InventoryForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    
    const result = await createInventory({
      name: formData.get("name") as string,
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit") as string,
    })

    if (result.success) {
      console.log("Created:", result.data)
    } else {
      console.error("Error:", result.error)
    }
    
    setLoading(false)
  }

  return (
    <form action={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### In Server Components

```tsx
import { listInventory } from "@/actions"

export default async function InventoryPage() {
  const result = await listInventory({ is_active: true })

  if (!result.success) {
    return <div>Error: {result.error}</div>
  }

  return (
    <div>
      {result.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## Error Handling

All actions return a `ActionResult<T>` type:

```tsx
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

Always check `result.success` before accessing `result.data`.

## Authentication

All actions automatically require authentication. If a user is not authenticated, the action will return an error.

## Available Actions

### Warehouse
- `createInventory` - Create inventory item
- `getInventory` - Get inventory by ID
- `listInventory` - List inventory with filters
- `updateInventory` - Update inventory item
- `deleteInventory` - Soft delete inventory
- `createSupplier` - Create supplier
- `listSuppliers` - List suppliers
- `updateSupplier` - Update supplier
- `deleteSupplier` - Soft delete supplier

### Production
- `createProduct` - Create product
- `getProduct` - Get product by ID
- `listProducts` - List products
- `updateProduct` - Update product
- `deleteProduct` - Soft delete product
- `createProductionOrder` - Create production order
- `getProductionOrder` - Get production order by ID
- `listProductionOrders` - List production orders
- `updateProductionOrder` - Update production order
- `deleteProductionOrder` - Cancel production order

### Ledger
- `createClient` - Create client
- `getClient` - Get client by ID
- `listClients` - List clients
- `updateClient` - Update client
- `deleteClient` - Soft delete client
- `createCustomer` - Create customer
- `listCustomers` - List customers
- `createExpense` - Create expense
- `listExpenses` - List expenses
- `approveExpense` - Approve expense

### HR
- `createDepartment` - Create department
- `listDepartments` - List departments
- `createEmployee` - Create employee
- `getEmployee` - Get employee by ID
- `listEmployees` - List employees
- `updateEmployee` - Update employee
- `deleteEmployee` - Soft delete employee
- `createAttendance` - Create/update attendance
- `listAttendance` - List attendance records

## Examples

See component examples in the main documentation.
