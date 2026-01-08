/**
 * Example: Using Server Actions in Server Component
 * 
 * This demonstrates how to use server actions in Server Components
 * for initial data loading
 */

import { listInventory, listSuppliers } from "@/actions";
import { DataTable, type Column } from "@/components/data/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function InventoryServerPage() {
  // Load data on the server
  const inventoryResult = await listInventory({ is_active: true });
  const suppliersResult = await listSuppliers({ is_active: true });

  // Handle errors
  if (!inventoryResult.success) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        Error loading inventory: {inventoryResult.error}
      </div>
    );
  }

  if (!suppliersResult.success) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        Error loading suppliers: {suppliersResult.error}
      </div>
    );
  }

  const inventoryColumns: Column<any>[] = [
    { key: "name", header: "Name" },
    { key: "quantity", header: "Quantity" },
    { key: "unit", header: "Unit" },
    { key: "reorder_level", header: "Reorder Level" },
  ];

  const supplierColumns: Column<any>[] = [
    { key: "name", header: "Name" },
    { key: "contact_person", header: "Contact" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Card */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={inventoryResult.data}
              columns={inventoryColumns}
              emptyMessage="No inventory items found"
            />
          </CardContent>
        </Card>

        {/* Suppliers Card */}
        <Card>
          <CardHeader>
            <CardTitle>Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={suppliersResult.data}
              columns={supplierColumns}
              emptyMessage="No suppliers found"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
