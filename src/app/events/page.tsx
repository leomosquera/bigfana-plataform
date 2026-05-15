import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/ui";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsPage() {
  return (
    <AppShell title="Events">
      <PageContainer className="space-y-8">
        <Section
          title="Upcoming Events"
          subtitle="Fan experiences and gatherings"
        >
          <div className="grid gap-4">
            {[
              {
                title: "Fan Meet & Greet",
                date: "Dec 20, 2024",
                time: "18:00",
                location: "Stadium North Gate",
              },
              {
                title: "Watch Party: El Clasico",
                date: "Dec 21, 2024",
                time: "21:00",
                location: "Fan Zone Arena",
              },
              {
                title: "Youth Academy Open Day",
                date: "Dec 22, 2024",
                time: "10:00",
                location: "Training Ground",
              },
            ].map((event, i) => (
              <Card key={i} variant="interactive" padding="lg">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-foreground-muted">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground-muted">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground-muted">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
