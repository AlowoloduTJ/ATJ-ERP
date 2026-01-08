"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  description,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export function FormInput({
  label,
  error,
  required,
  description,
  className,
  ...props
}: FormInputProps) {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      description={description}
    >
      <Input
        className={cn(error && "border-destructive", className)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
    </FormField>
  );
}

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export function FormTextarea({
  label,
  error,
  required,
  description,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      description={description}
    >
      <Textarea
        className={cn(error && "border-destructive", className)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
    </FormField>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.ComponentProps<typeof Select>, "children"> {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function FormSelect({
  label,
  error,
  required,
  description,
  options,
  placeholder = "Select an option",
  className,
  ...props
}: FormSelectProps) {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      description={description}
    >
      <Select aria-invalid={error ? "true" : "false"} {...props}>
        <SelectTrigger
          className={cn(error && "border-destructive", className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
