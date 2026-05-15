import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";

export default function MatchesPage() {
  return (
    <AppShell title="Matches">
      <PageContainer className="space-y-8">
        <Section
          title="Today&apos;s Matches"
          subtitle="Live and upcoming games"
        >
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="interactive" padding="lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-overline text-primary">Live</span>
                  </div>
                  <CardTitle>Match {i}</CardTitle>
                  <CardDescription>League Name - Matchday {i}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-4">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-muted mb-2 mx-auto" />
                      <p className="text-label">Team A</p>
                    </div>
                    <div className="text-center">
                      <p className="text-heading-lg text-foreground">0 - 0</p>
                      <p className="text-caption">45&apos;</p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-muted mb-2 mx-auto" />
                      <p className="text-label">Team B</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
