"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { completeOnboarding } from "./actions";
import { Database, BarChart3, Zap } from "lucide-react";

/**
 * Onboarding Page (Client Component)
 * 
 * Displays 3 screens to introduce new users to ATJ-ERP:
 * 1. Welcome - Core value proposition
 * 2. Key Feature - Unified data management
 * 3. Get Started - Ready to begin
 * 
 * Users can navigate between screens, skip at any point, or complete onboarding.
 */
export default function OnboardingPage() {
  const { getToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);

  /**
   * Handle onboarding completion
   * 
   * Critical JWT Refresh Pattern:
   * 1. Update metadata via server action
   * 2. Force JWT refresh (skipCache: true)
   * 3. Hard redirect (window.location.href) to ensure middleware sees fresh JWT
   * 
   * Without this pattern, infinite redirect loops occur because the old JWT
   * doesn't include the updated onboardingComplete status.
   */
  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      // Step 1: Update metadata via server action
      const result = await completeOnboarding();

      if ("error" in result) {
        console.error("Error completing onboarding:", result.error);
        alert(`Error: ${result.error}`);
        setIsCompleting(false);
        return;
      }

      // Step 2: Force JWT refresh (CRITICAL!)
      // skipCache: true forces Clerk to fetch a fresh token from server
      await getToken({ skipCache: true });

      // Step 3: Hard redirect to ensure middleware sees fresh JWT
      // Use window.location.href, NOT Next.js router.push()
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error completing onboarding:", error);
      alert("Something went wrong. Please try again.");
      setIsCompleting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            Step {currentStep} of 3
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full transition-colors ${
                  step <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Screen 1: Welcome */}
        {currentStep === 1 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Welcome to ATJ-ERP</CardTitle>
              <CardDescription className="text-base">
                Your complete business management solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Streamline your business operations with modern ERP solutions. 
                Integrate inventory, accounting, sales, and operations into one 
                cohesive platform designed for growing businesses.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleNext} size="lg">
                  Next
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="lg">
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Screen 2: Key Feature */}
        {currentStep === 2 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Unified Data Management</CardTitle>
              <CardDescription className="text-base">
                All your business data in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Connect all departments—warehouse, production, accounting, and HR—with 
                real-time data synchronization. Make informed decisions faster with 
                unified insights across your entire business.
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">💡 Tip</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your data updates in real-time across all modules, so everyone 
                  always has the latest information.
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleBack} variant="ghost" size="lg">
                  Back
                </Button>
                <Button onClick={handleNext} size="lg">
                  Next
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="lg">
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Screen 3: Get Started */}
        {currentStep === 3 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-base">
                Start managing your business operations today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                You're all set! Start by exploring your dashboard, managing inventory, 
                or creating your first production order. Our intuitive interface makes 
                it easy to get started.
              </p>
              <div className="rounded-lg border bg-primary/5 p-4">
                <p className="text-sm font-medium">🚀 Quick Start</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Begin by setting up your inventory items and suppliers. 
                  Then create your first production order to see the system in action.
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleBack} variant="ghost" size="lg">
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  disabled={isCompleting}
                >
                  {isCompleting ? "Loading..." : "Get Started"}
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  size="lg"
                  disabled={isCompleting}
                >
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
