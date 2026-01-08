"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  onPrint?: () => void;
}

export default function PrintButton({ onPrint }: PrintButtonProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <Button variant="outline" onClick={handlePrint}>
      <Printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  );
}
