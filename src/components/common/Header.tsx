"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">ATJ-ERP</span>
          </a>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <a href="/dashboard">Dashboard</a>
          <a href="/warehouse">Warehouse</a>
          <a href="/production">Production</a>
          <a href="/ledger">Ledger</a>
          <a href="/hr">HR</a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Badge variant="outline">Admin</Badge>
          <Button variant="ghost" size="sm">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
}
