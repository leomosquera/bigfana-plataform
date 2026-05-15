"use client";

import * as React from "react";
import { useEffect, useRef, type ReactNode } from "react";
import { X, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ============================================
// BASE SHEET
// ============================================

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

function Sheet({
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

// ============================================
// MODAL
// ============================================

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Modal({
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

// ============================================
// ACTION SHEET
// ============================================

interface ActionSheetAction {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  actions: ActionSheetAction[];
  cancelLabel?: string;
}

/**
 * Action Sheet - iOS-style action menu
 */
function ActionSheet({
  open,
  onClose,
  title,
  actions,
  cancelLabel = "Cancel",
}: ActionSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-4 bottom-4 z-50 animate-slide-up safe-bottom">
        {/* Actions */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          {title && (
            <div className="px-4 py-3 border-b border-border/40">
              <p className="text-caption text-center text-foreground-muted">{title}</p>
            </div>
          )}
          {actions.map((action, index) => (
            <button
              key={action.id}
              onClick={() => {
                action.onSelect();
                onClose();
              }}
              disabled={action.disabled}
              className={cn(
                "flex w-full items-center justify-center gap-3 px-4 py-4 text-body-md font-medium transition-colors",
                "hover:bg-card-hover active:bg-muted",
                index < actions.length - 1 && "border-b border-border/40",
                action.destructive ? "text-destructive" : "text-foreground",
                action.disabled && "opacity-50 pointer-events-none"
              )}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-2xl bg-card border border-border px-4 py-4 text-body-md font-semibold text-foreground hover:bg-card-hover transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}

// ============================================
// SNAP SHEET (25/50/100%)
// ============================================

type SnapPoint = "quarter" | "half" | "full";

interface SnapSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  initialSnap?: SnapPoint;
  enableDrag?: boolean;
}

/**
 * Snap Sheet - Multi-height draggable bottom sheet
 */
function SnapSheet({
  open,
  onClose,
  children,
  title,
  description,
  initialSnap = "half",
  enableDrag = true,
}: SnapSheetProps) {
  const [currentSnap, setCurrentSnap] = React.useState<SnapPoint>(initialSnap);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (open) {
      setCurrentSnap(initialSnap);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialSnap]);

  const snapHeights: Record<SnapPoint, string> = {
    quarter: "25vh",
    half: "50vh",
    full: "90vh",
  };

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!enableDrag) return;
    startY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
  };

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!enableDrag) return;
    currentY.current = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 100) {
      // Dragged down
      if (currentSnap === "full") setCurrentSnap("half");
      else if (currentSnap === "half") setCurrentSnap("quarter");
      else onClose();
    } else if (deltaY < -100) {
      // Dragged up
      if (currentSnap === "quarter") setCurrentSnap("half");
      else if (currentSnap === "half") setCurrentSnap("full");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border",
          "transition-all duration-300 ease-out safe-bottom"
        )}
        style={{ height: snapHeights[currentSnap] }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Snap indicators */}
        <div className="flex justify-center gap-1.5 pb-2">
          {(["quarter", "half", "full"] as SnapPoint[]).map((snap) => (
            <button
              key={snap}
              onClick={() => setCurrentSnap(snap)}
              className={cn(
                "h-1 rounded-full transition-all duration-200",
                currentSnap === snap ? "w-4 bg-primary" : "w-1 bg-foreground-subtle/30"
              )}
            />
          ))}
        </div>

        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between px-6 pb-4">
            <div className="flex flex-col gap-1">
              {title && (
                <h2 className="text-heading-md text-card-foreground">{title}</h2>
              )}
              {description && (
                <p className="text-body-sm text-foreground-muted">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
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

// ============================================
// DETAIL SHEET
// ============================================

interface DetailSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: ReactNode;
  actions?: ReactNode;
}

/**
 * Detail Sheet - Rich content detail view
 */
function DetailSheet({
  open,
  onClose,
  children,
  title,
  subtitle,
  image,
  badge,
  actions,
}: DetailSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border max-h-[90vh] animate-slide-up safe-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Hero Image */}
        {image && (
          <div className="relative h-40 mx-4 rounded-xl overflow-hidden bg-muted mb-4">
            <img src={image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            {badge && (
              <div className="absolute top-3 left-3">{badge}</div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between px-6 pb-4">
          <div>
            <h2 className="text-heading-lg text-card-foreground">{title}</h2>
            {subtitle && (
              <p className="text-body-sm text-foreground-muted mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 hide-scrollbar">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="px-6 py-4 border-t border-border/40 bg-card">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// MULTI-STEP SHEET
// ============================================

interface MultiStepSheetStep {
  id: string;
  title: string;
  content: ReactNode;
}

interface MultiStepSheetProps {
  open: boolean;
  onClose: () => void;
  steps: MultiStepSheetStep[];
  onComplete?: () => void;
}

/**
 * Multi-Step Sheet - Wizard-style bottom sheet
 */
function MultiStepSheet({
  open,
  onClose,
  steps,
  onComplete,
}: MultiStepSheetProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  React.useEffect(() => {
    if (open) setCurrentStep(0);
  }, [open]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
      onClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border max-h-[85vh] animate-slide-up safe-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Progress */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-foreground-muted">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-1.5">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  index <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Step Title */}
        <div className="px-6 pb-4">
          <h2 className="text-heading-md text-card-foreground">{step.title}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 hide-scrollbar">
          {step.content}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border/40 flex gap-3">
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {isLastStep ? "Complete" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMMERCE SHEET (Purchase Flow)
// ============================================

interface CommerceSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  image?: string;
  features?: string[];
  onPurchase: () => void;
  purchaseLabel?: string;
  loading?: boolean;
}

/**
 * Commerce Sheet - Product/ticket purchase flow
 */
function CommerceSheet({
  open,
  onClose,
  title,
  subtitle,
  price,
  originalPrice,
  image,
  features,
  onPurchase,
  purchaseLabel = "Purchase",
  loading,
}: CommerceSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border max-h-[85vh] animate-slide-up safe-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Image */}
        {image && (
          <div className="mx-6 h-48 rounded-xl overflow-hidden bg-muted mb-4">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Header */}
        <div className="px-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-heading-lg text-card-foreground">{title}</h2>
              {subtitle && (
                <p className="text-body-sm text-foreground-muted mt-1">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="px-6 pb-4 space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-success shrink-0" />
                <span className="text-body-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Purchase */}
        <div className="mt-auto px-6 py-4 border-t border-border/40 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-caption text-foreground-muted">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-display-md text-foreground">{price}</span>
                {originalPrice && (
                  <span className="text-body-sm text-foreground-subtle line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button 
            onClick={onPurchase} 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? "Processing..." : purchaseLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MATCH DETAILS SHEET
// ============================================

interface MatchDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  homeTeam: { name: string; logo?: string };
  awayTeam: { name: string; logo?: string };
  score?: { home: number; away: number };
  status: "upcoming" | "live" | "finished";
  date: string;
  time: string;
  venue?: string;
  competition?: string;
  onBuyTickets?: () => void;
  onSetReminder?: () => void;
  children?: ReactNode;
}

/**
 * Match Details Sheet - Full match information view
 */
function MatchDetailsSheet({
  open,
  onClose,
  homeTeam,
  awayTeam,
  score,
  status,
  date,
  time,
  venue,
  competition,
  onBuyTickets,
  onSetReminder,
  children,
}: MatchDetailsSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-card border-t border-border max-h-[90vh] animate-slide-up safe-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Match Header */}
        <div className="px-6 pb-6 pt-2">
          {/* Competition & Status */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {competition && (
              <span className="text-overline text-foreground-subtle">{competition}</span>
            )}
            {status === "live" && (
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                Live
              </span>
            )}
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-xl font-bold text-foreground-muted">
                {homeTeam.name.substring(0, 3)}
              </div>
              <span className="text-body-sm font-medium text-foreground text-center">
                {homeTeam.name}
              </span>
            </div>

            {/* Score/Time */}
            <div className="flex flex-col items-center gap-1 px-4">
              {score ? (
                <span className="text-display-lg text-foreground">
                  {score.home} - {score.away}
                </span>
              ) : (
                <span className="text-display-md text-foreground">{time}</span>
              )}
              <span className="text-caption text-foreground-muted">{date}</span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-xl font-bold text-foreground-muted">
                {awayTeam.name.substring(0, 3)}
              </div>
              <span className="text-body-sm font-medium text-foreground text-center">
                {awayTeam.name}
              </span>
            </div>
          </div>

          {/* Venue */}
          {venue && (
            <div className="flex items-center justify-center gap-1.5 mt-4 text-body-sm text-foreground-muted">
              <span>{venue}</span>
            </div>
          )}
        </div>

        {/* Content */}
        {children && (
          <div className="flex-1 overflow-y-auto px-6 hide-scrollbar border-t border-border/40 pt-4">
            {children}
          </div>
        )}

        {/* Actions */}
        {(onBuyTickets || onSetReminder) && (
          <div className="px-6 py-4 border-t border-border/40 flex gap-3">
            {status === "upcoming" && onSetReminder && (
              <Button variant="secondary" onClick={onSetReminder} className="flex-1">
                Set Reminder
              </Button>
            )}
            {status === "upcoming" && onBuyTickets && (
              <Button onClick={onBuyTickets} className="flex-1">
                Buy Tickets
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export {
  Sheet,
  Modal,
  ActionSheet,
  SnapSheet,
  DetailSheet,
  MultiStepSheet,
  CommerceSheet,
  MatchDetailsSheet,
  type ActionSheetAction,
  type MultiStepSheetStep,
};
