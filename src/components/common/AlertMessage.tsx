"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface AlertMessageProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({
  type = "info",
  message,
  onClose,
}: AlertMessageProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  const Icon = icons[type];

  return (
    <Card className={`p-4 ${colors[type]}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <p className="flex-1">{message}</p>
        {onClose && (
          <button onClick={onClose} className="ml-auto">
            ×
          </button>
        )}
      </div>
    </Card>
  );
}
