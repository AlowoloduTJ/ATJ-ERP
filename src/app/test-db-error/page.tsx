"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestDbErrorPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function testConnection() {
    setLoading(true);
    setError("");
    
    try {
      // Test 1: Check if we can call a server action
      const response = await fetch("/api/test-connection", {
        method: "GET",
      });
      
      if (!response.ok) {
        const text = await response.text();
        setError(`HTTP ${response.status}: ${text}`);
        return;
      }
      
      const data = await response.json();
      setError(`Success: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Error Diagnostic</h1>
        <p className="text-muted-foreground">
          Test connection via API route instead of server action
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Connection"}
          </Button>

          {error && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Result:</p>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-auto whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
