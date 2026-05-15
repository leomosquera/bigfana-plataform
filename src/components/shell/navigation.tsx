"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
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
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  X,
  Settings,
  Menu,
  Ticket,
  Wallet,
  Gift,
  Star,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================
   NAVIGATION TYPES
   ============================================ */

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
  badge?: number | string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: <Home className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/matches", label: "Matches", icon: <Trophy className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/events", label: "Events", icon: <Calendar className="h-[18px] w-[18px]" />, section: "main" },
  { href: "/community", label: "Community", icon: <Users className="h-[18px] w-[18px]" />, section: "social" },
  { href: "/profile", label: "Profile", icon: <User className="h-[18px] w-[18px]" />, section: "account" },
];

const mobileMenuItems: NavItem[] = [
  { href: "/tickets", label: "My Tickets", icon: <Ticket className="h-5 w-5" /> },
  { href: "/wallet", label: "Wallet", icon: <Wallet className="h-5 w-5" /> },
  { href: "/rewards", label: "Rewards", icon: <Gift className="h-5 w-5" />, badge: "New" },
  { href: "/favorites", label: "Favorites", icon: <Star className="h-5 w-5" /> },
];

const settingsMenuItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  { href: "/help", label: "Help & Support", icon: <HelpCircle className="h-5 w-5" /> },
];

/* ============================================
   THEME CONTEXT & HOOK
   ============================================ */

type Theme = "dark" | "light" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as Theme,
      resolvedTheme: "dark" as "dark" | "light",
      setTheme: () => {},
    };
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("bigfana-theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Add transition class for smooth theme change
    root.classList.add("theme-transition");
    
    let resolved: "dark" | "light" = "dark";
    
    if (theme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      resolved = theme;
    }
    
    setResolvedTheme(resolved);
    root.setAttribute("data-theme", resolved);
    
    // Remove transition class after animation
    const timeout = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("bigfana-theme", newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ============================================
   SIDEBAR STATE HOOK
   ============================================ */

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

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

/* ============================================
   MOBILE HEADER
   Premium, minimal, touch-native
   ============================================ */

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  transparent?: boolean;
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  actions,
  transparent = false,
  onMenuClick,
  showMenu = true,
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between px-4 safe-top lg:hidden",
        transparent
          ? "bg-transparent"
          : "glass-strong border-b border-border/40"
      )}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : showMenu ? (
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
              <span className="text-sm font-bold text-primary-foreground">BF</span>
            </div>
          </Link>
        )}
        
        {title && (
          <h1 className="font-heading text-lg font-semibold text-foreground truncate">
            {title}
          </h1>
        )}
        
        {!title && !showBack && (
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold text-foreground">
              BigFana
            </span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-1">
        {actions || (
          <>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

/* ============================================
   BOTTOM NAVIGATION
   Mobile-native tab bar
   ============================================ */

export function BottomNav() {
  const pathname = usePathname();
  const bottomNavItems = navItems.slice(0, 5); // First 5 items for bottom nav

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/40 lg:hidden"
      role="navigation"
      aria-label="Main navigation"
      style={{ paddingBottom: "var(--safe-area-bottom)" }}
    >
      <div className="flex h-16 items-center justify-around px-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 touch-target",
                isActive
                  ? "text-primary"
                  : "text-foreground-subtle hover:text-foreground-muted active:scale-95"
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

/* ============================================
   MOBILE DRAWER / MENU SHEET
   Immersive side menu for mobile
   ============================================ */

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (open) {
      onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-[85%] max-w-[320px] transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile menu"
      >
        <div className="flex h-full flex-col bg-background border-r border-border/40">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-5 border-b border-border/30 safe-top">
            <Link href="/" className="flex items-center gap-3" onClick={onClose}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                <span className="text-sm font-bold text-primary-foreground">BF</span>
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">
                BigFana
              </span>
            </Link>
            
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="px-5 py-5 border-b border-border/30">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/20">
                <User className="h-6 w-6 text-primary/80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-heading-sm text-foreground truncate">Guest User</p>
                <p className="text-body-sm text-foreground-muted">Sign in for full access</p>
              </div>
              <ChevronRight className="h-5 w-5 text-foreground-subtle" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            {/* Quick Access */}
            <div className="mb-6">
              <p className="text-overline px-3 mb-2">Quick Access</p>
              <ul className="space-y-1">
                {mobileMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-4 px-3 py-3 rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
                    >
                      {item.icon}
                      <span className="flex-1 text-body-md">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-caption font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-4" />

            {/* Settings */}
            <div className="mb-6">
              <p className="text-overline px-3 mb-2">Settings</p>
              <ul className="space-y-1">
                {settingsMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-4 px-3 py-3 rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
                    >
                      {item.icon}
                      <span className="flex-1 text-body-md">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Theme Switcher */}
            <div className="mb-6">
              <p className="text-overline px-3 mb-2">Appearance</p>
              <div className="flex gap-2 px-3">
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 touch-target",
                    theme === "dark" 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-muted/50 text-foreground-muted hover:bg-muted"
                  )}
                >
                  <Moon className="h-4 w-4" />
                  <span className="text-body-sm">Dark</span>
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 touch-target",
                    theme === "light" 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-muted/50 text-foreground-muted hover:bg-muted"
                  )}
                >
                  <Sun className="h-4 w-4" />
                  <span className="text-body-sm">Light</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 touch-target",
                    theme === "system" 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-muted/50 text-foreground-muted hover:bg-muted"
                  )}
                >
                  <Monitor className="h-4 w-4" />
                  <span className="text-body-sm">Auto</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/30 safe-bottom">
            <button
              className="flex items-center gap-4 w-full px-3 py-3 rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-body-md">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ============================================
   DESKTOP SIDEBAR
   Cinematic, collapsible
   ============================================ */

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, onToggle, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
          isCollapsed ? "justify-center px-0 py-3" : "px-3 py-2.5",
          isActive
            ? "text-primary"
            : "text-foreground-muted hover:text-foreground"
        )}
        aria-current={isActive ? "page" : undefined}
        title={isCollapsed ? item.label : undefined}
      >
        {isActive && (
          <span className="absolute inset-0 rounded-xl bg-primary/8 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.12)]" />
        )}
        
        <span className={cn(
          "absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200",
          !isActive && "group-hover:opacity-100"
        )} />
        
        <span className={cn("relative shrink-0 transition-transform duration-200", isActive && "scale-105")}>
          {item.icon}
        </span>
        <span className={cn("relative text-sm", isCollapsed && "hidden")}>
          {item.label}
        </span>
      </Link>
    );
  };

  const SectionDivider = () => (
    <div className={cn("my-3", isCollapsed ? "mx-4" : "mx-3")}>
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </div>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-full hidden lg:block transition-all duration-300 ease-out",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-full flex-col bg-background-subtle/90 border-r border-border/40 backdrop-blur-2xl">
        {/* Header */}
        <div className={cn(
          "flex h-16 items-center border-b border-border/30 shrink-0",
          isCollapsed ? "justify-center px-0" : "justify-between px-4"
        )}>
          <Link 
            href="/" 
            className={cn(
              "flex items-center gap-3 transition-all duration-200",
              isCollapsed && "hidden"
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
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
            >
              <span className="text-sm font-bold text-primary-foreground">BF</span>
            </Link>
          )}
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

          <SectionDivider />

          <ul className="space-y-0.5">
            {socialItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <SectionDivider />

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
          {/* Theme Toggle (compact) */}
          <div className={cn("flex gap-1", isCollapsed ? "flex-col" : "")}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "flex items-center gap-2 rounded-xl text-foreground-muted hover:text-foreground transition-all duration-200 group relative",
                isCollapsed ? "justify-center p-3" : "flex-1 px-3 py-2"
              )}
              title={isCollapsed ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : undefined}
            >
              <span className="absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              {theme === "dark" ? (
                <Sun className="relative h-[18px] w-[18px]" />
              ) : (
                <Moon className="relative h-[18px] w-[18px]" />
              )}
              {!isCollapsed && (
                <span className="relative text-sm">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </button>
          </div>

          {/* Settings */}
          <Link
            href="/settings"
            className={cn(
              "group relative flex items-center gap-3 rounded-xl text-foreground-muted hover:text-foreground transition-all duration-200",
              isCollapsed ? "justify-center p-3" : "px-3 py-2.5"
            )}
            title={isCollapsed ? "Settings" : undefined}
          >
            <span className="absolute inset-0 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <Settings className="relative h-[18px] w-[18px]" />
            <span className={cn("relative text-sm", isCollapsed && "hidden")}>
              Settings
            </span>
          </Link>

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className={cn(
              "flex items-center gap-3 w-full rounded-xl text-foreground-muted hover:text-foreground transition-all duration-200 group relative",
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
            isCollapsed && "hidden"
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
            <div className="flex justify-center py-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15">
                <User className="h-4 w-4 text-primary/70" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ============================================
   TABLET RAIL SIDEBAR
   Compact icon-only sidebar for tablet
   ============================================ */

export function TabletRail() {
  const pathname = usePathname();
  const mainItems = navItems.filter(i => i.section === "main");

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-20 hidden md:flex lg:hidden flex-col bg-background-subtle/90 border-r border-border/40 backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border/30">
        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
          <span className="text-sm font-bold text-primary-foreground">BF</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2 py-4">
        {mainItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 touch-target",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground-muted hover:text-foreground hover:bg-white/[0.04]"
              )}
              title={item.label}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col items-center gap-2 py-4 border-t border-border/30">
        <Link
          href="/settings"
          className="flex h-12 w-12 items-center justify-center rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 touch-target"
          title="Settings"
        >
          <Settings className="h-[18px] w-[18px]" />
        </Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15">
          <User className="h-4 w-4 text-primary/70" />
        </div>
      </div>
    </aside>
  );
}

/* ============================================
   DESKTOP HEADER
   ============================================ */

interface DesktopHeaderProps {
  isCollapsed: boolean;
  onMenuClick: () => void;
}

export function DesktopHeader({ isCollapsed, onMenuClick }: DesktopHeaderProps) {
  return (
    <header className={cn(
      "hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between px-6 glass-strong border-b border-border/40 transition-all duration-300",
      isCollapsed ? "pl-[96px]" : "pl-[280px]"
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

/* ============================================
   STICKY ACTION BAR
   Mobile CTA bar
   ============================================ */

interface StickyActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyActionBar({ children, className }: StickyActionBarProps) {
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-border/40 p-4 lg:hidden",
        className
      )}
      style={{ 
        paddingBottom: `calc(var(--bottom-nav-height) + var(--safe-area-bottom) + 1rem)` 
      }}
    >
      {children}
    </div>
  );
}
