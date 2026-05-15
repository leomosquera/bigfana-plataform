"use client";

import { useState } from "react";
import { ArrowRight, Play, Star, ChevronRight, Trophy, Users, Zap } from "lucide-react";
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
      {/* Hero Section */}
      <HeroSection height="lg" overlayIntensity={70}>
        <PageContainer className="pb-8">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live Now
            </div>
            
            <h1 className="text-display-xl text-foreground text-balance max-w-lg">
              Experience Football Like Never Before
            </h1>
            
            <p className="text-body-lg text-foreground-muted max-w-md">
              Join millions of passionate fans. Get live updates, exclusive content, and connect with your community.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg">
                <Play className="h-4 w-4" />
                Watch Highlights
              </Button>
            </div>
          </div>
        </PageContainer>
      </HeroSection>

      <PageContainer className="space-y-10">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Trophy, label: "Live Matches", value: "24" },
            { icon: Users, label: "Active Fans", value: "1.2M" },
            { icon: Zap, label: "Events Today", value: "156" },
          ].map((stat) => (
            <Card key={stat.label} variant="glass" padding="md" className="text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-heading-md text-foreground">{stat.value}</p>
              <p className="text-caption">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Controls Demo */}
        <Section title="Quick Filters">
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
        </Section>

        {/* Cards Demo */}
        <Section 
          title="Featured Matches" 
          subtitle="Top games happening right now"
          action={
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Card variant="interactive" padding="lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-overline text-primary">Live</span>
                </div>
                <CardTitle>Barcelona vs Real Madrid</CardTitle>
                <CardDescription>La Liga - Matchday 15</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-4">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted mb-2" />
                    <p className="text-label">Barcelona</p>
                  </div>
                  <div className="text-center">
                    <p className="text-display-md text-foreground">2 - 1</p>
                    <p className="text-caption">78&apos;</p>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted mb-2" />
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

            <Card variant="highlight" padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-overline">Upcoming</span>
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                </div>
                <CardTitle>Manchester City vs Liverpool</CardTitle>
                <CardDescription>Premier League - Matchday 12</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-4">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted mb-2" />
                    <p className="text-label">Man City</p>
                  </div>
                  <div className="text-center">
                    <p className="text-heading-md text-foreground-muted">VS</p>
                    <p className="text-caption">Tomorrow, 20:00</p>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted mb-2" />
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
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button isLoading>Loading</Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </Section>

        {/* Input Demo */}
        <Section title="Form Elements">
          <div className="grid gap-4 md:grid-cols-2">
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
            <Card padding="none">
              <LoadingState text="Loading matches..." />
            </Card>
            <Card padding="none">
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
