# Server Actions Guide

Complete guide for using server actions in ATJ-ERP.

## 📚 What Are Server Actions?

Server Actions are Next.js 15 features that allow you to run server-side code directly from React components. They're perfect for database operations because they:

- ✅ Run on the server (secure)
- ✅ Don't require API routes
- ✅ Type-safe
- ✅ Automatically handle form submissions
- ✅ Work with React Server Components

**Documentation**: [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## 🏗️ Architecture

Our server actions are organized by module:

```
src/actions/
├── base.ts          # Error handling, validation, auth utilities
├── warehouse.ts     # Inventory & supplier operations
├── production.ts    # Product & production order operations
├── ledger.ts        # Client, customer & expense operations
├── hr.ts           # Employee, department & attendance operations
└── index.ts        # Centralized exports
```

## 🔐 Security Features

### Authentication
All actions automatically require authentication:

```tsx
// Inside every action:
await requireAuth() // Throws error if not authenticated
```

### Error Handling
All actions use consistent error handling:

```tsx
return withErrorHandling(async () => {
  // Your action code
})
```

### Validation
Required fields are validated:

```tsx
validateRequired(input, ["name", "email"])
```

## 📝 Usage Examples

### Example 1: Create Inventory (Client Component)

```tsx
"use client"

import { useState } from "react"
import { createInventory } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateInventoryForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await createInventory({
      name: formData.get("name") as string,
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit") as string,
      reorder_level: Number(formData.get("reorder_level")) || 0,
    })

    if (result.success) {
      alert(`Inventory created: ${result.data.id}`)
      // Reset form or redirect
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <Input name="name" placeholder="Item name" required />
      <Input name="quantity" type="number" placeholder="Quantity" required />
      <Input name="unit" placeholder="Unit (kg, pcs, etc.)" required />
      <Input name="reorder_level" type="number" placeholder="Reorder level" />
      
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Inventory"}
      </Button>
    </form>
  )
}
```

### Example 2: List Inventory (Server Component)

```tsx
import { listInventory } from "@/actions"
import { DataTable } from "@/components/data/DataTable"

export default async function InventoryPage() {
  const result = await listInventory({ is_active: true })

  if (!result.success) {
    return <div>Error loading inventory: {result.error}</div>
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "quantity", header: "Quantity" },
    { key: "unit", header: "Unit" },
  ]

  return (
    <div>
      <h1>Inventory</h1>
      <DataTable data={result.data} columns={columns} />
    </div>
  )
}
```

### Example 3: Update with Optimistic UI

```tsx
"use client"

import { useTransition } from "react"
import { updateInventory } from "@/actions"
import { Button } from "@/components/ui/button"

export function UpdateInventoryButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition()

  function handleUpdate() {
    startTransition(async () => {
      const result = await updateInventory(id, { name: "New Name" })
      
      if (result.success) {
        // Update UI optimistically
        console.log("Updated:", result.data)
      } else {
        console.error("Error:", result.error)
      }
    })
  }

  return (
    <Button onClick={handleUpdate} disabled={isPending}>
      {isPending ? "Updating..." : "Update"}
    </Button>
  )
}
```

### Example 4: Delete with Confirmation

```tsx
"use client"

import { useState } from "react"
import { deleteInventory } from "@/actions"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"

export function DeleteInventoryButton({ id }: { id: string }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    
    const result = await deleteInventory(id)
    
    if (result.success) {
      // Refresh or redirect
      window.location.reload()
    } else {
      alert(`Error: ${result.error}`)
    }
    
    setLoading(false)
    setShowConfirm(false)
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setShowConfirm(true)}>
        Delete
      </Button>
      
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Inventory Item"
        description="Are you sure? This action cannot be undone."
        loading={loading}
      />
    </>
  )
}
```

### Example 5: Search and Filter

```tsx
"use client"

import { useState, useEffect } from "react"
import { listInventory } from "@/actions"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export function InventoryList() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | undefined>()

  useEffect(() => {
    async function loadInventory() {
      setLoading(true)
      const result = await listInventory({
        search: search || undefined,
        category_id: category,
        is_active: true,
      })
      
      if (result.success) {
        setInventory(result.data)
      }
      setLoading(false)
    }

    loadInventory()
  }, [search, category])

  return (
    <div>
      <Input
        placeholder="Search inventory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {inventory.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## 🔄 Action Return Types

All actions return `ActionResult<T>`:

```tsx
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

**Always check success before accessing data:**

```tsx
const result = await createInventory(input)

if (result.success) {
  // ✅ Safe to access result.data
  console.log(result.data.id)
} else {
  // ❌ result.data doesn't exist, use result.error
  console.error(result.error)
}
```

## 🛡️ Error Handling Best Practices

### 1. Always Check Success

```tsx
// ❌ Bad
const result = await createInventory(input)
console.log(result.data.id) // Might crash if result.success is false

// ✅ Good
const result = await createInventory(input)
if (result.success) {
  console.log(result.data.id)
} else {
  console.error(result.error)
}
```

### 2. Show User-Friendly Errors

```tsx
const result = await createInventory(input)

if (!result.success) {
  // Show error to user
  toast.error(result.error)
  // Or
  setError(result.error)
}
```

### 3. Handle Network Errors

```tsx
try {
  const result = await createInventory(input)
  // Handle result
} catch (error) {
  // Handle network or unexpected errors
  console.error("Network error:", error)
}
```

## 📋 Available Actions Reference

### Warehouse Module
- `createInventory(input)` - Create inventory item
- `getInventory(id)` - Get by ID
- `listInventory(filters?)` - List with filters
- `updateInventory(id, input)` - Update item
- `deleteInventory(id)` - Soft delete
- `createSupplier(input)` - Create supplier
- `getSupplier(id)` - Get supplier
- `listSuppliers(filters?)` - List suppliers
- `updateSupplier(id, input)` - Update supplier
- `deleteSupplier(id)` - Soft delete

### Production Module
- `createProduct(input)` - Create product
- `getProduct(id)` - Get product
- `listProducts(filters?)` - List products
- `updateProduct(id, input)` - Update product
- `deleteProduct(id)` - Soft delete
- `createProductionOrder(input)` - Create order
- `getProductionOrder(id)` - Get order
- `listProductionOrders(filters?)` - List orders
- `updateProductionOrder(id, input)` - Update order
- `deleteProductionOrder(id)` - Cancel order

### Ledger Module
- `createClient(input)` - Create client
- `getClient(id)` - Get client
- `listClients(filters?)` - List clients
- `updateClient(id, input)` - Update client
- `deleteClient(id)` - Soft delete
- `createCustomer(input)` - Create customer
- `listCustomers(filters?)` - List customers
- `createExpense(input)` - Create expense
- `listExpenses(filters?)` - List expenses
- `approveExpense(id)` - Approve expense

### HR Module
- `createDepartment(input)` - Create department
- `listDepartments(filters?)` - List departments
- `createEmployee(input)` - Create employee
- `getEmployee(id)` - Get employee
- `listEmployees(filters?)` - List employees
- `updateEmployee(id, input)` - Update employee
- `deleteEmployee(id)` - Soft delete
- `createAttendance(input)` - Create/update attendance
- `listAttendance(filters?)` - List attendance

## 🚀 Next Steps

1. **Use actions in your components** - Start with simple CRUD operations
2. **Add more actions** - Extend as needed for your use cases
3. **Add validation** - Use Zod or similar for input validation
4. **Add logging** - Log important operations for audit trails
5. **Add caching** - Use Next.js caching for read operations

## 📖 Documentation References

- **Next.js Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- **Supabase Database Guide**: https://supabase.com/docs/guides/database/overview
- **Supabase JavaScript Client**: https://supabase.com/docs/reference/javascript/select

---

**Ready to use!** Import actions from `@/actions` and start building your UI.
