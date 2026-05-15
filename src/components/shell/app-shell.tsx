"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  MobileHeader,
  BottomNav,
  Sidebar,
  DesktopHeader,
  useSidebarState,
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
  const {
    isCollapsed,
    isMobileOpen,
    isHydrated,
    toggle,
    openMobile,
    closeMobile,
  } = useSidebarState();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar - always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={isCollapsed} 
          isMobileOpen={false}
          onToggle={toggle}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Mobile Sidebar - overlay drawer */}
      <div className="lg:hidden">
        <Sidebar 
          isCollapsed={false} 
          isMobileOpen={isMobileOpen}
          onToggle={toggle}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Desktop Header */}
      <DesktopHeader 
        isCollapsed={isCollapsed} 
        onMenuClick={toggle} 
      />

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

      {/* Main Content - adjusts based on sidebar state */}
      <main
        className={cn(
          "transition-all duration-300 ease-out",
          // Desktop: offset by sidebar width
          isHydrated && !isCollapsed ? "lg:pl-64" : "lg:pl-[72px]",
          // Mobile: bottom padding for nav
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
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        padded && "px-4 py-8 lg:px-8 lg:py-12",
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
    <section className={cn("space-y-6", className)}>
      {(title || subtitle || action) && (
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h2 className="text-heading-lg text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-body-sm text-foreground-muted">{subtitle}</p>
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
    sm: "min-h-[240px]",
    md: "min-h-[360px]",
    lg: "min-h-[480px]",
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
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Premium multi-layer gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, var(--background) 0%, transparent 40%),
            linear-gradient(to top, rgba(5, 5, 6, ${overlayIntensity / 100}) 0%, rgba(5, 5, 6, 0.4) 60%, rgba(5, 5, 6, 0.2) 100%)
          `,
        }}
      />

      {/* Cinematic red atmospheric glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 20% 80%, rgba(239, 68, 68, 0.04) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 6, 0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
