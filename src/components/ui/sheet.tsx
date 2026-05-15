"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  children,
  title,
  description,
  className,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sheet-title" : undefined}
        aria-describedby={description ? "sheet-description" : undefined}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border",
          "max-h-[90vh] animate-slide-up safe-bottom",
          className
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between px-6 pb-4">
            <div className="flex flex-col gap-1">
              {title && (
                <h2 id="sheet-title" className="text-heading-md text-card-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p id="sheet-description" className="text-body-sm text-foreground-muted">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Modal({
  open,
  onClose,
  children,
  title,
  description,
  size = "md",
  className,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        className={cn(
          "relative z-50 w-full rounded-2xl bg-card border border-border p-6",
          "animate-scale-in",
          sizeClasses[size],
          className
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        {(title || description) && (
          <div className="mb-6 pr-8">
            {title && (
              <h2 id="modal-title" className="text-heading-lg text-card-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-description" className="mt-1.5 text-body-sm text-foreground-muted">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
