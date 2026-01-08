"use client";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ATJ-ERP. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="/help" className="hover:text-foreground transition-colors">
            Help
          </a>
          <a href="/settings" className="hover:text-foreground transition-colors">
            Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
