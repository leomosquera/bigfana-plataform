"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet } from "@/components/ui/sheet";

// ============================================
// HORIZONTAL DATE SELECTOR
// ============================================

interface DateOption {
  date: Date;
  label: string;
  sublabel?: string;
  hasEvent?: boolean;
  isLive?: boolean;
}

interface HorizontalDateSelectorProps {
  dates: DateOption[];
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

/**
 * Horizontal Date Selector - Quick date selection with visual indicators
 * Example: [Today] [Tomorrow] [Sat 14] [Sun 15]
 */
function HorizontalDateSelector({
  dates,
  selectedDate,
  onSelect,
  className,
}: HorizontalDateSelectorProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2 touch-pan-x"
      >
        {dates.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.date)}
            className={cn(
              "relative flex flex-col items-center px-4 py-3 rounded-xl shrink-0 transition-all duration-200",
              "min-w-[72px]",
              isSelected(item.date)
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border/50 text-foreground hover:bg-card-hover hover:border-border"
            )}
          >
            <span className={cn(
              "text-overline mb-0.5",
              isSelected(item.date) ? "text-primary-foreground/70" : "text-foreground-subtle"
            )}>
              {item.sublabel}
            </span>
            <span className="text-heading-sm font-semibold">{item.label}</span>
            
            {/* Event/Live indicator */}
            {(item.hasEvent || item.isLive) && (
              <span className={cn(
                "absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full",
                item.isLive ? "bg-primary animate-pulse-soft" : "bg-success"
              )} />
            )}
          </button>
        ))}
      </div>
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

// ============================================
// FULLSCREEN MOBILE CALENDAR
// ============================================

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent?: boolean;
  isLive?: boolean;
  eventCount?: number;
}

interface FullscreenCalendarProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  eventDates?: Date[];
  liveDates?: Date[];
  className?: string;
}

/**
 * Fullscreen Mobile Calendar - Premium bottom sheet calendar
 */
function FullscreenCalendar({
  open,
  onClose,
  selectedDate,
  onSelect,
  eventDates = [],
  liveDates = [],
}: FullscreenCalendarProps) {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const hasEvent = (date: Date) => {
    return eventDates.some(d => d.toDateString() === date.toDateString());
  };

  const isLive = (date: Date) => {
    return liveDates.some(d => d.toDateString() === date.toDateString());
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: CalendarDay[] = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        hasEvent: hasEvent(date),
        isLive: isLive(date),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        hasEvent: hasEvent(date),
        isLive: isLive(date),
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        hasEvent: hasEvent(date),
        isLive: isLive(date),
      });
    }

    return days;
  };

  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelect = (date: Date) => {
    onSelect(date);
    onClose();
  };

  const days = generateCalendarDays();

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Select Date"
      className="max-h-[85vh]"
    >
      <div className="space-y-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground hover:bg-card-hover transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-heading-md text-foreground">
            {months[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h3>
          <button
            onClick={goToNextMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground hover:bg-card-hover transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-caption text-foreground-subtle font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleSelect(day.date)}
              className={cn(
                "relative h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-200",
                day.isCurrentMonth
                  ? "text-foreground"
                  : "text-foreground-subtle/40",
                isSelected(day.date) && "bg-primary text-primary-foreground",
                day.isToday && !isSelected(day.date) && "bg-primary/10 text-primary",
                !isSelected(day.date) && day.isCurrentMonth && "hover:bg-card"
              )}
            >
              <span className="text-body-sm font-medium">{day.date.getDate()}</span>
              
              {/* Event indicators */}
              {(day.hasEvent || day.isLive) && !isSelected(day.date) && (
                <span className={cn(
                  "absolute bottom-1 h-1 w-1 rounded-full",
                  day.isLive ? "bg-primary" : "bg-foreground-subtle"
                )} />
              )}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t border-border/40">
          <button
            onClick={() => handleSelect(new Date())}
            className="flex-1 py-3 rounded-xl bg-muted text-foreground text-body-sm font-medium hover:bg-card-hover transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              handleSelect(tomorrow);
            }}
            className="flex-1 py-3 rounded-xl bg-muted text-foreground text-body-sm font-medium hover:bg-card-hover transition-colors"
          >
            Tomorrow
          </button>
          <button
            onClick={() => {
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              handleSelect(nextWeek);
            }}
            className="flex-1 py-3 rounded-xl bg-muted text-foreground text-body-sm font-medium hover:bg-card-hover transition-colors"
          >
            Next Week
          </button>
        </div>
      </div>
    </Sheet>
  );
}

// ============================================
// COMPACT INLINE CALENDAR
// ============================================

interface InlineCalendarProps {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  eventDates?: Date[];
  liveDates?: Date[];
  className?: string;
}

/**
 * Compact Inline Calendar - Embedded calendar card
 */
function InlineCalendar({
  selectedDate,
  onSelect,
  eventDates = [],
  liveDates = [],
  className,
}: InlineCalendarProps) {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const hasEvent = (date: Date) => {
    return eventDates.some(d => d.toDateString() === date.toDateString());
  };

  const isLive = (date: Date) => {
    return liveDates.some(d => d.toDateString() === date.toDateString());
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: new Date(year, month, -firstDay + i + 1), isCurrentMonth: false });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    return days;
  };

  const days = generateCalendarDays();

  return (
    <div className={cn("p-4 rounded-2xl bg-card border border-border/40", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-label text-foreground">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekdays.map((day, i) => (
          <div key={i} className="h-7 flex items-center justify-center text-[10px] text-foreground-subtle font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onSelect(day.date)}
            className={cn(
              "relative h-8 w-8 flex items-center justify-center rounded-lg text-xs transition-all duration-150",
              day.isCurrentMonth ? "text-foreground" : "text-foreground-subtle/30",
              isSelected(day.date) && "bg-primary text-primary-foreground",
              isToday(day.date) && !isSelected(day.date) && "text-primary font-semibold",
              !isSelected(day.date) && day.isCurrentMonth && "hover:bg-muted"
            )}
          >
            {day.date.getDate()}
            {(hasEvent(day.date) || isLive(day.date)) && !isSelected(day.date) && (
              <span className={cn(
                "absolute bottom-0.5 h-1 w-1 rounded-full",
                isLive(day.date) ? "bg-primary" : "bg-foreground-subtle"
              )} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// DATE PICKER INPUT
// ============================================

interface DatePickerInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Date Picker Input - Trigger button that opens the fullscreen calendar
 */
function DatePickerInput({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: DatePickerInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-input px-4 text-body-md transition-all duration-200",
          "hover:border-border-focus focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/20",
          value ? "text-foreground" : "text-foreground-subtle",
          className
        )}
      >
        <CalendarIcon className="h-5 w-5 text-foreground-subtle" />
        <span>{value ? formatDate(value) : placeholder}</span>
      </button>

      <FullscreenCalendar
        open={isOpen}
        onClose={() => setIsOpen(false)}
        selectedDate={value}
        onSelect={onChange}
      />
    </>
  );
}

// ============================================
// MATCH CALENDAR (Event-Oriented)
// ============================================

interface MatchEvent {
  date: Date;
  homeTeam: string;
  awayTeam: string;
  time: string;
  competition?: string;
  isLive?: boolean;
}

interface MatchCalendarProps {
  events: MatchEvent[];
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  onSelectMatch?: (event: MatchEvent) => void;
  className?: string;
}

/**
 * Match Calendar - Event-oriented calendar for sports matches
 */
function MatchCalendar({
  events,
  selectedDate,
  onSelectDate,
  onSelectMatch,
  className,
}: MatchCalendarProps) {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  // Generate next 14 days
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = generateDays();

  const getEventsForDate = (date: Date) => {
    return events.filter(e => e.date.toDateString() === date.toDateString());
  };

  const formatDayLabel = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Today";
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Horizontal date selector */}
      <HorizontalDateSelector
        dates={days.map(date => ({
          date,
          label: date.getDate().toString(),
          sublabel: formatDayLabel(date),
          hasEvent: getEventsForDate(date).length > 0,
          isLive: getEventsForDate(date).some(e => e.isLive),
        }))}
        selectedDate={selectedDate}
        onSelect={onSelectDate}
      />

      {/* Events for selected date */}
      {selectedDate && (
        <div className="space-y-2">
          {getEventsForDate(selectedDate).length > 0 ? (
            getEventsForDate(selectedDate).map((event, index) => (
              <button
                key={index}
                onClick={() => onSelectMatch?.(event)}
                className="w-full p-4 rounded-xl bg-card border border-border/40 hover:bg-card-hover transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-caption text-foreground-subtle">{event.competition}</span>
                  {event.isLive && (
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-primary uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                      Live
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-medium">
                      {event.homeTeam.substring(0, 3)}
                    </div>
                    <span className="text-body-sm font-medium text-foreground">vs</span>
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-medium">
                      {event.awayTeam.substring(0, 3)}
                    </div>
                  </div>
                  <span className="text-body-sm text-foreground-muted">{event.time}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="py-12 text-center">
              <CalendarIcon className="h-10 w-10 text-foreground-subtle mx-auto mb-3" />
              <p className="text-body-sm text-foreground-muted">No matches on this day</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export {
  HorizontalDateSelector,
  FullscreenCalendar,
  InlineCalendar,
  DatePickerInput,
  MatchCalendar,
  type DateOption,
  type MatchEvent,
};
