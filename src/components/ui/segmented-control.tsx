"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: {
    value: string;
    label: string;
    icon?: ReactNode;
  }[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps) {
  const sizeClasses = {
    sm: "h-9 text-sm gap-1 p-1",
    md: "h-11 text-sm gap-1.5 p-1",
    lg: "h-12 text-base gap-2 p-1.5",
  };

  const buttonSizeClasses = {
    sm: "px-3",
    md: "px-4",
    lg: "px-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl bg-card border border-border",
        sizeClasses[size],
        className
      )}
      role="tablist"
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            buttonSizeClasses[size],
            value === option.value
              ? "bg-foreground text-background shadow-sm"
              : "text-foreground-muted hover:text-foreground"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

interface FilterChipsProps {
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
}

export function FilterChips({
  options,
  value,
  onChange,
  multiple = false,
  className,
}: FilterChipsProps) {
  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleClick = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        className
      )}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isSelected(option.value)
              ? "bg-foreground text-background"
              : "bg-card border border-border text-foreground-muted hover:text-foreground hover:border-border-focus"
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                isSelected(option.value)
                  ? "bg-background/20 text-background"
                  : "bg-muted text-foreground-muted"
              )}
            >
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
