"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  Calendar,
  Users,
  User,
  Bell,
  Search,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: <Home className="h-[18px] w-[18px]" /> },
  { href: "/matches", label: "Matches", icon: <Trophy className="h-[18px] w-[18px]" /> },
  { href: "/events", label: "Events", icon: <Calendar className="h-[18px] w-[18px]" /> },
  { href: "/community", label: "Community", icon: <Users className="h-[18px] w-[18px]" /> },
  { href: "/profile", label: "Profile", icon: <User className="h-[18px] w-[18px]" /> },
];

const SIDEBAR_STORAGE_KEY = "bigfana-sidebar-collapsed";

// Custom hook for sidebar state with localStorage persistence
export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed));
    }
  }, [isCollapsed, isHydrated]);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const openMobile = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return {
    isCollapsed,
    isMobileOpen,
    isHydrated,
    toggle,
    openMobile,
    closeMobile,
    setIsCollapsed,
  };
}

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  transparent?: boolean;
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  actions,
  transparent = false,
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between px-4 safe-top",
        transparent
          ? "bg-transparent"
          : "glass-strong border-b border-border"
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {!showBack && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
              <span className="text-sm font-bold text-primary-foreground">BF</span>
            </div>
            {!title && (
              <span className="font-heading text-lg font-semibold text-foreground">
                BigFana
              </span>
            )}
          </Link>
        )}
        {title && (
          <h1 className="font-heading text-lg font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        {actions || (
          <>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border safe-bottom"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-foreground-subtle hover:text-foreground-muted"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={cn(
                  "transition-all duration-200",
                  isActive && "scale-105"
                )}
              >
                {item.icon}
              </span>
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-primary" : "text-foreground-subtle"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, onToggle, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    onCloseMobile();
  }, [pathname, onCloseMobile]);

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background-overlay transition-opacity duration-300 lg:hidden",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full transition-all duration-300 ease-out",
          // Mobile behavior: slide in/out as drawer
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop behavior: expand/collapse width
          isCollapsed ? "lg:w-[72px]" : "lg:w-64"
        )}
      >
        <div className={cn(
          "flex h-full flex-col",
          "bg-background-subtle/50 border-r border-border",
          "backdrop-blur-xl",
          // Mobile always full width
          "w-64 lg:w-full"
        )}>
          {/* Header */}
          <div className={cn(
            "flex h-16 items-center border-b border-border/50 shrink-0",
            isCollapsed ? "lg:justify-center lg:px-0" : "justify-between",
            "px-4"
          )}>
            <Link 
              href="/" 
              className={cn(
                "flex items-center gap-3 transition-all duration-200",
                isCollapsed && "lg:hidden"
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm shrink-0">
                <span className="text-sm font-bold text-primary-foreground">BF</span>
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">
                BigFana
              </span>
            </Link>
            
            {/* Collapsed state logo */}
            {isCollapsed && (
              <Link 
                href="/" 
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm"
              >
                <span className="text-sm font-bold text-primary-foreground">BF</span>
              </Link>
            )}

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3" role="navigation">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl font-medium transition-all duration-200",
                        isCollapsed ? "lg:justify-center lg:px-0 lg:py-3" : "px-3 py-2.5",
                        "px-3 py-2.5",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground-muted hover:text-foreground hover:bg-muted/50"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span className={cn(
                        "shrink-0 transition-transform duration-200",
                        isActive && "scale-105"
                      )}>
                        {item.icon}
                      </span>
                      <span className={cn(
                        "text-sm transition-all duration-200",
                        isCollapsed && "lg:hidden"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with toggle */}
          <div className="border-t border-border/50 p-3 shrink-0">
            {/* Desktop Toggle Button */}
            <button
              onClick={onToggle}
              className={cn(
                "hidden lg:flex items-center gap-3 w-full rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200",
                isCollapsed ? "justify-center p-3" : "px-3 py-2.5"
              )}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeft className="h-[18px] w-[18px]" />
              ) : (
                <>
                  <PanelLeftClose className="h-[18px] w-[18px]" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </button>

            {/* User section - hidden when collapsed on desktop */}
            <div className={cn(
              "flex items-center gap-3 mt-3",
              isCollapsed && "lg:hidden"
            )}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted shrink-0">
                <User className="h-4 w-4 text-foreground-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Guest</p>
                <p className="text-xs text-foreground-subtle">Sign in</p>
              </div>
            </div>

            {/* Collapsed user avatar */}
            {isCollapsed && (
              <div className="hidden lg:flex justify-center mt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-foreground-muted" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

interface DesktopHeaderProps {
  isCollapsed: boolean;
  onMenuClick: () => void;
}

export function DesktopHeader({ isCollapsed, onMenuClick }: DesktopHeaderProps) {
  return (
    <header className={cn(
      "hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between px-6 glass-strong border-b border-border transition-all duration-300",
      isCollapsed ? "lg:pl-[96px]" : "lg:pl-[280px]"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <PanelLeft className="h-[18px] w-[18px]" />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" />
          )}
        </button>
        
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            type="search"
            placeholder="Search matches, events, fans..."
            className="h-10 w-80 rounded-xl border border-border bg-background-subtle/50 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-focus focus:bg-background-elevated transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        <button className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-muted/50 transition-all duration-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4 text-foreground-muted" />
          </div>
          <span className="text-sm font-medium text-foreground">Guest</span>
        </button>
      </div>
    </header>
  );
}
