"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  MobileHeader,
  BottomNav,
  Sidebar,
  DesktopHeader,
} from "./navigation";

interface AppShellProps {
  children: ReactNode;
  /** Page title for mobile header */
  title?: string;
  /** Show back button instead of logo */
  showBack?: boolean;
  /** Callback when back button is clicked */
  onBack?: () => void;
  /** Custom actions for mobile header */
  headerActions?: ReactNode;
  /** Make header transparent (for hero sections) */
  transparentHeader?: boolean;
  /** Hide bottom navigation */
  hideBottomNav?: boolean;
  /** Additional classes for main content */
  className?: string;
}

export function AppShell({
  children,
  title,
  showBack,
  onBack,
  headerActions,
  transparentHeader = false,
  hideBottomNav = false,
  className,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Header */}
      <DesktopHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mobile Header */}
      <div className="lg:hidden">
        <MobileHeader
          title={title}
          showBack={showBack}
          onBack={onBack}
          actions={headerActions}
          transparent={transparentHeader}
        />
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 lg:pl-0",
          sidebarOpen && "lg:pl-64",
          !hideBottomNav && "pb-20 lg:pb-0",
          className
        )}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {!hideBottomNav && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}
    </div>
  );
}

interface PageContainerProps {
  children: ReactNode;
  /** Maximum width variant */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Additional padding */
  padded?: boolean;
  /** Additional classes */
  className?: string;
}

export function PageContainer({
  children,
  size = "lg",
  padded = true,
  className,
}: PageContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        padded && "px-4 py-6 lg:px-6 lg:py-8",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  /** Section title */
  title?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Action button/link for the section */
  action?: ReactNode;
  /** Additional classes */
  className?: string;
}

export function Section({
  children,
  title,
  subtitle,
  action,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || subtitle || action) && (
        <div className="flex items-end justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-heading-lg text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-body-sm text-foreground-muted mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

interface HeroSectionProps {
  children?: ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Overlay intensity (0-100) */
  overlayIntensity?: number;
  /** Hero height */
  height?: "sm" | "md" | "lg" | "full";
  /** Additional classes */
  className?: string;
}

export function HeroSection({
  children,
  backgroundImage,
  overlayIntensity = 60,
  height = "md",
  className,
}: HeroSectionProps) {
  const heightClasses = {
    sm: "min-h-[200px]",
    md: "min-h-[300px]",
    lg: "min-h-[400px]",
    full: "min-h-[100vh]",
  };

  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden",
        heightClasses[height],
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--background) 0%, rgba(9, 9, 11, ${overlayIntensity / 100}) 50%, rgba(9, 9, 11, 0.3) 100%)`,
        }}
      />

      {/* Cinematic glow effect */}
      <div className="absolute inset-0 gradient-cinematic pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
