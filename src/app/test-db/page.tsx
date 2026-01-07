/**
 * Database Connection Test Page
 * 
 * This page tests:
 * - Database connection
 * - Reading data
 * - Creating data
 * - Data persistence
 */

"use client";

import { useState, useEffect, useTransition } from "react";
import { testCreateSupplier, testListSuppliers, testConnection } from "@/actions/test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormInput } from "@/components/forms/FormField";
import { DataTable, type Column } from "@/components/data/DataTable";
import { Badge } from "@/components/ui/badge";

interface Supplier extends Record<string, unknown> {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string;
}

export default function TestDatabasePage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error">("checking");

  // Load suppliers on mount
  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    setError(null);
    setConnectionStatus("checking");

    try {
      // First test connection
      const connectionResult = await testConnection();
      
      if (!connectionResult.success) {
        setError(connectionResult.error);
        setConnectionStatus("error");
        setLoading(false);
        return;
      }

      setConnectionStatus(connectionResult.data.connected ? "connected" : "error");
      
      if (!connectionResult.data.connected) {
        setError(connectionResult.data.message);
        setLoading(false);
        return;
      }

      // Then load suppliers
      const result = await testListSuppliers();

      if (result.success) {
        setSuppliers(result.data);
        setSuccess(`Successfully loaded ${result.data.length} supplier(s)`);
      } else {
        setError(`Failed to load suppliers: ${result.error}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Connection error: ${message}`);
      setConnectionStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(formData: FormData) {
    startTransition(async () => {
      setError(null);
      setSuccess(null);

      try {
        const result = await testCreateSupplier({
          name: formData.get("name") as string,
          contact_person: formData.get("contact_person") as string || undefined,
          email: formData.get("email") as string || undefined,
        });

        if (result.success) {
          setSuccess(`Supplier created successfully! ID: ${result.data.id}`);
          // Reset form
          (document.getElementById("create-supplier-form") as HTMLFormElement)?.reset();
          // Reload suppliers to show new data
          await loadSuppliers();
        } else {
          setError(`Failed to create supplier: ${result.error}`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(`Error: ${message}`);
      }
    });
  }

  const columns: Column<Supplier>[] = [
    { key: "name", header: "Name" },
    { key: "contact_person", header: "Contact Person" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "is_active",
      header: "Status",
      render: (item) => (
        <Badge variant={item.is_active ? "default" : "secondary"}>
          {item.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Database Connection Test</h1>
        <p className="text-muted-foreground">
          Test your Supabase database connection and CRUD operations
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {connectionStatus === "checking" && (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>Checking connection...</span>
              </>
            )}
            {connectionStatus === "connected" && (
              <>
                <div className="h-4 w-4 rounded-full bg-green-500" />
                <span className="text-green-600 font-medium">Connected to database</span>
              </>
            )}
            {connectionStatus === "error" && (
              <>
                <div className="h-4 w-4 rounded-full bg-red-500" />
                <span className="text-red-600 font-medium">Connection failed</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">
              <strong>Error:</strong> {error}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Check your environment variables and Supabase connection settings.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {success && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="text-green-600">
              <strong>Success:</strong> {success}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Test Supplier</CardTitle>
          <CardDescription>
            Create a new supplier to test database write operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="create-supplier-form" action={handleCreate} className="space-y-4">
            <FormInput
              name="name"
              label="Supplier Name"
              required
              placeholder="Enter supplier name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="contact_person"
                label="Contact Person"
                placeholder="Contact person name"
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="supplier@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="phone"
                label="Phone"
                placeholder="+1234567890"
              />
              <FormInput
                name="address"
                label="Address"
                placeholder="Supplier address"
              />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create Supplier"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Suppliers List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Suppliers List</CardTitle>
              <CardDescription>
                Data loaded from database. Refresh the page to verify persistence.
              </CardDescription>
            </div>
            <Button onClick={loadSuppliers} disabled={loading} variant="outline">
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : suppliers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No suppliers found. Create one above to test the database connection.
            </div>
          ) : (
            <DataTable data={suppliers} columns={columns} />
          )}
        </CardContent>
      </Card>

      {/* Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <p className="font-medium">1. Check Connection Status</p>
            <p className="text-sm text-muted-foreground">
              The status card should show "Connected to database" if your environment variables are set correctly.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">2. Create a Test Supplier</p>
            <p className="text-sm text-muted-foreground">
              Fill in the form and click "Create Supplier". You should see a success message.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">3. Verify Data Persistence</p>
            <p className="text-sm text-muted-foreground">
              Refresh the page (F5) or click the "Refresh" button. The supplier you created should still be there.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">4. Check Supabase Dashboard</p>
            <p className="text-sm text-muted-foreground">
              Go to your Supabase dashboard and verify the data appears in the "suppliers" table.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
