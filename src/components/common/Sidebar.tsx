"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
  icon?: string;
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Warehouse", href: "/warehouse" },
  { title: "Production", href: "/production" },
  { title: "Ledger", href: "/ledger" },
  { title: "HR", href: "/hr" },
  { title: "Audit", href: "/audit" },
  { title: "Admin", href: "/admin" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background">
      <nav className="space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
