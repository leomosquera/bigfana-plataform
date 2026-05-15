import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label text-foreground"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-12 w-full rounded-xl border border-border bg-input px-4 text-body-md text-foreground placeholder:text-foreground-subtle transition-all duration-200",
            "focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:ring-destructive/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-caption text-destructive">{error}</p>
        )}
        {hint && !error && (
          <p className="text-caption text-foreground-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
