"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavigationItem {
  title: string;
  href: string;
  badge?: string;
}

interface NavigationProps {
  logo?: React.ReactNode;
  items: NavigationItem[];
  userBadge?: string;
  userMenu?: React.ReactNode;
  className?: string;
}

export default function Navigation({
  logo,
  items,
  userBadge,
  userMenu,
  className,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          {logo || (
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-lg">ATJ-ERP</span>
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.title}
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {userBadge && (
            <Badge variant="outline" className="hidden sm:inline-flex">
              {userBadge}
            </Badge>
          )}
          {userMenu || (
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
