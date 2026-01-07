/**
 * Supabase Connection Helper Page
 * 
 * This page helps you verify your Supabase connection
 * and provides instructions if connection fails
 */

"use client";

import { useState, useEffect } from "react";
import { testConnection } from "@/actions/test";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConnectPage() {
  const [status, setStatus] = useState<"checking" | "connected" | "error" | "not-configured">("checking");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    setLoading(true);
    setStatus("checking");

    try {
      const result = await testConnection();

      if (result.success) {
        if (result.data.connected) {
          setStatus("connected");
          setMessage(result.data.message);
        } else {
          setStatus("error");
          setMessage(result.data.message);
        }
      } else {
        setStatus("error");
        setMessage(result.error);
      }
    } catch (error) {
      setStatus("not-configured");
      setMessage(
        "Environment variables not configured. Please create .env.local with your Supabase credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Connect to Supabase</h1>
        <p className="text-muted-foreground">
          Verify your connection to the "ATJ-ERP" Supabase project
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
          <CardDescription>Current connection status to Supabase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            {status === "checking" && (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>Checking connection...</span>
              </>
            )}
            {status === "connected" && (
              <>
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <span className="text-green-600 font-medium">Connected to Supabase</span>
                <Badge variant="default">Success</Badge>
              </>
            )}
            {status === "error" && (
              <>
                <div className="h-5 w-5 rounded-full bg-yellow-500" />
                <span className="text-yellow-600 font-medium">Connection Issue</span>
                <Badge variant="secondary">Warning</Badge>
              </>
            )}
            {status === "not-configured" && (
              <>
                <div className="h-5 w-5 rounded-full bg-red-500" />
                <span className="text-red-600 font-medium">Not Configured</span>
                <Badge variant="destructive">Error</Badge>
              </>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded-md ${
              status === "connected" 
                ? "bg-green-50 text-green-800 border border-green-200"
                : status === "error"
                ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              <p className="font-medium mb-1">Status Message:</p>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <Button onClick={checkConnection} disabled={loading} variant="outline">
            {loading ? "Checking..." : "Refresh Connection"}
          </Button>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      {status !== "connected" && (
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>
              Follow these steps to connect to your Supabase project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Step 1: Get Your Supabase Credentials</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Go to <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://app.supabase.com</a></li>
                <li>Select your <strong>"ATJ-ERP"</strong> project</li>
                <li>Navigate to <strong>Settings</strong> → <strong>API</strong></li>
                <li>Copy these values:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Project URL</li>
                    <li>anon public key</li>
                    <li>service_role key</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Step 2: Create .env.local File</h3>
              <p className="text-sm text-muted-foreground">
                Create a file named <code className="bg-muted px-1 rounded">.env.local</code> in the project root with:
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_API_URL=/api`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Step 3: Restart Dev Server</h3>
              <p className="text-sm text-muted-foreground">
                After creating <code className="bg-muted px-1 rounded">.env.local</code>, restart your development server:
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm">
{`# Stop the server (Ctrl+C)
# Then restart:
npm run dev`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Step 4: Test Connection</h3>
              <p className="text-sm text-muted-foreground">
                Visit the test page to verify connection:
              </p>
              <Button asChild variant="outline">
                <a href="/test-db">Go to Test Page</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {status === "connected" && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600">✅ Successfully Connected!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your Next.js app is now connected to your Supabase "ATJ-ERP" project.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <a href="/test-db">Test Database Operations</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer">
                Supabase Dashboard
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/test-db">Database Test Page</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/">Home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
