"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            Coming Soon
          </Badge>
          
          {/* Magic UI Hero - Animated Gradient Text */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-pulse">
              Streamline Your Business Operations
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            with Modern ERP Solutions
          </p>
        </div>
      </section>

      <div className="border-t" />

      {/* Problem & Audience Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">
                The Challenge for Growing Businesses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Small and medium-sized businesses struggle with fragmented business processes, 
                disconnected data across departments, and manual workflows that slow down growth. 
                Without a unified system, companies waste time on data entry, face inventory 
                management challenges, struggle with financial reporting, and miss opportunities 
                for data-driven decision making.
              </p>
              <div className="pt-4">
                <p className="font-semibold mb-2">Core Audience:</p>
                <p className="text-muted-foreground">
                  Small to medium-sized businesses (SMBs) across various industries who need an 
                  affordable, scalable ERP solution that integrates inventory management, accounting, 
                  sales, and operations into one cohesive platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t" />

      {/* Solution Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">
                Your Complete Business Solution
              </CardTitle>
              <CardDescription className="text-base">
                ATJ-ERP provides a comprehensive, cloud-based Enterprise Resource Planning system 
                designed specifically for growing businesses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Our platform integrates all critical business functions—from inventory and supply 
                chain management to financial accounting, sales, and customer relationship 
                management—into a single, intuitive interface. With real-time data synchronization, 
                automated workflows, and powerful analytics, businesses can make informed decisions 
                faster, reduce operational costs, and scale efficiently.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Unified Data</p>
                    <p className="text-sm text-muted-foreground">
                      All departments connected in one platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Real-Time Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      Live inventory and financial insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Automated Workflows</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce manual tasks and errors
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Scalable & Affordable</p>
                    <p className="text-sm text-muted-foreground">
                      Grows with your business, priced for SMBs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t" />

      {/* Call to Action Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl">
                Get Early Access
              </CardTitle>
              <CardDescription className="text-base">
                Be among the first to experience ATJ-ERP. Sign up to receive updates and early 
                access when we launch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Form submission will be handled later
                  const formData = new FormData(e.currentTarget);
                  console.log("Email:", formData.get("email"));
                }}
              >
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    aria-label="Email address for early access"
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  size="lg"
                >
                  Notify Me When Available
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ATJ-ERP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
