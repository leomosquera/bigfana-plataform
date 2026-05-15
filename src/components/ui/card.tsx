import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-2xl transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: [
          "bg-card/80 border border-border",
          "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        ],
        elevated: [
          "bg-card border border-border",
          "shadow-[0_8px_24px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.06)]",
        ],
        ghost: "bg-transparent",
        glass: [
          "bg-card/60 border border-border/50",
          "backdrop-blur-xl",
          "shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
        ],
        interactive: [
          "bg-card/80 border border-border",
          "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          "hover:bg-card hover:border-border-focus",
          "hover:shadow-[0_12px_32px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.08)]",
          "hover:-translate-y-0.5",
          "cursor-pointer active:scale-[0.99] active:translate-y-0",
        ],
        highlight: [
          "bg-card/80 border border-primary/15",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)]",
          "hover:border-primary/25",
          "hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
        ],
        premium: [
          "bg-gradient-to-br from-card to-card/60",
          "border border-border/50",
          "backdrop-blur-xl",
          "shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.02)_inset]",
          "hover:shadow-[0_16px_48px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
          "hover:-translate-y-0.5",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-heading-md text-card-foreground", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-body-sm text-foreground-muted", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 pt-5", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
