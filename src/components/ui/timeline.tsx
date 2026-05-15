"use client";

import * as React from "react";
import { 
  Clock, MapPin, Ticket, Gift, Trophy, Play, Pause, 
  Bell, Star, Users, Coffee, Music, Camera, ChevronRight,
  Circle, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// TIMELINE TYPES
// ============================================

type TimelineStatus = "upcoming" | "active" | "completed" | "live";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  status: TimelineStatus;
  icon?: React.ReactNode;
  type?: "default" | "kickoff" | "halftime" | "sponsor" | "entertainment" | "food";
  isHighlighted?: boolean;
}

// ============================================
// VERTICAL TIMELINE
// ============================================

interface VerticalTimelineProps {
  events: TimelineEvent[];
  className?: string;
  compact?: boolean;
}

/**
 * Vertical Timeline - Classic vertical timeline for events
 */
function VerticalTimeline({ events, className, compact = false }: VerticalTimelineProps) {
  const getStatusStyles = (status: TimelineStatus) => {
    switch (status) {
      case "live":
        return {
          dot: "bg-primary",
          line: "bg-primary/30",
          text: "text-primary",
          ring: "ring-primary/30",
        };
      case "active":
        return {
          dot: "bg-success",
          line: "bg-success/30",
          text: "text-success",
          ring: "ring-success/30",
        };
      case "completed":
        return {
          dot: "bg-foreground-subtle",
          line: "bg-border",
          text: "text-foreground-muted",
          ring: "ring-border",
        };
      default:
        return {
          dot: "bg-muted",
          line: "bg-border",
          text: "text-foreground-muted",
          ring: "ring-border",
        };
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "kickoff": return <Play className="h-4 w-4" />;
      case "halftime": return <Pause className="h-4 w-4" />;
      case "sponsor": return <Star className="h-4 w-4" />;
      case "entertainment": return <Music className="h-4 w-4" />;
      case "food": return <Coffee className="h-4 w-4" />;
      default: return <Circle className="h-3 w-3" />;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {events.map((event, index) => {
        const styles = getStatusStyles(event.status);
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className={cn("relative flex gap-4", compact ? "pb-4" : "pb-6")}>
            {/* Timeline line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[15px] top-8 w-0.5 h-[calc(100%-1.5rem)]",
                  styles.line
                )}
              />
            )}

            {/* Timeline dot */}
            <div className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              event.status === "live" ? "ring-4 ring-primary/20 animate-pulse-soft" : "",
              event.status === "completed" ? "bg-card border border-border" : styles.dot
            )}>
              {event.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <span className={cn(
                  event.status === "live" ? "text-primary-foreground" : "text-foreground-muted"
                )}>
                  {event.icon || getTypeIcon(event.type)}
                </span>
              )}
            </div>

            {/* Content */}
            <div className={cn(
              "flex-1 pt-1",
              compact ? "pb-0" : "pb-2"
            )}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={cn(
                    "text-caption font-medium uppercase tracking-wider",
                    styles.text
                  )}>
                    {event.time}
                    {event.status === "live" && " • Live"}
                  </span>
                  <h4 className={cn(
                    "text-body-md font-medium mt-0.5",
                    event.status === "completed" ? "text-foreground-muted" : "text-foreground"
                  )}>
                    {event.title}
                  </h4>
                  {event.description && (
                    <p className="text-body-sm text-foreground-subtle mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
                {event.isHighlighted && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// MATCH DAY AGENDA
// ============================================

interface MatchDayAgendaProps {
  events: TimelineEvent[];
  matchTime?: string;
  venue?: string;
  className?: string;
}

/**
 * Match Day Agenda - Full match day schedule with context
 */
function MatchDayAgenda({ events, matchTime, venue, className }: MatchDayAgendaProps) {
  const activeIndex = events.findIndex(e => e.status === "live" || e.status === "active");
  
  return (
    <div className={cn("rounded-2xl bg-card border border-border/40 overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-transparent">
        <h3 className="text-heading-sm text-foreground mb-2">Match Day Schedule</h3>
        <div className="flex items-center gap-4">
          {matchTime && (
            <div className="flex items-center gap-1.5 text-body-sm text-foreground-muted">
              <Clock className="h-4 w-4" />
              Kickoff {matchTime}
            </div>
          )}
          {venue && (
            <div className="flex items-center gap-1.5 text-body-sm text-foreground-muted">
              <MapPin className="h-4 w-4" />
              {venue}
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <VerticalTimeline events={events} compact />
      </div>

      {/* Progress indicator */}
      {activeIndex >= 0 && (
        <div className="px-4 pb-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STADIUM SCHEDULE
// ============================================

interface StadiumScheduleItem {
  id: string;
  time: string;
  title: string;
  location?: string;
  type: "gate" | "food" | "shop" | "entertainment" | "info";
  capacity?: number;
  waitTime?: string;
}

interface StadiumScheduleProps {
  items: StadiumScheduleItem[];
  className?: string;
}

/**
 * Stadium Schedule - Location-based venue schedule
 */
function StadiumSchedule({ items, className }: StadiumScheduleProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "gate": return { icon: <Ticket className="h-4 w-4" />, bg: "bg-info/10", text: "text-info" };
      case "food": return { icon: <Coffee className="h-4 w-4" />, bg: "bg-warning/10", text: "text-warning" };
      case "shop": return { icon: <Gift className="h-4 w-4" />, bg: "bg-success/10", text: "text-success" };
      case "entertainment": return { icon: <Music className="h-4 w-4" />, bg: "bg-primary/10", text: "text-primary" };
      default: return { icon: <MapPin className="h-4 w-4" />, bg: "bg-muted", text: "text-foreground-muted" };
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const styles = getTypeStyles(item.type);
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/40 hover:bg-card-hover transition-colors"
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
              styles.bg, styles.text
            )}>
              {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-body-sm font-medium text-foreground truncate">{item.title}</h4>
                <span className="text-caption text-foreground-muted shrink-0 ml-2">{item.time}</span>
              </div>
              {item.location && (
                <p className="text-caption text-foreground-subtle">{item.location}</p>
              )}
            </div>
            {item.waitTime && (
              <span className="text-caption text-warning shrink-0">{item.waitTime} wait</span>
            )}
            <ChevronRight className="h-4 w-4 text-foreground-subtle shrink-0" />
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// LIVE EVENT TRACKER
// ============================================

interface LiveTrackerEvent {
  id: string;
  minute: string;
  type: "goal" | "card" | "substitution" | "var" | "injury" | "other";
  title: string;
  team?: "home" | "away";
  player?: string;
}

interface LiveEventTrackerProps {
  events: LiveTrackerEvent[];
  homeTeam: string;
  awayTeam: string;
  currentMinute?: string;
  className?: string;
}

/**
 * Live Event Tracker - Real-time match event timeline
 */
function LiveEventTracker({ 
  events, 
  homeTeam, 
  awayTeam, 
  currentMinute,
  className 
}: LiveEventTrackerProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal": return "Goal";
      case "card": return "Card";
      case "substitution": return "Sub";
      case "var": return "VAR";
      case "injury": return "Inj";
      default: return "Event";
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "goal": return "bg-success text-success-foreground";
      case "card": return "bg-warning text-warning-foreground";
      case "substitution": return "bg-info text-info-foreground";
      case "var": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-foreground-muted";
    }
  };

  return (
    <div className={cn("rounded-2xl bg-card border border-border/40 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <h3 className="text-heading-sm text-foreground">Match Events</h3>
        {currentMinute && (
          <span className="flex items-center gap-1.5 text-primary text-body-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
            {currentMinute}&apos;
          </span>
        )}
      </div>

      {/* Events */}
      <div className="divide-y divide-border/40">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "flex items-center gap-3 p-4",
              event.team === "home" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <span className={cn(
              "flex h-8 min-w-[3rem] items-center justify-center rounded-lg text-[10px] font-bold uppercase",
              getEventColor(event.type)
            )}>
              {getEventIcon(event.type)}
            </span>
            <div className={cn(
              "flex-1",
              event.team === "away" && "text-right"
            )}>
              <p className="text-body-sm text-foreground font-medium">{event.title}</p>
              {event.player && (
                <p className="text-caption text-foreground-muted">{event.player}</p>
              )}
            </div>
            <span className="text-heading-sm text-foreground-muted font-mono shrink-0">
              {event.minute}&apos;
            </span>
          </div>
        ))}
      </div>

      {/* Team legend */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 text-caption">
        <span className="text-foreground-muted">{homeTeam}</span>
        <span className="text-foreground-subtle">vs</span>
        <span className="text-foreground-muted">{awayTeam}</span>
      </div>
    </div>
  );
}

// ============================================
// COUNTDOWN BLOCK
// ============================================

interface CountdownBlockProps {
  targetDate: Date;
  title?: string;
  subtitle?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Countdown Block - Animated countdown to an event
 */
function CountdownBlock({ 
  targetDate, 
  title, 
  subtitle,
  className,
  size = "md" 
}: CountdownBlockProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const sizeStyles = {
    sm: { container: "p-3", number: "text-heading-md", label: "text-[9px]" },
    md: { container: "p-4", number: "text-display-md", label: "text-[10px]" },
    lg: { container: "p-5", number: "text-display-lg", label: "text-caption" },
  };

  const styles = sizeStyles[size];

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={cn("rounded-2xl bg-card border border-border/40 overflow-hidden", className)}>
      {(title || subtitle) && (
        <div className={cn("border-b border-border/40", styles.container)}>
          {title && <h4 className="text-heading-sm text-foreground">{title}</h4>}
          {subtitle && <p className="text-caption text-foreground-muted mt-0.5">{subtitle}</p>}
        </div>
      )}
      
      <div className={cn("flex items-center justify-center gap-2", styles.container)}>
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="flex flex-col items-center">
              <span className={cn(
                "font-mono font-bold text-foreground",
                styles.number
              )}>
                {formatNumber(item.value)}
              </span>
              <span className={cn(
                "uppercase tracking-wider text-foreground-subtle font-medium",
                styles.label
              )}>
                {item.label}
              </span>
            </div>
            {index < 3 && (
              <span className={cn("text-foreground-subtle font-bold", styles.number)}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============================================
// KICKOFF INDICATOR
// ============================================

interface KickoffIndicatorProps {
  time: string;
  date: string;
  isLive?: boolean;
  className?: string;
}

/**
 * Kickoff Indicator - Prominent kickoff time display
 */
function KickoffIndicator({ time, date, isLive, className }: KickoffIndicatorProps) {
  return (
    <div className={cn(
      "inline-flex flex-col items-center justify-center p-4 rounded-2xl",
      isLive 
        ? "bg-primary/10 border border-primary/20" 
        : "bg-card border border-border/40",
      className
    )}>
      {isLive ? (
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-soft" />
          <span className="text-overline text-primary">Live Now</span>
        </div>
      ) : (
        <span className="text-overline text-foreground-subtle mb-1">{date}</span>
      )}
      <span className={cn(
        "text-display-md font-bold",
        isLive ? "text-primary" : "text-foreground"
      )}>
        {time}
      </span>
      {!isLive && (
        <span className="text-caption text-foreground-muted mt-1">Kickoff</span>
      )}
    </div>
  );
}

// ============================================
// REMINDER CARD
// ============================================

interface ReminderCardProps {
  title: string;
  time: string;
  isSet?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * Reminder Card - Event reminder toggle
 */
function ReminderCard({ title, time, isSet, onToggle, className }: ReminderCardProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200",
        isSet 
          ? "bg-primary/5 border-primary/20 text-primary" 
          : "bg-card border-border/40 text-foreground hover:bg-card-hover",
        className
      )}
    >
      <Bell className={cn("h-5 w-5", isSet && "fill-current")} />
      <div className="flex-1 text-left">
        <p className="text-body-sm font-medium">{title}</p>
        <p className={cn("text-caption", isSet ? "text-primary/70" : "text-foreground-muted")}>
          {time}
        </p>
      </div>
      <div className={cn(
        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
        isSet ? "bg-primary border-primary" : "border-border"
      )}>
        {isSet && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
      </div>
    </button>
  );
}

export {
  VerticalTimeline,
  MatchDayAgenda,
  StadiumSchedule,
  LiveEventTracker,
  CountdownBlock,
  KickoffIndicator,
  ReminderCard,
  type TimelineEvent,
  type TimelineStatus,
  type StadiumScheduleItem,
  type LiveTrackerEvent,
};
