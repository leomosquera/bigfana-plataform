"use client";

import { useState } from "react";
import { ArrowRight, Play, ChevronRight, Trophy, Users, Zap, TrendingUp, Clock, MapPin } from "lucide-react";
import { AppShell, PageContainer, Section, HeroSection } from "@/components/shell";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SegmentedControl,
  FilterChips,
} from "@/components/ui";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>(["live"]);

  return (
    <AppShell>
      {/* Cinematic Hero - Immersive Stadium Atmosphere */}
      <HeroSection height="lg" overlayIntensity={75}>
        <PageContainer className="pb-20 lg:pb-28">
          <div className="max-w-3xl animate-fade-up">
            {/* Editorial overline */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2.5 rounded-full bg-primary/10 border border-primary/20 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-semibold text-primary tracking-wide">LIVE NOW</span>
              </div>
              <span className="text-overline">El Clasico 2024</span>
            </div>
            
            {/* Hero headline - Editorial composition */}
            <h1 className="text-display-xl text-foreground mb-6">
              The Beautiful Game,{" "}
              <span className="text-foreground-muted">Reimagined.</span>
            </h1>
            
            <p className="text-body-lg text-foreground-muted max-w-xl mb-10">
              Experience football like never before. Live scores, exclusive content, 
              and a global community of passionate fans.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="xl" className="group">
                Start Watching
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="ghost" size="xl" className="group">
                <Play className="h-4 w-4" />
                Watch Highlights
              </Button>
            </div>
          </div>
        </PageContainer>
      </HeroSection>

      <PageContainer className="space-y-16 lg:space-y-24">
        {/* Stats Row - Editorial composition, not repetitive boxes */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 -mt-16 relative z-10">
          {[
            { icon: Trophy, value: "24", label: "Live Matches", accent: true },
            { icon: Users, value: "1.2M", label: "Active Fans", accent: false },
            { icon: Zap, value: "156", label: "Events Today", accent: false },
          ].map((stat) => (
            <div 
              key={stat.label}
              className={`
                relative p-5 lg:p-6 rounded-2xl text-center
                ${stat.accent 
                  ? "bg-gradient-to-b from-primary/12 to-primary/4 border border-primary/15" 
                  : "bg-card/60 border border-border/40 backdrop-blur-xl"
                }
              `}
            >
              <stat.icon className={`h-5 w-5 mx-auto mb-3 ${stat.accent ? "text-primary" : "text-foreground-subtle"}`} />
              <p className="text-display-md text-foreground mb-1">{stat.value}</p>
              <p className="text-caption">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Filters - Streamlined */}
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
            ]}
            value={activeFilters}
            onChange={(v) => setActiveFilters(v as string[])}
            multiple
          />
        </div>

        {/* Featured Match - Hero card with cinematic treatment */}
        <Section>
          <Card variant="featured" padding="none" className="overflow-hidden">
            <div className="relative">
              {/* Atmospheric background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
              
              <div className="relative p-6 lg:p-8">
                {/* Match header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="text-xs font-semibold text-primary">LIVE</span>
                    </div>
                    <span className="text-overline">La Liga - Matchday 15</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-subtle">
                    <Users className="h-3.5 w-3.5" />
                    <span className="text-xs">2.4M watching</span>
                  </div>
                </div>

                {/* Match content - Teams and score */}
                <div className="flex items-center justify-between py-6 lg:py-10">
                  {/* Home team */}
                  <div className="flex-1 text-center">
                    <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-white/5 mx-auto mb-4 ring-2 ring-white/10" />
                    <p className="text-heading-md text-foreground">Barcelona</p>
                    <p className="text-caption mt-1">Home</p>
                  </div>

                  {/* Score */}
                  <div className="px-8 lg:px-12 text-center">
                    <p className="text-display-xl text-foreground">2 - 1</p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span className="text-label text-primary">78&apos;</span>
                    </div>
                  </div>

                  {/* Away team */}
                  <div className="flex-1 text-center">
                    <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-white/5 mx-auto mb-4 ring-2 ring-white/10" />
                    <p className="text-heading-md text-foreground">Real Madrid</p>
                    <p className="text-caption mt-1">Away</p>
                  </div>
                </div>

                {/* Match footer */}
                <div className="flex items-center justify-between pt-6 border-t border-border/30">
                  <div className="flex items-center gap-2 text-foreground-subtle">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-body-sm">Camp Nou, Barcelona</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm">Match Stats</Button>
                    <Button size="sm">Watch Live</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Upcoming Matches - Varied composition */}
        <Section 
          title="Coming Up" 
          subtitle="Don&apos;t miss these matches"
          action={
            <Button variant="ghost" size="sm" className="group">
              View Schedule
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          }
        >
          <div className="space-y-3">
            {[
              { home: "Man City", away: "Liverpool", league: "Premier League", time: "Tomorrow, 20:00", viewers: "Expected 3.1M" },
              { home: "Bayern", away: "Dortmund", league: "Bundesliga", time: "Sat, 18:30", viewers: "Expected 2.8M" },
              { home: "PSG", away: "Marseille", league: "Ligue 1", time: "Sun, 21:00", viewers: "Expected 1.9M" },
            ].map((match, index) => (
              <Card 
                key={index} 
                variant="interactive" 
                padding="none"
                className="group"
              >
                <div className="flex items-center gap-4 p-4 lg:p-5">
                  {/* Teams */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex -space-x-2">
                      <div className="h-10 w-10 rounded-full bg-white/5 ring-2 ring-background" />
                      <div className="h-10 w-10 rounded-full bg-white/5 ring-2 ring-background" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-label text-foreground truncate">
                        {match.home} vs {match.away}
                      </p>
                      <p className="text-caption truncate">{match.league}</p>
                    </div>
                  </div>

                  {/* Time & viewers */}
                  <div className="text-right shrink-0">
                    <p className="text-label text-foreground">{match.time}</p>
                    <p className="text-caption">{match.viewers}</p>
                  </div>

                  {/* Action */}
                  <Button variant="ghost" size="sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Quick Actions - Editorial grid */}
        <Section title="Explore">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Trophy, label: "Leagues", desc: "Follow competitions" },
              { icon: Users, label: "Community", desc: "Join discussions" },
              { icon: Zap, label: "Live Events", desc: "Real-time action" },
              { icon: TrendingUp, label: "Trending", desc: "What&apos;s hot" },
            ].map((item) => (
              <Card 
                key={item.label} 
                variant="interactive" 
                padding="lg" 
                className="group text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-white/5 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-5 w-5 text-foreground-muted group-hover:text-primary transition-colors" />
                </div>
                <p className="text-label text-foreground mb-1">{item.label}</p>
                <p className="text-caption">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* UI Components Demo - Streamlined */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button isLoading>Loading</Button>
          </div>
        </Section>

        {/* Card Variants */}
        <Section title="Card Variants">
          <div className="grid md:grid-cols-3 gap-4">
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard surface with subtle border</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="glass" padding="lg">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Frosted glass with blur effect</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="premium" padding="lg">
              <CardHeader>
                <CardTitle>Premium Card</CardTitle>
                <CardDescription>Rich gradient with inner glow</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
