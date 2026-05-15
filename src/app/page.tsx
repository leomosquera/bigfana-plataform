"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Play, 
  ChevronRight, 
  Trophy, 
  Users, 
  Zap, 
  TrendingUp, 
  Clock, 
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Flame,
  Star,
  Calendar
} from "lucide-react";
import { AppShell, PageContainer, Section, HeroSection } from "@/components/shell";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  SegmentedControl,
  FilterChips,
} from "@/components/ui";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>(["live"]);

  return (
    <AppShell>
      {/* Cinematic Hero with Stadium Atmosphere */}
      <div className="relative min-h-[85vh] lg:min-h-[90vh] stadium-atmosphere noise-texture">
        {/* Stadium lighting effects */}
        <div className="stadium-lights animate-breathe" />
        
        {/* Ambient glow sources */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-breathe" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '1s' }} />
        
        {/* Subtle crowd silhouette at bottom */}
        <div className="crowd-silhouette animate-crowd" />
        
        {/* Spotlight sweep effect */}
        <div className="spotlight-beam animate-spotlight opacity-30" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60 z-10" />

        <HeroSection height="full" overlayIntensity={0} className="relative z-20">
          <PageContainer className="pb-20 lg:pb-28 pt-20 lg:pt-32">
            <div className="max-w-3xl animate-fade-up">
              {/* Live badge with enhanced animation */}
              <div className="flex items-center gap-4 mb-8">
                <div className="live-badge rounded-full bg-primary/10 border border-primary/20 px-4 py-2">
                  <div className="live-dot" />
                  <span className="text-xs font-semibold text-primary tracking-wide relative z-10">LIVE NOW</span>
                </div>
                <span className="text-overline">El Clasico 2024 - Camp Nou</span>
              </div>
              
              {/* Hero headline */}
              <h1 className="text-display-xl text-foreground mb-6">
                The Beautiful Game,{" "}
                <span className="text-foreground-muted">Reimagined.</span>
              </h1>
              
              <p className="text-body-lg text-foreground-muted max-w-xl mb-10">
                Experience football like never before. Live scores, exclusive content, 
                and a global community of passionate fans united by the love of the game.
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

              {/* Live viewer count */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-8 w-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 ring-2 ring-background"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-body-sm text-foreground-muted">
                    <span className="text-foreground font-medium">2.4M</span> fans watching now
                  </span>
                </div>
              </div>
            </div>
          </PageContainer>
        </HeroSection>
      </div>

      <PageContainer className="space-y-12 lg:space-y-20 -mt-24 relative z-30">
        {/* Live Stats Row with ambient glow */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {[
            { icon: Trophy, value: "24", label: "Live Matches", accent: true, pulse: true },
            { icon: Users, value: "1.2M", label: "Active Fans", accent: false, pulse: false },
            { icon: Zap, value: "156", label: "Events Today", accent: false, pulse: false },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className={`
                relative p-4 lg:p-6 rounded-2xl text-center
                ${stat.accent 
                  ? "bg-gradient-to-b from-primary/12 to-primary/4 border border-primary/15 card-live" 
                  : "bg-card/60 border border-border/40 backdrop-blur-xl card-glow-ambient"
                }
                animate-fade-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`h-5 w-5 mx-auto mb-3 ${stat.accent ? "text-primary" : "text-foreground-subtle"}`} />
              <p className={`text-display-md text-foreground mb-1 ${stat.pulse ? "animate-score-flash" : ""}`}>
                {stat.value}
              </p>
              <p className="text-caption">{stat.label}</p>
              {stat.pulse && (
                <div className="absolute -top-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-[10px] font-semibold text-white">
                  <Flame className="h-2.5 w-2.5" />
                  HOT
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Filters */}
        <div className="space-y-4">
          <SegmentedControl
            options={[
              { value: "all", label: "All" },
              { value: "live", label: "Live", badge: "12" },
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
              { value: "trending", label: "Trending", count: 8 },
            ]}
            value={activeFilters}
            onChange={(v) => setActiveFilters(v as string[])}
            multiple
          />
        </div>

        {/* Featured Live Match - Hero card with cinematic treatment */}
        <Section>
          <Card variant="featured" padding="none" className="overflow-hidden card-live">
            <div className="relative">
              {/* Atmospheric background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
              
              <div className="relative p-5 lg:p-8">
                {/* Match header */}
                <div className="flex items-center justify-between mb-6 lg:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="live-badge rounded-full bg-primary/15 border border-primary/20 px-3 py-1.5">
                      <div className="live-dot" />
                      <span className="text-xs font-semibold text-primary relative z-10">LIVE</span>
                    </div>
                    <span className="text-overline">La Liga - Matchday 15</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-foreground-subtle">
                      <Users className="h-3.5 w-3.5" />
                      <span className="text-xs animate-pulse-soft">2.4M watching</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Match content - Teams and score */}
                <div className="flex items-center justify-between py-6 lg:py-10">
                  {/* Home team */}
                  <div className="flex-1 text-center">
                    <div className="relative">
                      <div className="h-16 w-16 lg:h-24 lg:w-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 mx-auto mb-3 lg:mb-4 ring-2 ring-white/10 flex items-center justify-center">
                        <span className="text-2xl lg:text-3xl font-bold text-foreground/80">FCB</span>
                      </div>
                    </div>
                    <p className="text-heading-md text-foreground">Barcelona</p>
                    <p className="text-caption mt-1">Home</p>
                  </div>

                  {/* Score with enhanced animation */}
                  <div className="px-6 lg:px-12 text-center">
                    <p className="text-display-xl text-foreground animate-score-flash">2 - 1</p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Clock className="h-3.5 w-3.5 text-primary animate-pulse-soft" />
                      <span className="text-label text-primary font-semibold">78&apos;</span>
                    </div>
                  </div>

                  {/* Away team */}
                  <div className="flex-1 text-center">
                    <div className="relative">
                      <div className="h-16 w-16 lg:h-24 lg:w-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 mx-auto mb-3 lg:mb-4 ring-2 ring-white/10 flex items-center justify-center">
                        <span className="text-2xl lg:text-3xl font-bold text-foreground/80">RMA</span>
                      </div>
                    </div>
                    <p className="text-heading-md text-foreground">Real Madrid</p>
                    <p className="text-caption mt-1">Away</p>
                  </div>
                </div>

                {/* Recent events ticker */}
                <div className="bg-white/[0.02] rounded-xl p-3 mb-6 border border-white/5">
                  <div className="flex items-center gap-3 text-body-sm">
                    <span className="text-primary font-semibold">72&apos;</span>
                    <span className="text-foreground-muted">GOAL! Barcelona takes the lead through Pedri!</span>
                    <span className="ml-auto text-foreground-subtle">Just now</span>
                  </div>
                </div>

                {/* Match footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-foreground-subtle">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-body-sm">Camp Nou, Barcelona</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-foreground-subtle">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span className="text-body-sm">12.4k comments</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm">Match Stats</Button>
                    <Button size="sm" className="group">
                      Watch Live
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Fan Reactions - Social proof section */}
        <Section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-md text-foreground">Fan Pulse</h3>
            <div className="flex items-center gap-2 text-foreground-subtle">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-body-sm">Trending now</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {[
              { emoji: "What a goal!", count: "2.4k", trending: true },
              { emoji: "Incredible save!", count: "1.8k", trending: false },
              { emoji: "Red card incoming", count: "956", trending: false },
              { emoji: "VAR check", count: "723", trending: false },
            ].map((reaction, i) => (
              <button
                key={i}
                className={`
                  shrink-0 px-4 py-2.5 rounded-full border transition-all duration-200
                  ${reaction.trending 
                    ? "bg-primary/10 border-primary/20 text-primary" 
                    : "bg-white/[0.02] border-white/5 text-foreground-muted hover:bg-white/[0.04]"
                  }
                `}
              >
                <span className="text-body-sm font-medium">{reaction.emoji}</span>
                <span className="ml-2 text-caption">{reaction.count}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* More Live Matches - Horizontal scroll on mobile */}
        <Section 
          title="More Live"
          action={
            <Button variant="ghost" size="sm" className="group">
              See All
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          }
        >
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2">
            {[
              { home: "Man United", away: "Arsenal", score: "1-1", time: "65'", league: "Premier League", viewers: "1.8M" },
              { home: "Juventus", away: "Inter", score: "0-2", time: "82'", league: "Serie A", viewers: "1.2M" },
            ].map((match, index) => (
              <Card 
                key={index} 
                variant="interactive" 
                padding="none"
                className="shrink-0 w-72 lg:w-auto card-live card-glow-ambient"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="live-dot" style={{ transform: 'scale(0.75)' }} />
                      <span className="text-caption text-primary font-medium">LIVE</span>
                    </div>
                    <span className="text-caption">{match.league}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1">
                      <div className="h-10 w-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground/70">{match.home.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <p className="text-body-sm text-foreground truncate">{match.home}</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="text-heading-lg text-foreground">{match.score}</p>
                      <p className="text-caption text-primary">{match.time}</p>
                    </div>
                    <div className="text-center flex-1">
                      <div className="h-10 w-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground/70">{match.away.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <p className="text-body-sm text-foreground truncate">{match.away}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1.5 text-foreground-subtle">
                      <Users className="h-3 w-3" />
                      <span className="text-caption">{match.viewers}</span>
                    </div>
                    <Button variant="ghost" size="sm">Watch</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Upcoming Matches */}
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
          <div className="space-y-2">
            {[
              { home: "Man City", away: "Liverpool", league: "Premier League", time: "Tomorrow, 20:00", viewers: "3.1M expected", hot: true },
              { home: "Bayern", away: "Dortmund", league: "Bundesliga", time: "Sat, 18:30", viewers: "2.8M expected", hot: false },
              { home: "PSG", away: "Marseille", league: "Ligue 1", time: "Sun, 21:00", viewers: "1.9M expected", hot: false },
              { home: "AC Milan", away: "Napoli", league: "Serie A", time: "Sun, 18:00", viewers: "1.4M expected", hot: false },
            ].map((match, index) => (
              <Card 
                key={index} 
                variant="interactive" 
                padding="none"
                className="group card-glow-ambient"
              >
                <div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4">
                  {/* Teams */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex -space-x-1.5">
                      <div className="h-9 w-9 rounded-full bg-white/5 ring-2 ring-background flex items-center justify-center">
                        <span className="text-[10px] font-bold text-foreground/60">{match.home.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-white/5 ring-2 ring-background flex items-center justify-center">
                        <span className="text-[10px] font-bold text-foreground/60">{match.away.slice(0, 3).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-label text-foreground truncate">
                          {match.home} vs {match.away}
                        </p>
                        {match.hot && (
                          <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-[10px] font-semibold text-primary">
                            <Flame className="h-2.5 w-2.5" />
                            HOT
                          </span>
                        )}
                      </div>
                      <p className="text-caption truncate">{match.league}</p>
                    </div>
                  </div>

                  {/* Time & viewers */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-label text-foreground">{match.time}</p>
                    <p className="text-caption">{match.viewers}</p>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Quick Actions */}
        <Section title="Explore">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: Trophy, label: "Leagues", desc: "Follow competitions", color: "text-amber-500" },
              { icon: Users, label: "Community", desc: "Join discussions", color: "text-blue-500" },
              { icon: Zap, label: "Live Events", desc: "Real-time action", color: "text-primary" },
              { icon: TrendingUp, label: "Trending", desc: "What&apos;s hot", color: "text-emerald-500" },
            ].map((item) => (
              <Card 
                key={item.label} 
                variant="interactive" 
                padding="lg" 
                className="group text-center card-glow-ambient"
              >
                <div className="h-12 w-12 rounded-xl bg-white/5 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                  <item.icon className={`h-5 w-5 ${item.color} transition-colors`} />
                </div>
                <p className="text-label text-foreground mb-1">{item.label}</p>
                <p className="text-caption">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Card Variants Demo - Keeping for reference */}
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
