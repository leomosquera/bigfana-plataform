"use client";

import { useState } from "react";
import { 
  Home, Trophy, Calendar, Users, User, Bell, Search, Settings,
  ChevronRight, ChevronLeft, ChevronDown, X, Plus, Minus, Heart, 
  Share2, Bookmark, MoreHorizontal, Play, Pause, Volume2, 
  Shield, Star, Clock, MapPin, Ticket, Gift, QrCode, Wallet,
  MessageCircle, ThumbsUp, Send, Camera, Image as ImageIcon,
  Check, AlertCircle, Info, Loader2, RefreshCw, ExternalLink,
  Copy, Download, Upload, Filter, SlidersHorizontal, Grid, List,
  Zap, Crown, Award, Target, TrendingUp, BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SegmentedControl, FilterChips } from "@/components/ui/segmented-control";
import { Sheet, Modal } from "@/components/ui/sheet";
import { EmptyState, LoadingState, Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/states";
import { BottomNav, MobileHeader, Sidebar, DesktopHeader, useSidebarState } from "@/components/shell/navigation";

// ============================================
// SECTION WRAPPER
// ============================================
function Section({ 
  title, 
  description, 
  children,
  className 
}: { 
  title: string; 
  description?: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12 border-b border-border/30 last:border-b-0", className)}>
      <div className="mb-8">
        <h2 className="text-display-md text-foreground mb-2">{title}</h2>
        {description && (
          <p className="text-body-md text-foreground-muted max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 last:mb-0">
      <h3 className="text-heading-md text-foreground mb-5">{title}</h3>
      {children}
    </div>
  );
}

function ComponentGrid({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={cn(
      "grid gap-4",
      cols === 2 && "grid-cols-1 sm:grid-cols-2",
      cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      cols === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    )}>
      {children}
    </div>
  );
}

// ============================================
// ADDITIONAL UI COMPONENTS FOR THE KIT
// ============================================

// Live Badge Component
function LiveBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-5 px-2 text-[10px] gap-1",
    md: "h-6 px-2.5 text-xs gap-1.5",
    lg: "h-7 px-3 text-sm gap-2"
  };
  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5"
  };
  return (
    <span className={cn(
      "inline-flex items-center rounded-full bg-primary/15 text-primary font-semibold uppercase tracking-wider",
      sizes[size]
    )}>
      <span className={cn("rounded-full bg-primary animate-pulse-soft", dotSizes[size])} />
      Live
    </span>
  );
}

// Status Badge
function StatusBadge({ 
  variant = "default", 
  children 
}: { 
  variant?: "default" | "success" | "warning" | "error" | "info" | "live";
  children: React.ReactNode;
}) {
  const variants = {
    default: "bg-muted text-foreground-muted",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    error: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
    live: "bg-primary/15 text-primary"
  };
  return (
    <span className={cn(
      "inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium",
      variants[variant]
    )}>
      {children}
    </span>
  );
}

// Avatar Component
function Avatar({ 
  src, 
  alt, 
  size = "md",
  fallback,
  status 
}: { 
  src?: string; 
  alt: string; 
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  status?: "online" | "offline" | "away" | "live";
}) {
  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };
  const statusSizes = {
    xs: "h-1.5 w-1.5 border",
    sm: "h-2 w-2 border",
    md: "h-2.5 w-2.5 border-2",
    lg: "h-3 w-3 border-2",
    xl: "h-4 w-4 border-2"
  };
  const statusColors = {
    online: "bg-success",
    offline: "bg-foreground-subtle",
    away: "bg-warning",
    live: "bg-primary animate-pulse-soft"
  };

  return (
    <div className="relative inline-flex">
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className={cn(
            "rounded-full object-cover bg-muted ring-1 ring-border/50",
            sizes[size]
          )}
        />
      ) : (
        <div className={cn(
          "rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center font-medium text-primary/80",
          sizes[size]
        )}>
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
      {status && (
        <span className={cn(
          "absolute -bottom-0.5 -right-0.5 rounded-full border-background",
          statusSizes[size],
          statusColors[status]
        )} />
      )}
    </div>
  );
}

// Switch Component
function Switch({ 
  checked, 
  onChange, 
  disabled,
  size = "md" 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
    md: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
    lg: { track: "h-7 w-14", thumb: "h-6 w-6", translate: "translate-x-7" }
  };
  
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size].track,
        checked ? "bg-primary" : "bg-muted",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block rounded-full bg-white shadow-lg transition-transform duration-200",
        sizes[size].thumb,
        checked ? sizes[size].translate : "translate-x-0.5",
        "mt-0.5"
      )} />
    </button>
  );
}

// Slider Component
function Slider({ 
  value, 
  onChange, 
  min = 0, 
  max = 100 
}: { 
  value: number; 
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative h-2 w-full">
      <div className="absolute inset-0 rounded-full bg-muted" />
      <div 
        className="absolute inset-y-0 left-0 rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-md pointer-events-none transition-all duration-150"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  );
}

// Checkbox Component
function Checkbox({ 
  checked, 
  onChange, 
  label,
  disabled 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <label className={cn(
      "inline-flex items-center gap-3 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <button
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-150",
          checked 
            ? "bg-primary border-primary" 
            : "bg-transparent border-border hover:border-border-focus",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        {checked && <Check className="h-3 w-3 text-primary-foreground" />}
      </button>
      {label && <span className="text-body-sm text-foreground">{label}</span>}
    </label>
  );
}

// OTP Input
function OTPInput({ length = 6 }: { length?: number }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  
  return (
    <div className="flex gap-2">
      {values.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={values[index]}
          onChange={(e) => {
            const newValues = [...values];
            newValues[index] = e.target.value;
            setValues(newValues);
          }}
          className="h-14 w-12 rounded-xl border border-border bg-input text-center text-xl font-semibold text-foreground focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      ))}
    </div>
  );
}

// Toast Component
function Toast({ 
  variant = "default", 
  title, 
  description, 
  action 
}: { 
  variant?: "default" | "success" | "error" | "warning";
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const variants = {
    default: { bg: "bg-card", icon: <Info className="h-5 w-5 text-foreground-muted" /> },
    success: { bg: "bg-card", icon: <Check className="h-5 w-5 text-success" /> },
    error: { bg: "bg-card", icon: <AlertCircle className="h-5 w-5 text-destructive" /> },
    warning: { bg: "bg-card", icon: <AlertCircle className="h-5 w-5 text-warning" /> }
  };
  
  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-2xl border border-border shadow-lg",
      variants[variant].bg
    )}>
      {variants[variant].icon}
      <div className="flex-1 min-w-0">
        <p className="text-body-md font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-body-sm text-foreground-muted mt-0.5">{description}</p>
        )}
      </div>
      {action}
      <button className="shrink-0 p-1 text-foreground-subtle hover:text-foreground transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Progress Bar
function ProgressBar({ 
  value, 
  max = 100, 
  variant = "default",
  size = "md",
  showLabel 
}: { 
  value: number; 
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const variants = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-destructive"
  };
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  return (
    <div className="w-full">
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", sizes[size])}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-caption text-foreground-muted mt-1.5 text-right">
          {value}/{max}
        </p>
      )}
    </div>
  );
}

// Floating Action Button
function FloatingActionButton({ 
  icon, 
  onClick, 
  variant = "primary" 
}: { 
  icon: React.ReactNode; 
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200 active:scale-95",
        variant === "primary" 
          ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-primary/30 hover:shadow-primary/40" 
          : "bg-card text-foreground border border-border hover:bg-card-hover"
      )}
    >
      {icon}
    </button>
  );
}

// Search Input
function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange 
}: { 
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-subtle" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-12 w-full rounded-xl border border-border bg-input pl-12 pr-4 text-body-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      />
    </div>
  );
}

// Dropdown / Select
function Select({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select option" 
}: { 
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-border bg-input px-4 text-body-md text-foreground focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      >
        <span className={selectedOption ? "text-foreground" : "text-foreground-subtle"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn(
          "h-5 w-5 text-foreground-subtle transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-card shadow-xl overflow-hidden animate-scale-in">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-4 py-3 text-body-md transition-colors",
                option.value === value 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-muted"
              )}
            >
              {option.label}
              {option.value === value && <Check className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// SPORTS-SPECIFIC COMPONENTS
// ============================================

// Match Card
function MatchCard({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore, 
  status, 
  time,
  competition,
  variant = "default"
}: { 
  homeTeam: { name: string; logo?: string };
  awayTeam: { name: string; logo?: string };
  homeScore?: number;
  awayScore?: number;
  status: "upcoming" | "live" | "finished";
  time: string;
  competition?: string;
  variant?: "default" | "featured" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/40 hover:bg-card-hover transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <Avatar fallback={homeTeam.name.substring(0, 2)} size="sm" />
          <span className="text-body-sm text-foreground font-medium truncate">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2 px-4">
          {status === "live" && <LiveBadge size="sm" />}
          {status === "live" || status === "finished" ? (
            <span className="text-heading-md text-foreground font-semibold">
              {homeScore} - {awayScore}
            </span>
          ) : (
            <span className="text-body-sm text-foreground-muted">{time}</span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="text-body-sm text-foreground font-medium truncate">{awayTeam.name}</span>
          <Avatar fallback={awayTeam.name.substring(0, 2)} size="sm" />
        </div>
      </div>
    );
  }
  
  return (
    <Card variant={variant === "featured" ? "featured" : "interactive"} padding="none" className="overflow-hidden">
      {status === "live" && (
        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-ambient" />
      )}
      <div className="p-5">
        {competition && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-overline">{competition}</span>
            {status === "live" && <LiveBadge />}
            {status === "upcoming" && <StatusBadge>{time}</StatusBadge>}
            {status === "finished" && <StatusBadge variant="default">FT</StatusBadge>}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2 flex-1">
            <Avatar fallback={homeTeam.name.substring(0, 3)} size="lg" />
            <span className="text-body-sm text-foreground font-medium text-center">{homeTeam.name}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 px-4">
            {status === "live" || status === "finished" ? (
              <>
                <span className="text-display-md text-foreground">
                  {homeScore} - {awayScore}
                </span>
                {status === "live" && (
                  <span className="text-caption text-primary">{time}</span>
                )}
              </>
            ) : (
              <span className="text-heading-lg text-foreground-muted">{time}</span>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-2 flex-1">
            <Avatar fallback={awayTeam.name.substring(0, 3)} size="lg" />
            <span className="text-body-sm text-foreground font-medium text-center">{awayTeam.name}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Scoreboard
function Scoreboard({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore, 
  time, 
  period 
}: { 
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  period?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/[0.03] border border-primary/15 p-6">
      <div className="absolute inset-0 stadium-atmosphere opacity-50" />
      
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-6">
          <LiveBadge size="lg" />
          {period && <span className="text-body-sm text-foreground-muted">| {period}</span>}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <Avatar fallback={homeTeam.substring(0, 3)} size="xl" />
            <span className="text-heading-sm text-foreground">{homeTeam}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-display-xl text-foreground animate-score-flash">
              {homeScore} - {awayScore}
            </span>
            <span className="text-body-md text-primary mt-2">{time}</span>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <Avatar fallback={awayTeam.substring(0, 3)} size="xl" />
            <span className="text-heading-sm text-foreground">{awayTeam}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Standings Row
function StandingsRow({ 
  position, 
  team, 
  played, 
  won, 
  drawn, 
  lost, 
  points,
  isHighlighted 
}: { 
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  isHighlighted?: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
      isHighlighted ? "bg-primary/8 border border-primary/15" : "hover:bg-muted"
    )}>
      <span className={cn(
        "w-6 text-center text-body-sm font-semibold",
        position <= 4 ? "text-success" : position >= 18 ? "text-destructive" : "text-foreground-muted"
      )}>
        {position}
      </span>
      <div className="flex items-center gap-3 flex-1">
        <Avatar fallback={team.substring(0, 2)} size="sm" />
        <span className={cn(
          "text-body-sm font-medium",
          isHighlighted ? "text-primary" : "text-foreground"
        )}>{team}</span>
      </div>
      <span className="w-8 text-center text-body-sm text-foreground-muted">{played}</span>
      <span className="w-8 text-center text-body-sm text-foreground-muted">{won}</span>
      <span className="w-8 text-center text-body-sm text-foreground-muted">{drawn}</span>
      <span className="w-8 text-center text-body-sm text-foreground-muted">{lost}</span>
      <span className="w-10 text-center text-body-sm font-semibold text-foreground">{points}</span>
    </div>
  );
}

// Player Card
function PlayerCard({ 
  name, 
  number, 
  position, 
  stats,
  featured 
}: { 
  name: string;
  number: number;
  position: string;
  stats?: { label: string; value: string | number }[];
  featured?: boolean;
}) {
  return (
    <Card variant={featured ? "featured" : "interactive"} padding="none">
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-transparent flex items-end justify-center">
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 backdrop-blur">
          <span className="text-heading-md text-foreground font-bold">{number}</span>
        </div>
        <Avatar fallback={name.substring(0, 2)} size="xl" />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-heading-md text-foreground">{name}</h4>
        <p className="text-body-sm text-foreground-muted">{position}</p>
        {stats && (
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border/40">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-heading-md text-foreground">{stat.value}</p>
                <p className="text-caption">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

// ============================================
// COMMERCE COMPONENTS
// ============================================

// Ticket Card
function TicketCard({ 
  event, 
  date, 
  venue, 
  price, 
  available 
}: { 
  event: string;
  date: string;
  venue: string;
  price: string;
  available: boolean;
}) {
  return (
    <Card variant="premium" padding="none" className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-heading-md text-foreground">{event}</h4>
            <p className="text-body-sm text-foreground-muted">{date}</p>
          </div>
          <Ticket className="h-6 w-6 text-primary" />
        </div>
        <div className="flex items-center gap-2 text-body-sm text-foreground-muted mb-4">
          <MapPin className="h-4 w-4" />
          {venue}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div>
            <p className="text-caption text-foreground-muted">From</p>
            <p className="text-heading-md text-foreground">{price}</p>
          </div>
          <Button size="sm" disabled={!available}>
            {available ? "Buy Tickets" : "Sold Out"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Merch Card
function MerchCard({ 
  name, 
  price, 
  originalPrice,
  tag 
}: { 
  name: string;
  price: string;
  originalPrice?: string;
  tag?: string;
}) {
  return (
    <Card variant="interactive" padding="none">
      <div className="relative aspect-square bg-gradient-to-br from-muted to-background-elevated flex items-center justify-center">
        {tag && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
            {tag}
          </span>
        )}
        <Gift className="h-16 w-16 text-foreground-subtle" />
      </div>
      <div className="p-4">
        <h4 className="text-body-md font-medium text-foreground">{name}</h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-heading-sm text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-body-sm text-foreground-subtle line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

// QR Pass
function QRPass({ 
  title, 
  subtitle, 
  code 
}: { 
  title: string;
  subtitle: string;
  code: string;
}) {
  return (
    <Card variant="premium" className="text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-white">
          <QrCode className="h-32 w-32 text-background" />
        </div>
        <div>
          <h4 className="text-heading-md text-foreground">{title}</h4>
          <p className="text-body-sm text-foreground-muted">{subtitle}</p>
        </div>
        <div className="w-full pt-4 border-t border-border/40">
          <p className="text-overline mb-1">Pass Code</p>
          <p className="text-heading-lg text-foreground font-mono tracking-widest">{code}</p>
        </div>
      </div>
    </Card>
  );
}

// Wallet Card
function WalletCard({ 
  balance, 
  currency = "USD" 
}: { 
  balance: number;
  currency?: string;
}) {
  return (
    <Card variant="featured" className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-stadium opacity-50" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="text-label text-foreground">Fan Wallet</span>
          </div>
          <Crown className="h-5 w-5 text-warning" />
        </div>
        <div>
          <p className="text-overline mb-1">Balance</p>
          <p className="text-display-lg text-foreground">
            {currency === "USD" && "$"}{balance.toLocaleString()}
            <span className="text-foreground-muted text-heading-md ml-1">{currency}</span>
          </p>
        </div>
        <div className="flex gap-3 mt-6">
          <Button size="sm" variant="primary" className="flex-1">
            <Plus className="h-4 w-4" /> Add Funds
          </Button>
          <Button size="sm" variant="secondary" className="flex-1">
            <Send className="h-4 w-4" /> Send
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// COMMUNITY COMPONENTS
// ============================================

// Story Rail Item
function StoryItem({ 
  name, 
  isLive, 
  hasUnread 
}: { 
  name: string;
  isLive?: boolean;
  hasUnread?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-16 shrink-0">
      <div className={cn(
        "p-0.5 rounded-full",
        hasUnread && "bg-gradient-to-br from-primary to-warning",
        isLive && "bg-primary animate-pulse-soft"
      )}>
        <div className="p-0.5 rounded-full bg-background">
          <Avatar fallback={name.substring(0, 2)} size="lg" status={isLive ? "live" : undefined} />
        </div>
      </div>
      <span className="text-caption text-center truncate w-full">{name}</span>
      {isLive && (
        <span className="text-[9px] font-semibold text-primary uppercase tracking-wider -mt-1">Live</span>
      )}
    </div>
  );
}

// Discussion Card
function DiscussionCard({ 
  author, 
  content, 
  time, 
  likes, 
  replies 
}: { 
  author: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
}) {
  return (
    <Card variant="default" padding="md">
      <div className="flex items-start gap-3">
        <Avatar fallback={author.substring(0, 2)} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-body-sm font-medium text-foreground">{author}</span>
            <span className="text-caption">{time}</span>
          </div>
          <p className="text-body-md text-foreground-muted">{content}</p>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1.5 text-foreground-subtle hover:text-primary transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-caption">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-caption">{replies}</span>
            </button>
            <button className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <button className="shrink-0 p-1 text-foreground-subtle hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
}

// Activity Feed Item
function ActivityItem({ 
  icon, 
  title, 
  description, 
  time 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body-sm text-foreground">{title}</p>
        <p className="text-caption mt-0.5">{description}</p>
      </div>
      <span className="text-caption shrink-0">{time}</span>
    </div>
  );
}

// Reaction Bar
function ReactionBar() {
  const reactions = [
    { emoji: "Goal", count: 245 },
    { emoji: "Fire", count: 189 },
    { emoji: "Heart", count: 156 },
    { emoji: "Wow", count: 98 },
  ];
  
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/40">
      {reactions.map((reaction, i) => (
        <button
          key={i}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <span className="text-sm">{reaction.emoji}</span>
          <span className="text-caption font-medium">{reaction.count}</span>
        </button>
      ))}
    </div>
  );
}

// Fan Pulse
function FanPulse({ percentage }: { percentage: number }) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border/40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-label text-foreground">Fan Pulse</span>
        <Zap className="h-4 w-4 text-warning" />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-heading-lg text-foreground">{percentage}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-body-sm text-foreground-muted">Fan engagement is high!</p>
          <p className="text-caption mt-1">+12% from last match</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// REWARD COMPONENTS
// ============================================

// Reward Card
function RewardCard({ 
  title, 
  points, 
  progress, 
  total 
}: { 
  title: string;
  points: number;
  progress: number;
  total: number;
}) {
  return (
    <Card variant="highlight" padding="md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-heading-sm text-foreground">{title}</h4>
          <p className="text-caption mt-0.5">{progress}/{total} completed</p>
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-body-sm font-semibold">{points}</span>
        </div>
      </div>
      <ProgressBar value={progress} max={total} variant="warning" />
    </Card>
  );
}

// Points Display
function PointsDisplay({ points }: { points: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/10 border border-warning/20">
      <Star className="h-5 w-5 text-warning fill-current" />
      <span className="text-heading-md text-foreground font-semibold">{points.toLocaleString()}</span>
      <span className="text-body-sm text-foreground-muted">points</span>
    </div>
  );
}

// Achievement Badge
function AchievementBadge({ 
  title, 
  description, 
  icon, 
  unlocked 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border transition-all",
      unlocked 
        ? "bg-card border-primary/20" 
        : "bg-muted/30 border-border/30 opacity-60"
    )}>
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl",
        unlocked ? "bg-primary/15 text-primary" : "bg-muted text-foreground-subtle"
      )}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-body-md font-medium text-foreground">{title}</h4>
        <p className="text-caption">{description}</p>
      </div>
      {unlocked && <Check className="h-5 w-5 text-success" />}
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function UIKitPage() {
  const sidebar = useSidebarState();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  const [sliderValue, setSliderValue] = useState(60);
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [segmentValue, setSegmentValue] = useState("all");
  const [chipValue, setChipValue] = useState("trending");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <MobileHeader title="UI Kit" />
      </div>

      {/* Desktop Header */}
      <DesktopHeader isCollapsed={sidebar.isCollapsed} onMenuClick={sidebar.toggle} />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebar.isCollapsed}
        isMobileOpen={sidebar.isMobileOpen}
        onToggle={sidebar.toggle}
        onCloseMobile={sidebar.closeMobile}
      />

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 pb-24 lg:pb-8",
        sidebar.isCollapsed ? "lg:pl-[72px]" : "lg:pl-64"
      )}>
        <div className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-display-lg text-foreground mb-4">
              BigFana UI Kit
            </h1>
            <p className="text-body-lg text-foreground-muted max-w-2xl">
              The canonical UI foundation for the BigFana platform. Premium, cinematic, 
              immersive, and mobile-first components designed for sports fan engagement.
            </p>
          </div>

          {/* ============================================ */}
          {/* NAVIGATION SECTION */}
          {/* ============================================ */}
          <Section 
            title="Navigation" 
            description="Mobile bottom navigation, headers, and desktop sidebar patterns."
          >
            <SubSection title="Mobile Header Variants">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border overflow-hidden bg-background-subtle">
                  <MobileHeader />
                </div>
                <div className="rounded-2xl border border-border overflow-hidden bg-background-subtle">
                  <MobileHeader title="Matches" showBack onBack={() => {}} />
                </div>
              </div>
            </SubSection>

            <SubSection title="Bottom Navigation">
              <div className="relative rounded-2xl border border-border overflow-hidden bg-background-subtle h-24">
                <div className="absolute bottom-0 left-0 right-0">
                  <BottomNav />
                </div>
              </div>
            </SubSection>

            <SubSection title="Sticky Action Bar">
              <div className="glass-strong border-t border-border/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-foreground">Season Pass</p>
                  <p className="text-heading-md text-foreground">$299/year</p>
                </div>
                <Button>Subscribe Now</Button>
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* BUTTONS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Buttons" 
            description="Primary actions, secondary options, and interactive states."
          >
            <SubSection title="Variants">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </SubSection>

            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </SubSection>

            <SubSection title="Icon Buttons">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="icon-sm" variant="secondary">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button size="icon-lg" variant="secondary">
                  <Bookmark className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="primary">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </SubSection>

            <SubSection title="States">
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
                <div className="flex items-center gap-2">
                  <LiveBadge />
                  <Button size="sm" className="gap-2">
                    <Play className="h-4 w-4" /> Watch Live
                  </Button>
                </div>
              </div>
            </SubSection>

            <SubSection title="Floating Action Buttons">
              <div className="flex gap-4">
                <FloatingActionButton icon={<Plus className="h-6 w-6" />} variant="primary" />
                <FloatingActionButton icon={<MessageCircle className="h-6 w-6" />} variant="secondary" />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* FORMS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Forms" 
            description="Inputs, controls, and form elements optimized for touch."
          >
            <SubSection title="Text Inputs">
              <div className="max-w-md space-y-4">
                <Input label="Email" placeholder="Enter your email" />
                <Input label="Password" type="password" placeholder="Enter password" />
                <Input label="With Error" error="This field is required" placeholder="Enter value" />
                <Input label="With Hint" hint="We'll never share your email" placeholder="Enter email" />
              </div>
            </SubSection>

            <SubSection title="Search">
              <div className="max-w-md">
                <SearchInput placeholder="Search matches, events, fans..." />
              </div>
            </SubSection>

            <SubSection title="OTP Input">
              <OTPInput length={6} />
            </SubSection>

            <SubSection title="Select / Dropdown">
              <div className="max-w-md">
                <Select
                  options={[
                    { value: "all", label: "All Matches" },
                    { value: "live", label: "Live Now" },
                    { value: "upcoming", label: "Upcoming" },
                    { value: "finished", label: "Finished" }
                  ]}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Select match type"
                />
              </div>
            </SubSection>

            <SubSection title="Switches">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <Switch size="sm" checked={switchValue} onChange={setSwitchValue} />
                  <span className="text-body-sm text-foreground">Small</span>
                </div>
                <div className="flex items-center gap-3">
                  <Switch size="md" checked={switchValue} onChange={setSwitchValue} />
                  <span className="text-body-sm text-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-3">
                  <Switch size="lg" checked={switchValue} onChange={setSwitchValue} />
                  <span className="text-body-sm text-foreground">Large</span>
                </div>
              </div>
            </SubSection>

            <SubSection title="Checkboxes">
              <div className="flex flex-wrap gap-6">
                <Checkbox checked={checkboxValue} onChange={setCheckboxValue} label="Accept terms" />
                <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
                <Checkbox checked={true} onChange={() => {}} label="Disabled" disabled />
              </div>
            </SubSection>

            <SubSection title="Slider">
              <div className="max-w-md space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-label text-foreground">Volume</span>
                    <span className="text-body-sm text-foreground-muted">{sliderValue}%</span>
                  </div>
                  <Slider value={sliderValue} onChange={setSliderValue} />
                </div>
              </div>
            </SubSection>

            <SubSection title="Segmented Control">
              <SegmentedControl
                options={[
                  { value: "all", label: "All" },
                  { value: "live", label: "Live" },
                  { value: "upcoming", label: "Upcoming" }
                ]}
                value={segmentValue}
                onChange={setSegmentValue}
              />
            </SubSection>

            <SubSection title="Filter Chips">
              <FilterChips
                options={[
                  { value: "trending", label: "Trending", count: 24 },
                  { value: "popular", label: "Popular", count: 156 },
                  { value: "new", label: "New", count: 12 },
                  { value: "featured", label: "Featured" }
                ]}
                value={chipValue}
                onChange={(v) => setChipValue(v as string)}
              />
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* MOBILE INTERACTIONS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Mobile Interactions" 
            description="Bottom sheets, modals, and overlay patterns."
          >
            <SubSection title="Bottom Sheet">
              <Button onClick={() => setSheetOpen(true)}>Open Bottom Sheet</Button>
              <Sheet
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                title="Match Options"
                description="Choose how you want to engage with this match"
              >
                <div className="space-y-3">
                  <button className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-muted transition-colors">
                    <Bell className="h-5 w-5 text-foreground-muted" />
                    <span className="text-body-md text-foreground">Get notifications</span>
                  </button>
                  <button className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-muted transition-colors">
                    <Calendar className="h-5 w-5 text-foreground-muted" />
                    <span className="text-body-md text-foreground">Add to calendar</span>
                  </button>
                  <button className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-muted transition-colors">
                    <Share2 className="h-5 w-5 text-foreground-muted" />
                    <span className="text-body-md text-foreground">Share with friends</span>
                  </button>
                </div>
              </Sheet>
            </SubSection>

            <SubSection title="Modal">
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Action"
                description="Are you sure you want to proceed with this action?"
              >
                <div className="flex gap-3 mt-6">
                  <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={() => setModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </Modal>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* CARDS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Cards" 
            description="Premium card variants for different content types."
          >
            <SubSection title="Card Variants">
              <ComponentGrid cols={3}>
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Standard card with subtle styling</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Higher elevation with deeper shadows</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="interactive">
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Hover effects for clickable cards</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                    <CardDescription>Frosted glass effect</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="highlight">
                  <CardHeader>
                    <CardTitle>Highlight Card</CardTitle>
                    <CardDescription>Primary accent border and glow</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="featured">
                  <CardHeader>
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription>Premium gradient styling</CardDescription>
                  </CardHeader>
                </Card>
              </ComponentGrid>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* SPORTS MODULES SECTION */}
          {/* ============================================ */}
          <Section 
            title="Sports Modules" 
            description="Match cards, scoreboards, standings, and player components."
          >
            <SubSection title="Live Scoreboard">
              <div className="max-w-xl">
                <Scoreboard
                  homeTeam="Manchester United"
                  awayTeam="Liverpool"
                  homeScore={2}
                  awayScore={1}
                  time="67'"
                  period="2nd Half"
                />
              </div>
            </SubSection>

            <SubSection title="Match Cards">
              <ComponentGrid cols={2}>
                <MatchCard
                  homeTeam={{ name: "Barcelona" }}
                  awayTeam={{ name: "Real Madrid" }}
                  homeScore={3}
                  awayScore={2}
                  status="live"
                  time="78'"
                  competition="La Liga"
                  variant="featured"
                />
                <MatchCard
                  homeTeam={{ name: "Bayern Munich" }}
                  awayTeam={{ name: "Dortmund" }}
                  status="upcoming"
                  time="20:00"
                  competition="Bundesliga"
                />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Compact Match Card">
              <div className="max-w-xl space-y-2">
                <MatchCard
                  homeTeam={{ name: "Chelsea" }}
                  awayTeam={{ name: "Arsenal" }}
                  homeScore={1}
                  awayScore={1}
                  status="finished"
                  time="FT"
                  variant="compact"
                />
                <MatchCard
                  homeTeam={{ name: "Juventus" }}
                  awayTeam={{ name: "AC Milan" }}
                  status="upcoming"
                  time="18:45"
                  variant="compact"
                />
              </div>
            </SubSection>

            <SubSection title="Standings">
              <Card variant="default" padding="sm" className="max-w-2xl">
                <div className="px-4 py-2 border-b border-border/40">
                  <div className="flex items-center gap-4 text-overline">
                    <span className="w-6">#</span>
                    <span className="flex-1">Team</span>
                    <span className="w-8 text-center">P</span>
                    <span className="w-8 text-center">W</span>
                    <span className="w-8 text-center">D</span>
                    <span className="w-8 text-center">L</span>
                    <span className="w-10 text-center">Pts</span>
                  </div>
                </div>
                <StandingsRow position={1} team="Manchester City" played={10} won={8} drawn={1} lost={1} points={25} />
                <StandingsRow position={2} team="Arsenal" played={10} won={7} drawn={2} lost={1} points={23} isHighlighted />
                <StandingsRow position={3} team="Liverpool" played={10} won={7} drawn={1} lost={2} points={22} />
              </Card>
            </SubSection>

            <SubSection title="Player Cards">
              <ComponentGrid cols={3}>
                <PlayerCard
                  name="Marcus Rashford"
                  number={10}
                  position="Forward"
                  stats={[
                    { label: "Goals", value: 12 },
                    { label: "Assists", value: 8 }
                  ]}
                  featured
                />
                <PlayerCard
                  name="Bruno Fernandes"
                  number={8}
                  position="Midfielder"
                  stats={[
                    { label: "Goals", value: 6 },
                    { label: "Assists", value: 14 }
                  ]}
                />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Live Badges & Status">
              <div className="flex flex-wrap items-center gap-4">
                <LiveBadge size="sm" />
                <LiveBadge size="md" />
                <LiveBadge size="lg" />
                <StatusBadge variant="success">Completed</StatusBadge>
                <StatusBadge variant="warning">Postponed</StatusBadge>
                <StatusBadge variant="error">Cancelled</StatusBadge>
                <StatusBadge variant="info">Upcoming</StatusBadge>
              </div>
            </SubSection>

            <SubSection title="Fan Pulse">
              <div className="max-w-sm">
                <FanPulse percentage={78} />
              </div>
            </SubSection>

            <SubSection title="Reactions">
              <div className="max-w-md">
                <ReactionBar />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* COMMERCE SECTION */}
          {/* ============================================ */}
          <Section 
            title="Commerce" 
            description="Tickets, merchandise, wallet, and payment components."
          >
            <SubSection title="Ticket Cards">
              <ComponentGrid cols={2}>
                <TicketCard
                  event="Manchester United vs Liverpool"
                  date="Saturday, Dec 14 - 15:00"
                  venue="Old Trafford, Manchester"
                  price="$85"
                  available
                />
                <TicketCard
                  event="Champions League Final"
                  date="Saturday, May 31 - 20:00"
                  venue="Wembley Stadium, London"
                  price="$250"
                  available={false}
                />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Merchandise">
              <ComponentGrid cols={4}>
                <MerchCard name="Home Jersey 24/25" price="$89.99" tag="New" />
                <MerchCard name="Training Kit" price="$59.99" originalPrice="$79.99" tag="Sale" />
                <MerchCard name="Fan Scarf" price="$24.99" />
                <MerchCard name="Cap Collection" price="$34.99" />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Wallet">
              <div className="max-w-sm">
                <WalletCard balance={1250} />
              </div>
            </SubSection>

            <SubSection title="QR Pass">
              <div className="max-w-xs">
                <QRPass
                  title="Season Pass"
                  subtitle="VIP Access - West Stand"
                  code="BFNA-2024-XK92"
                />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* COMMUNITY SECTION */}
          {/* ============================================ */}
          <Section 
            title="Community" 
            description="Social features, discussions, and fan engagement."
          >
            <SubSection title="Story Rail">
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                <StoryItem name="Live Match" isLive />
                <StoryItem name="Fan Zone" hasUnread />
                <StoryItem name="Highlights" hasUnread />
                <StoryItem name="Training" />
                <StoryItem name="Behind Scenes" />
                <StoryItem name="Interviews" />
              </div>
            </SubSection>

            <SubSection title="Discussion Cards">
              <div className="max-w-xl space-y-4">
                <DiscussionCard
                  author="RedDevil_Fan"
                  content="What a goal by Rashford! That run was incredible. Best player on the pitch today."
                  time="2m ago"
                  likes={24}
                  replies={8}
                />
                <DiscussionCard
                  author="FootballFanatic"
                  content="The atmosphere at Old Trafford is electric tonight. You can feel the energy!"
                  time="5m ago"
                  likes={156}
                  replies={42}
                />
              </div>
            </SubSection>

            <SubSection title="Activity Feed">
              <Card variant="default" className="max-w-xl">
                <div className="divide-y divide-border/40">
                  <ActivityItem
                    icon={<Trophy className="h-5 w-5" />}
                    title="Achievement Unlocked"
                    description="You earned the 'Super Fan' badge"
                    time="1h ago"
                  />
                  <ActivityItem
                    icon={<Ticket className="h-5 w-5" />}
                    title="Ticket Purchased"
                    description="Manchester United vs Liverpool"
                    time="2h ago"
                  />
                  <ActivityItem
                    icon={<Star className="h-5 w-5" />}
                    title="Points Earned"
                    description="+500 points for match attendance"
                    time="3h ago"
                  />
                </div>
              </Card>
            </SubSection>

            <SubSection title="Avatars">
              <div className="flex items-center gap-4">
                <Avatar fallback="JD" size="xs" />
                <Avatar fallback="JD" size="sm" status="online" />
                <Avatar fallback="JD" size="md" status="away" />
                <Avatar fallback="JD" size="lg" status="live" />
                <Avatar fallback="JD" size="xl" />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* REWARDS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Rewards & Gamification" 
            description="Points, achievements, and progression systems."
          >
            <SubSection title="Points Display">
              <PointsDisplay points={12500} />
            </SubSection>

            <SubSection title="Reward Cards">
              <ComponentGrid cols={2}>
                <RewardCard
                  title="Match Day Streak"
                  points={500}
                  progress={3}
                  total={5}
                />
                <RewardCard
                  title="Social Butterfly"
                  points={250}
                  progress={8}
                  total={10}
                />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Achievements">
              <div className="max-w-xl space-y-3">
                <AchievementBadge
                  title="Super Fan"
                  description="Attend 10 matches in a season"
                  icon={<Award className="h-6 w-6" />}
                  unlocked
                />
                <AchievementBadge
                  title="Early Bird"
                  description="Be among the first 100 to buy tickets"
                  icon={<Target className="h-6 w-6" />}
                  unlocked
                />
                <AchievementBadge
                  title="Legend Status"
                  description="Reach 50,000 lifetime points"
                  icon={<Crown className="h-6 w-6" />}
                  unlocked={false}
                />
              </div>
            </SubSection>

            <SubSection title="Progress Bars">
              <div className="max-w-md space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-label text-foreground">Season Progress</span>
                    <span className="text-body-sm text-foreground-muted">75%</span>
                  </div>
                  <ProgressBar value={75} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-label text-foreground">XP to Next Level</span>
                  </div>
                  <ProgressBar value={2400} max={3000} variant="warning" showLabel />
                </div>
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* CAROUSEL PATTERNS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Carousel Patterns" 
            description="Horizontal scrolling rails and snap sections."
          >
            <SubSection title="Content Rail">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} variant="interactive" padding="none" className="w-72 shrink-0 snap-start">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                      <Play className="h-12 w-12 text-foreground-subtle" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-body-md font-medium text-foreground">Match Highlights #{i}</h4>
                      <p className="text-caption mt-1">2.4M views</p>
                    </div>
                  </Card>
                ))}
              </div>
            </SubSection>

            <SubSection title="Card Rail">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
                <MatchCard
                  homeTeam={{ name: "Team A" }}
                  awayTeam={{ name: "Team B" }}
                  homeScore={2}
                  awayScore={1}
                  status="live"
                  time="65'"
                  competition="League"
                />
                <MatchCard
                  homeTeam={{ name: "Team C" }}
                  awayTeam={{ name: "Team D" }}
                  status="upcoming"
                  time="18:00"
                  competition="Cup"
                />
                <MatchCard
                  homeTeam={{ name: "Team E" }}
                  awayTeam={{ name: "Team F" }}
                  homeScore={0}
                  awayScore={0}
                  status="finished"
                  time="FT"
                  competition="League"
                />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* STATES SECTION */}
          {/* ============================================ */}
          <Section 
            title="States" 
            description="Loading, empty, error, and feedback states."
          >
            <SubSection title="Loading States">
              <div className="flex flex-wrap gap-8">
                <LoadingState size="sm" />
                <LoadingState text="Loading matches..." />
                <LoadingState size="lg" text="Please wait..." />
              </div>
            </SubSection>

            <SubSection title="Skeletons">
              <ComponentGrid cols={3}>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <SkeletonCard />
                <SkeletonList count={3} />
              </ComponentGrid>
            </SubSection>

            <SubSection title="Empty States">
              <ComponentGrid cols={2}>
                <Card variant="default">
                  <EmptyState
                    title="No matches found"
                    description="There are no matches scheduled for this date."
                    variant="search"
                  />
                </Card>
                <Card variant="default">
                  <EmptyState
                    title="You're offline"
                    description="Check your connection and try again."
                    variant="offline"
                    action={<Button size="sm">Retry</Button>}
                  />
                </Card>
              </ComponentGrid>
            </SubSection>

            <SubSection title="Toasts">
              <div className="max-w-md space-y-3">
                <Toast title="Changes saved" description="Your preferences have been updated." variant="success" />
                <Toast title="Error occurred" description="Please try again later." variant="error" />
                <Toast title="Low balance" description="Add funds to continue." variant="warning" />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* MOTION EXAMPLES SECTION */}
          {/* ============================================ */}
          <Section 
            title="Motion Examples" 
            description="Transitions, hover states, and animation patterns."
          >
            <SubSection title="Hover Effects">
              <div className="flex flex-wrap gap-4">
                <Card variant="interactive" className="w-48 h-32 flex items-center justify-center">
                  <span className="text-body-sm text-foreground-muted">Hover me</span>
                </Card>
                <div className="w-48 h-32 rounded-2xl bg-card border border-border hover-lift flex items-center justify-center cursor-pointer">
                  <span className="text-body-sm text-foreground-muted">Lift effect</span>
                </div>
                <div className="w-48 h-32 rounded-2xl bg-card border border-border hover-scale flex items-center justify-center cursor-pointer">
                  <span className="text-body-sm text-foreground-muted">Scale effect</span>
                </div>
              </div>
            </SubSection>

            <SubSection title="Live Indicators">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="live-dot" />
                  <span className="text-body-sm text-foreground">Live dot</span>
                </div>
                <LiveBadge />
                <div className="card-live p-4 rounded-xl bg-card border border-border">
                  <span className="text-body-sm text-foreground">Card with live indicator</span>
                </div>
              </div>
            </SubSection>

            <SubSection title="Animated Elements">
              <div className="flex flex-wrap gap-6">
                <div className="animate-pulse-soft p-4 rounded-xl bg-primary/10 text-primary">
                  <span className="text-body-sm">Pulse soft</span>
                </div>
                <div className="animate-float p-4 rounded-xl bg-card border border-border">
                  <span className="text-body-sm text-foreground">Float</span>
                </div>
                <div className="animate-glow-pulse p-4 rounded-xl bg-card border border-border">
                  <span className="text-body-sm text-foreground">Glow pulse</span>
                </div>
              </div>
            </SubSection>

            <SubSection title="Skeleton Shimmer">
              <div className="max-w-xs">
                <div className="h-4 rounded animate-shimmer" />
              </div>
            </SubSection>
          </Section>

          {/* ============================================ */}
          {/* TYPOGRAPHY SECTION */}
          {/* ============================================ */}
          <Section 
            title="Typography" 
            description="Editorial premium type scale."
          >
            <div className="space-y-6">
              <div>
                <p className="text-overline mb-2">Display XL</p>
                <p className="text-display-xl text-foreground">BigFana Experience</p>
              </div>
              <div>
                <p className="text-overline mb-2">Display LG</p>
                <p className="text-display-lg text-foreground">Premium Sports Tech</p>
              </div>
              <div>
                <p className="text-overline mb-2">Display MD</p>
                <p className="text-display-md text-foreground">Fan Engagement Platform</p>
              </div>
              <div>
                <p className="text-overline mb-2">Heading LG</p>
                <p className="text-heading-lg text-foreground">Section Heading</p>
              </div>
              <div>
                <p className="text-overline mb-2">Heading MD</p>
                <p className="text-heading-md text-foreground">Card Title</p>
              </div>
              <div>
                <p className="text-overline mb-2">Heading SM</p>
                <p className="text-heading-sm text-foreground">Subsection Title</p>
              </div>
              <div>
                <p className="text-overline mb-2">Body LG</p>
                <p className="text-body-lg text-foreground-muted">Large body text for prominent descriptions and introductions.</p>
              </div>
              <div>
                <p className="text-overline mb-2">Body MD</p>
                <p className="text-body-md text-foreground-muted">Standard body text for general content and descriptions.</p>
              </div>
              <div>
                <p className="text-overline mb-2">Body SM</p>
                <p className="text-body-sm text-foreground-muted">Smaller body text for secondary information.</p>
              </div>
              <div>
                <p className="text-overline mb-2">Label</p>
                <p className="text-label text-foreground">Form Label Text</p>
              </div>
              <div>
                <p className="text-overline mb-2">Caption</p>
                <p className="text-caption">Caption and meta information</p>
              </div>
              <div>
                <p className="text-overline mb-2">Overline</p>
                <p className="text-overline">CATEGORY LABEL</p>
              </div>
            </div>
          </Section>

          {/* ============================================ */}
          {/* COLORS SECTION */}
          {/* ============================================ */}
          <Section 
            title="Colors" 
            description="Design tokens and color system."
          >
            <SubSection title="Backgrounds">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-background border border-border" />
                  <p className="text-caption text-center">Background</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-background-subtle border border-border" />
                  <p className="text-caption text-center">Subtle</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-background-elevated border border-border" />
                  <p className="text-caption text-center">Elevated</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-background-surface border border-border" />
                  <p className="text-caption text-center">Surface</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-card border border-border" />
                  <p className="text-caption text-center">Card</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-muted border border-border" />
                  <p className="text-caption text-center">Muted</p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Primary & Accents">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-primary" />
                  <p className="text-caption text-center">Primary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-primary-hover" />
                  <p className="text-caption text-center">Primary Hover</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-primary-subtle" />
                  <p className="text-caption text-center">Primary Subtle</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-primary-muted" />
                  <p className="text-caption text-center">Primary Muted</p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Semantic Colors">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-success" />
                  <p className="text-caption text-center">Success</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-warning" />
                  <p className="text-caption text-center">Warning</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-destructive" />
                  <p className="text-caption text-center">Destructive</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-info" />
                  <p className="text-caption text-center">Info</p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Foreground">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-foreground">Foreground</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-foreground-muted">Foreground Muted</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-foreground-subtle">Foreground Subtle</p>
                </div>
              </div>
            </SubSection>
          </Section>

        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
