"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// ============================================
// BASE CAROUSEL
// ============================================

interface BaseCarouselProps extends React.HTMLAttributes<HTMLDivElement>, CarouselProps {
  children: React.ReactNode;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: BaseCarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  basis?: string;
}

function CarouselItem({ className, basis, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        basis || "basis-full",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "minimal" }) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-200",
        variant === "default" && [
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-card/90 backdrop-blur border border-border/50",
          "text-foreground hover:bg-card-hover hover:border-border",
          "disabled:opacity-0 disabled:pointer-events-none",
          "shadow-lg",
        ],
        variant === "minimal" && [
          "flex h-8 w-8 items-center justify-center rounded-lg",
          "text-foreground-muted hover:text-foreground",
          "disabled:opacity-30 disabled:pointer-events-none",
        ],
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

function CarouselNext({
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "minimal" }) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-200",
        variant === "default" && [
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-card/90 backdrop-blur border border-border/50",
          "text-foreground hover:bg-card-hover hover:border-border",
          "disabled:opacity-0 disabled:pointer-events-none",
          "shadow-lg",
        ],
        variant === "minimal" && [
          "flex h-8 w-8 items-center justify-center rounded-lg",
          "text-foreground-muted hover:text-foreground",
          "disabled:opacity-30 disabled:pointer-events-none",
        ],
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}

function CarouselDots({ className }: { className?: string }) {
  const { api, selectedIndex, scrollSnaps } = useCarousel();

  return (
    <div className={cn("flex justify-center gap-1.5 pt-4", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            index === selectedIndex
              ? "w-6 bg-primary"
              : "w-1.5 bg-foreground-subtle/40 hover:bg-foreground-subtle"
          )}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

// ============================================
// PREMIUM CAROUSEL VARIANTS
// ============================================

interface ContentRailProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  seeAllHref?: string;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  showDots?: boolean;
  fadeEdges?: boolean;
  loop?: boolean;
}

/**
 * Content Rail - Netflix/Apple TV style horizontal content rail
 * Perfect for featured content, highlights, and media
 */
function ContentRail({
  children,
  title,
  subtitle,
  seeAllHref,
  className,
  itemClassName,
  showControls = true,
  showDots = false,
  fadeEdges = true,
  loop = false,
}: ContentRailProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      {/* Header */}
      {(title || seeAllHref) && (
        <div className="flex items-end justify-between mb-4 px-4 lg:px-0">
          <div>
            {title && (
              <h3 className="text-heading-md text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="text-body-sm text-foreground-muted mt-0.5">{subtitle}</p>
            )}
          </div>
          {seeAllHref && (
            <a
              href={seeAllHref}
              className="text-body-sm text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
          loop,
        }}
        className="relative"
      >
        {/* Fade edges */}
        {fadeEdges && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none lg:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none lg:hidden" />
          </>
        )}

        <CarouselContent className="-ml-3 px-4 lg:px-0 lg:-ml-4">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className={cn("pl-3 lg:pl-4", itemClassName)}
              basis="basis-[75%] sm:basis-[45%] md:basis-[35%] lg:basis-[28%] xl:basis-[22%]"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="hidden lg:flex left-0 -translate-x-1/2" />
            <CarouselNext className="hidden lg:flex right-0 translate-x-1/2" />
          </>
        )}

        {showDots && <CarouselDots />}
      </Carousel>
    </div>
  );
}

interface MatchRailProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showControls?: boolean;
}

/**
 * Match Rail - Optimized for match cards with proper sizing
 */
function MatchRail({
  children,
  title,
  className,
  showControls = true,
}: MatchRailProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      {title && (
        <div className="flex items-center justify-between mb-4 px-4 lg:px-0">
          <h3 className="text-heading-md text-foreground">{title}</h3>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-3 px-4 lg:px-0 lg:-ml-4">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className="pl-3 lg:pl-4"
              basis="basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[38%] xl:basis-[30%]"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="hidden lg:flex left-0 -translate-x-1/2" />
            <CarouselNext className="hidden lg:flex right-0 translate-x-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
}

interface StoryRailProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Story Rail - Instagram/Snapchat style circular story avatars
 */
function StoryRail({ children, className }: StoryRailProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-2 px-4">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className="pl-2"
              basis="basis-auto"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

interface MediaRailProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  showControls?: boolean;
}

/**
 * Media Rail - For video thumbnails and media content
 */
function MediaRail({
  children,
  title,
  className,
  aspectRatio = "video",
  showControls = true,
}: MediaRailProps) {
  const childArray = React.Children.toArray(children);

  const basisByAspect = {
    video: "basis-[80%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%] xl:basis-[25%]",
    square: "basis-[45%] sm:basis-[35%] md:basis-[28%] lg:basis-[22%] xl:basis-[18%]",
    portrait: "basis-[40%] sm:basis-[30%] md:basis-[24%] lg:basis-[18%] xl:basis-[15%]",
  };

  return (
    <div className={cn("relative", className)}>
      {title && (
        <div className="flex items-center justify-between mb-4 px-4 lg:px-0">
          <h3 className="text-heading-md text-foreground">{title}</h3>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-3 px-4 lg:px-0 lg:-ml-4">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className="pl-3 lg:pl-4"
              basis={basisByAspect[aspectRatio]}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="hidden lg:flex left-0 -translate-x-1/2" />
            <CarouselNext className="hidden lg:flex right-0 translate-x-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
}

interface MerchRailProps {
  children: React.ReactNode;
  title?: string;
  seeAllHref?: string;
  className?: string;
  showControls?: boolean;
}

/**
 * Merchandise Rail - For product cards with consistent sizing
 */
function MerchRail({
  children,
  title,
  seeAllHref,
  className,
  showControls = true,
}: MerchRailProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      {(title || seeAllHref) && (
        <div className="flex items-center justify-between mb-4 px-4 lg:px-0">
          {title && (
            <h3 className="text-heading-md text-foreground">{title}</h3>
          )}
          {seeAllHref && (
            <a
              href={seeAllHref}
              className="text-body-sm text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
            >
              Shop all
              <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-3 px-4 lg:px-0 lg:-ml-4">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className="pl-3 lg:pl-4"
              basis="basis-[48%] sm:basis-[35%] md:basis-[28%] lg:basis-[22%] xl:basis-[18%]"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="hidden lg:flex left-0 -translate-x-1/2" />
            <CarouselNext className="hidden lg:flex right-0 translate-x-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
}

interface CompactCardRailProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 * Compact Card Rail - For smaller, denser card layouts
 */
function CompactCardRail({
  children,
  title,
  className,
}: CompactCardRailProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      {title && (
        <div className="mb-3 px-4 lg:px-0">
          <h4 className="text-heading-sm text-foreground">{title}</h4>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-2 px-4 lg:px-0 lg:-ml-3">
          {childArray.map((child, index) => (
            <CarouselItem
              key={index}
              className="pl-2 lg:pl-3"
              basis="basis-[42%] sm:basis-[32%] md:basis-[25%] lg:basis-[20%] xl:basis-[16%]"
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

interface HeroCarouselProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
}

/**
 * Hero Carousel - Full-width immersive carousel for hero sections
 */
function HeroCarousel({
  children,
  className,
  autoplay = false,
  autoplayInterval = 5000,
}: HeroCarouselProps) {
  const childArray = React.Children.toArray(children);
  const [api, setApi] = React.useState<CarouselApi>();

  // Auto-advance
  React.useEffect(() => {
    if (!api || !autoplay) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [api, autoplay, autoplayInterval]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      className={cn("relative w-full", className)}
    >
      <CarouselContent className="-ml-0">
        {childArray.map((child, index) => (
          <CarouselItem key={index} className="pl-0 basis-full">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
      <CarouselDots className="absolute bottom-6 left-0 right-0" />
    </Carousel>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
  // Premium variants
  ContentRail,
  MatchRail,
  StoryRail,
  MediaRail,
  MerchRail,
  CompactCardRail,
  HeroCarousel,
};
