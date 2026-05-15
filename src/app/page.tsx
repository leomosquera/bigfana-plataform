"use client";

import { useState } from "react";
import { ArrowRight, Play, Star, ChevronRight, Trophy, Users, Zap, Sparkles } from "lucide-react";
import { AppShell, PageContainer, Section, HeroSection } from "@/components/shell";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  SegmentedControl,
  FilterChips,
  Sheet,
  Modal,
  EmptyState,
  LoadingState,
  Skeleton,
  SkeletonCard,
} from "@/components/ui";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>(["live"]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppShell>
      {/* Cinematic Hero Section */}
      <HeroSection height="lg" overlayIntensity={75}>
        <PageContainer className="pb-12 lg:pb-16">
          <div className="space-y-8 animate-fade-up max-w-2xl">
            {/* Live indicator badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">3 Live Matches</span>
            </div>
            
            {/* Hero headline */}
            <div className="space-y-4">
              <h1 className="text-display-xl text-foreground text-balance">
                Experience Football
                <span className="block text-foreground-muted">Like Never Before</span>
              </h1>
              
              <p className="text-body-lg text-foreground-muted max-w-lg leading-relaxed">
                Join millions of passionate fans. Get live updates, exclusive content, and connect with your community.
              </p>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="xl" className="group">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="secondary" size="xl" className="group">
                <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                Watch Highlights
              </Button>
            </div>
          </div>
        </PageContainer>
      </HeroSection>

      <PageContainer className="space-y-16 lg:space-y-20">
        {/* Stats Section - Premium glass cards */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4 -mt-8 relative z-10">
          {[
            { icon: Trophy, label: "Live Matches", value: "24", accent: true },
            { icon: Users, label: "Active Fans", value: "1.2M", accent: false },
            { icon: Zap, label: "Events Today", value: "156", accent: false },
          ].map((stat, index) => (
            <Card 
              key={stat.label} 
              variant="glass" 
              padding="lg" 
              className={`text-center ${index === 0 ? "border-primary/20" : ""}`}
            >
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent ? "bg-primary/10" : "bg-muted/50"}`}>
                <stat.icon className={`h-5 w-5 ${stat.accent ? "text-primary" : "text-foreground-muted"}`} />
              </div>
              <p className="text-display-md text-foreground mb-1">{stat.value}</p>
              <p className="text-caption">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Controls Demo */}
        <Section title="Quick Filters">
          <div className="space-y-4">
            <SegmentedControl
              options={[
                { value: "all", label: "All" },
                { value: "live", label: "Live" },
                { value: "upcoming", label: "Upcoming" },
              ]}
              value={activeTab}
              onChange={setActiveTab}
            />
            
            <FilterChips
              options={[
                { value: "live", label: "Live", count: 12 },
                { value: "football", label: "Football", count: 45 },
                { value: "basketball", label: "Basketball", count: 23 },
                { value: "tennis", label: "Tennis", count: 8 },
              ]}
              value={activeFilters}
              onChange={(v) => setActiveFilters(v as string[])}
              multiple
            />
          </div>
        </Section>

        {/* Featured Matches - Premium cards */}
        <Section 
          title="Featured Matches" 
          subtitle="Top games happening right now"
          action={
            <Button variant="ghost" size="sm" className="group">
              View All
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          }
        >
          <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
            {/* Live Match Card */}
            <Card variant="premium" padding="lg" className="group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-overline text-primary">Live</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground-subtle">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Barcelona vs Real Madrid</CardTitle>
                <CardDescription>La Liga - Matchday 15</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-6">
                  <div className="text-center space-y-2">
                    <div className="h-14 w-14 rounded-full bg-muted/50 mx-auto ring-2 ring-border/50" />
                    <p className="text-label">Barcelona</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-display-md text-foreground font-bold">2 - 1</p>
                    <p className="text-caption mt-1">78&apos;</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="h-14 w-14 rounded-full bg-muted/50 mx-auto ring-2 ring-border/50" />
                    <p className="text-label">Real Madrid</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="flex-1">
                  Match Details
                </Button>
                <Button size="sm" className="flex-1">
                  Watch Live
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Match Card */}
            <Card variant="highlight" padding="lg" className="group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-overline">Upcoming</span>
                  <div className="flex items-center gap-1.5 text-warning">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium">Hot Match</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Manchester City vs Liverpool</CardTitle>
                <CardDescription>Premier League - Matchday 12</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-6">
                  <div className="text-center space-y-2">
                    <div className="h-14 w-14 rounded-full bg-muted/50 mx-auto ring-2 ring-border/50" />
                    <p className="text-label">Man City</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-heading-lg text-foreground-muted">VS</p>
                    <p className="text-caption mt-1">Tomorrow, 20:00</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="h-14 w-14 rounded-full bg-muted/50 mx-auto ring-2 ring-border/50" />
                    <p className="text-label">Liverpool</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="flex-1">
                  Set Reminder
                </Button>
                <Button size="sm" className="flex-1">
                  Get Tickets
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* Buttons Demo */}
        <Section title="Button Variants">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button isLoading>Loading</Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
        </Section>

        {/* Input Demo */}
        <Section title="Form Elements">
          <div className="grid gap-5 md:grid-cols-2">
            <Input 
              label="Email Address" 
              placeholder="you@example.com" 
              type="email"
            />
            <Input 
              label="Password" 
              placeholder="Enter your password" 
              type="password"
              hint="Must be at least 8 characters"
            />
            <Input 
              label="Username" 
              placeholder="Choose a username" 
              error="This username is already taken"
            />
            <Input 
              label="Disabled Input" 
              placeholder="Cannot edit this" 
              disabled
            />
          </div>
        </Section>

        {/* Dialogs Demo */}
        <Section title="Sheets and Modals">
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>
              Open Sheet
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </div>
        </Section>

        {/* States Demo */}
        <Section title="Loading and Empty States">
          <div className="grid gap-6 md:grid-cols-2">
            <Card padding="none" variant="default">
              <LoadingState text="Loading matches..." />
            </Card>
            <Card padding="none" variant="default">
              <EmptyState
                variant="search"
                title="No results found"
                description="Try adjusting your search or filters to find what you are looking for."
                action={<Button variant="secondary" size="sm">Clear Filters</Button>}
              />
            </Card>
          </div>
        </Section>

        {/* Skeleton Demo */}
        <Section title="Skeleton Loaders">
          <div className="grid gap-4 md:grid-cols-2">
            <SkeletonCard />
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Section>
      </PageContainer>

      {/* Sheet */}
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Match Details"
        description="View full information about this match"
      >
        <div className="space-y-4">
          <p className="text-body-md text-foreground-muted">
            This is a bottom sheet component perfect for mobile interactions, 
            filters, and additional options.
          </p>
          <Button className="w-full" onClick={() => setSheetOpen(false)}>
            Got It
          </Button>
        </div>
      </Sheet>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Welcome to BigFana"
        description="Join millions of passionate sports fans"
      >
        <div className="space-y-4">
          <p className="text-body-md text-foreground-muted">
            This is a centered modal dialog for important actions and confirmations.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => setModalOpen(false)}>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
