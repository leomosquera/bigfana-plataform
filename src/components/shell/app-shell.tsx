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
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  headerActions?: ReactNode;
  transparentHeader?: boolean;
  hideBottomNav?: boolean;
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
    closeMobile,
  } = useSidebarState();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={isCollapsed} 
          isMobileOpen={false}
          onToggle={toggle}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Mobile Sidebar */}
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

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 ease-out",
          isHydrated && !isCollapsed ? "lg:pl-64" : "lg:pl-[72px]",
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
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padded?: boolean;
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
  title?: string;
  subtitle?: string;
  action?: ReactNode;
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
  backgroundImage?: string;
  overlayIntensity?: number;
  height?: "sm" | "md" | "lg" | "full";
  className?: string;
}

export function HeroSection({
  children,
  backgroundImage,
  overlayIntensity = 70,
  height = "md",
  className,
}: HeroSectionProps) {
  const heightClasses = {
    sm: "min-h-[260px]",
    md: "min-h-[380px]",
    lg: "min-h-[500px]",
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
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, var(--background) 0%, transparent 60%),
            linear-gradient(to top, rgba(2, 2, 3, ${overlayIntensity / 100}) 0%, rgba(2, 2, 3, 0.4) 60%, rgba(2, 2, 3, 0.2) 100%)
          `,
        }}
      />

      {/* Stadium atmospheric glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 140% 90% at 50% -30%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 90% 10%, rgba(220, 38, 38, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse 60% 50% at 5% 90%, rgba(220, 38, 38, 0.03) 0%, transparent 35%)
          `,
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(2, 2, 3, 0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
