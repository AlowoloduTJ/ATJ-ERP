/**
 * Example: Using Server Actions in Client Component
 * 
 * This demonstrates how to use server actions for CRUD operations
 */

"use client";

import { useState, useTransition, useEffect } from "react";
import { createInventory, listInventory, updateInventory, deleteInventory } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormInput } from "@/components/forms/FormField";
import { DataTable, type Column } from "@/components/data/DataTable";

interface InventoryItem extends Record<string, unknown> {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorder_level: number;
  is_active: boolean;
}

export function InventoryExample() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Load inventory list
  async function loadInventory() {
    setLoading(true);
    setError(null);

    const result = await listInventory({ is_active: true });

    if (result.success) {
      setInventory(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  // Create new inventory item
  async function handleCreate(formData: FormData) {
    startTransition(async () => {
      setError(null);

      const result = await createInventory({
        name: formData.get("name") as string,
        quantity: Number(formData.get("quantity")),
        unit: formData.get("unit") as string,
        reorder_level: Number(formData.get("reorder_level")) || 0,
      });

      if (result.success) {
        // Reload inventory list
        await loadInventory();
        // Reset form
        (document.getElementById("create-form") as HTMLFormElement)?.reset();
      } else {
        setError(result.error);
      }
    });
  }

  // Update inventory item
  async function handleUpdate(id: string, updates: { name?: string; quantity?: number }) {
    startTransition(async () => {
      setError(null);

      const result = await updateInventory(id, updates);

      if (result.success) {
        await loadInventory();
      } else {
        setError(result.error);
      }
    });
  }

  // Delete inventory item
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    startTransition(async () => {
      setError(null);

      const result = await deleteInventory(id);

      if (result.success) {
        await loadInventory();
      } else {
        setError(result.error);
      }
    });
  }

  // Load on mount
  useEffect(() => {
    loadInventory();
  }, []);

  const columns: Column<InventoryItem>[] = [
    { key: "name", header: "Name" },
    { key: "quantity", header: "Quantity" },
    { key: "unit", header: "Unit" },
    { key: "reorder_level", header: "Reorder Level" },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleUpdate(item.id, { quantity: item.quantity + 10 })}
            disabled={isPending}
          >
            +10
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(item.id)}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Create Form */}
      <form id="create-form" action={handleCreate} className="space-y-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Add New Inventory Item</h2>
        
        <FormInput
          name="name"
          label="Item Name"
          required
          placeholder="Enter item name"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="quantity"
            label="Quantity"
            type="number"
            required
            placeholder="0"
          />
          <FormInput
            name="unit"
            label="Unit"
            required
            placeholder="kg, pcs, etc."
          />
        </div>
        
        <FormInput
          name="reorder_level"
          label="Reorder Level"
          type="number"
          placeholder="0"
        />
        
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Inventory Item"}
        </Button>
      </form>

      {/* Inventory List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Inventory List</h2>
          <Button onClick={loadInventory} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {loading ? (
          <div>Loading inventory...</div>
        ) : (
          <DataTable data={inventory} columns={columns} />
        )}
      </div>
    </div>
  );
}
