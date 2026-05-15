import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { Calendar, MapPin, Clock } from "lucide-react";
import { copy } from "@/lib/i18n";

export default function EventsPage() {
  return (
    <AppShell title={copy.events.pageTitle}>
      <PageContainer className="space-y-8">
        <Section
          title={copy.events.upcomingEvents}
          subtitle={copy.events.upcomingEventsSubtitle}
        >
          <div className="grid gap-4">
            {[
              {
                title: "Fan Meet & Greet",
                date: "20 Dic, 2024",
                time: "18:00",
                location: "Puerta Norte del Estadio",
              },
              {
                title: "Watch Party: El Clásico",
                date: "21 Dic, 2024",
                time: "21:00",
                location: "Fan Zone Arena",
              },
              {
                title: "Día Abierto de la Academia",
                date: "22 Dic, 2024",
                time: "10:00",
                location: "Centro de Entrenamiento",
              },
            ].map((event, i) => (
              <Card key={i} variant="interactive" padding="lg">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>

                  <div className="space-y-2 mt-2">
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
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full">{copy.common.registerNow}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
