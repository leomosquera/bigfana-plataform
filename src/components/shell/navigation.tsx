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
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: <Home className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/matches", label: "Matches", icon: <Trophy className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/events", label: "Events", icon: <Calendar className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/community", label: "Community", icon: <Users className="h-[18px] w-[18px]" />, section: "social" },
  { href: "/profile", label: "Profile", icon: <User className="h-[18px] w-[18px]" />, section: "account" },
];

const SIDEBAR_STORAGE_KEY = "bigfana-sidebar-collapsed";

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
    setIsHydrated(true);
  }, []);

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
          : "glass-strong border-b border-border/40"
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {!showBack && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
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
      className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/40 safe-bottom"
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
                "relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-foreground-subtle hover:text-foreground-muted"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-primary/8" />
              )}
              <span className={cn("relative transition-transform duration-200", isActive && "scale-110")}>
                {item.icon}
              </span>
              <span className={cn(
                "relative text-[10px] font-medium",
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

  useEffect(() => {
    onCloseMobile();
  }, [pathname, onCloseMobile]);

  const mainItems = navItems.filter(i => i.section === "main");
  const socialItems = navItems.filter(i => i.section === "social");
  const accountItems = navItems.filter(i => i.section === "account");

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl font-medium transition-all duration-200",
          isCollapsed ? "lg:justify-center lg:px-0 lg:py-3" : "px-3 py-2.5",
          "px-3 py-2.5",
          isActive
            ? "text-primary"
            : "text-foreground-muted hover:text-foreground"
        )}
        aria-current={isActive ? "page" : undefined}
        title={isCollapsed ? item.label : undefined}
      >
        {/* Active background - subtle glow */}
        {isActive && (
          <span className="absolute inset-0 rounded-xl bg-primary/8 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.12)]" />
        )}
        
        {/* Hover state */}
        <span className={cn(
          "absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200",
          !isActive && "group-hover:opacity-100"
        )} />
        
        <span className={cn("relative shrink-0 transition-transform duration-200", isActive && "scale-105")}>
          {item.icon}
        </span>
        <span className={cn("relative text-sm", isCollapsed && "lg:hidden")}>
          {item.label}
        </span>
      </Link>
    );
  };

  const SectionDivider = ({ collapsed }: { collapsed: boolean }) => (
    <div className={cn("my-3", collapsed ? "lg:mx-4 lg:my-4" : "mx-3")}>
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/85 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full transition-all duration-300 ease-out",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-[72px]" : "lg:w-64"
        )}
      >
        <div className={cn(
          "flex h-full flex-col",
          "bg-background-subtle/90 border-r border-border/40",
          "backdrop-blur-2xl",
          "w-64 lg:w-full"
        )}>
          {/* Header */}
          <div className={cn(
            "flex h-16 items-center border-b border-border/30 shrink-0",
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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30 shrink-0">
                <span className="text-sm font-bold text-primary-foreground">BF</span>
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">
                BigFana
              </span>
            </Link>
            
            {isCollapsed && (
              <Link 
                href="/" 
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
              >
                <span className="text-sm font-bold text-primary-foreground">BF</span>
              </Link>
            )}

            <button
              onClick={onCloseMobile}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 hide-scrollbar" role="navigation">
            <ul className="space-y-0.5">
              {mainItems.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>

            <SectionDivider collapsed={isCollapsed} />

            <ul className="space-y-0.5">
              {socialItems.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>

            <SectionDivider collapsed={isCollapsed} />

            <ul className="space-y-0.5">
              {accountItems.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-border/30 p-3 shrink-0 space-y-1.5">
            {/* Settings */}
            <Link
              href="/settings"
              className={cn(
                "group relative flex items-center gap-3 rounded-xl text-foreground-muted hover:text-foreground transition-all duration-200",
                isCollapsed ? "lg:justify-center lg:p-3" : "px-3 py-2.5"
              )}
              title={isCollapsed ? "Settings" : undefined}
            >
              <span className="absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <Settings className="relative h-[18px] w-[18px]" />
              <span className={cn("relative text-sm", isCollapsed && "lg:hidden")}>
                Settings
              </span>
            </Link>

            {/* Toggle Button */}
            <button
              onClick={onToggle}
              className={cn(
                "hidden lg:flex items-center gap-3 w-full rounded-xl text-foreground-muted hover:text-foreground transition-all duration-200 group relative",
                isCollapsed ? "justify-center p-3" : "px-3 py-2.5"
              )}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              {isCollapsed ? (
                <PanelLeft className="relative h-[18px] w-[18px]" />
              ) : (
                <>
                  <PanelLeftClose className="relative h-[18px] w-[18px]" />
                  <span className="relative text-sm">Collapse</span>
                </>
              )}
            </button>

            {/* User */}
            <div className={cn(
              "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-border/30",
              isCollapsed && "lg:hidden"
            )}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15 shrink-0">
                <User className="h-4 w-4 text-primary/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Guest</p>
                <p className="text-[11px] text-foreground-subtle">Sign in</p>
              </div>
            </div>

            {isCollapsed && (
              <div className="hidden lg:flex justify-center py-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15">
                  <User className="h-4 w-4 text-primary/70" />
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
      "hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between px-6 glass-strong border-b border-border/40 transition-all duration-300",
      isCollapsed ? "lg:pl-[96px]" : "lg:pl-[280px]"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <PanelLeft className="h-[18px] w-[18px]" />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" />
          )}
        </button>
        
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle transition-colors duration-200 group-focus-within:text-foreground-muted" />
          <input
            type="search"
            placeholder="Search matches, events, fans..."
            className="h-10 w-80 rounded-xl border border-border/40 bg-background-subtle/60 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-focus focus:bg-background-elevated transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        <div className="h-5 w-px bg-border/40 mx-1" />

        <button className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-white/[0.04] transition-all duration-200 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15 transition-all duration-200 group-hover:ring-primary/25">
            <User className="h-4 w-4 text-primary/70" />
          </div>
          <span className="text-sm font-medium text-foreground">Guest</span>
        </button>
      </div>
    </header>
  );
}
