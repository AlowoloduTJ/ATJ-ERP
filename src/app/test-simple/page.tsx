"use client";

import { useState } from "react";
import { testSimple } from "@/actions/test-simple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestSimplePage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function test() {
    setLoading(true);
    try {
      const r = await testSimple();
      setResult(JSON.stringify(r, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Simple Server Action Test</h1>
        <p className="text-muted-foreground">
          Test if server actions are working without Supabase
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Server Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={test} disabled={loading}>
            {loading ? "Testing..." : "Test Server Action"}
          </Button>

          {result && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Result:</p>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                {result}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What This Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Server actions are configured correctly</li>
            <li>Next.js can execute server-side code</li>
            <li>No Supabase dependency (isolates the issue)</li>
          </ul>
          <p className="mt-4 text-sm">
            <strong>If this works:</strong> The issue is with Supabase connection
            <br />
            <strong>If this fails:</strong> The issue is with server actions setup
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
