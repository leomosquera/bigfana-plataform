import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-2xl transition-all duration-300 ease-out overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-card border border-border/40",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_2px_8px_rgba(0,0,0,0.2)]",
        ],
        elevated: [
          "bg-card border border-border/40",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.025)_inset,0_16px_48px_rgba(0,0,0,0.3),0_6px_16px_rgba(0,0,0,0.2)]",
        ],
        ghost: "bg-transparent",
        glass: [
          "bg-card/60 border border-border/30",
          "backdrop-blur-2xl",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.025)_inset,0_8px_32px_rgba(0,0,0,0.25)]",
        ],
        interactive: [
          "bg-card border border-border/40",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_2px_8px_rgba(0,0,0,0.2)]",
          "hover:bg-card-hover hover:border-border-focus/40",
          "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.035)_inset,0_20px_60px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.25)]",
          "hover:-translate-y-1",
          "cursor-pointer active:scale-[0.995] active:translate-y-0",
        ],
        highlight: [
          "bg-card border border-primary/12",
          "shadow-[0_0_0_1px_rgba(220,38,38,0.04)_inset,0_8px_40px_rgba(220,38,38,0.06),0_4px_16px_rgba(0,0,0,0.2)]",
          "hover:border-primary/20",
          "hover:shadow-[0_0_0_1px_rgba(220,38,38,0.08)_inset,0_20px_60px_rgba(220,38,38,0.1),0_8px_24px_rgba(0,0,0,0.25)]",
          "hover:-translate-y-0.5",
        ],
        premium: [
          "bg-gradient-to-b from-card to-card/80",
          "border border-border/30",
          "backdrop-blur-xl",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_1px_0_0_rgba(255,255,255,0.025)_inset,0_16px_48px_rgba(0,0,0,0.3),0_6px_16px_rgba(0,0,0,0.2)]",
          "hover:border-border-focus/40",
          "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_72px_rgba(0,0,0,0.4),0_12px_32px_rgba(0,0,0,0.25)]",
          "hover:-translate-y-1",
        ],
        featured: [
          "bg-gradient-to-br from-card via-card to-primary/[0.03]",
          "border border-primary/15",
          "shadow-[0_0_0_1px_rgba(220,38,38,0.06)_inset,0_0_100px_rgba(220,38,38,0.04),0_16px_48px_rgba(0,0,0,0.3)]",
          "hover:border-primary/25",
          "hover:shadow-[0_0_0_1px_rgba(220,38,38,0.1)_inset,0_0_120px_rgba(220,38,38,0.06),0_24px_72px_rgba(0,0,0,0.4)]",
          "hover:-translate-y-1",
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
      className={cn("flex flex-col gap-1.5", className)}
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
