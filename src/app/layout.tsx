import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Get Clerk publishable key (may be undefined during build)
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATJ-ERP | Streamline Your Business Operations",
  description: "Modern ERP solutions for small and medium-sized businesses. Integrate inventory, accounting, sales, and operations into one cohesive platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only provide publishableKey if available (prevents build-time errors)
  // In production, this will always be set via environment variables
  // If key is missing, ClerkProvider will handle it gracefully at runtime
  if (!clerkPublishableKey) {
    // During build, if key is missing, render without ClerkProvider
    // This prevents build-time errors while allowing runtime initialization
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
