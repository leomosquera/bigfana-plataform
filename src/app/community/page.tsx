import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, EmptyState } from "@/components/ui";
import { Users, MessageCircle, TrendingUp } from "lucide-react";

export default function CommunityPage() {
  return (
    <AppShell title="Community">
      <PageContainer className="space-y-8">
        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: "Members", value: "12.4K" },
            { icon: MessageCircle, label: "Posts Today", value: "847" },
            { icon: TrendingUp, label: "Trending", value: "#ElClasico" },
          ].map((stat) => (
            <Card key={stat.label} variant="glass" padding="md" className="text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-heading-sm text-foreground">{stat.value}</p>
              <p className="text-caption">{stat.label}</p>
            </Card>
          ))}
        </div>

        <Section
          title="Fan Groups"
          subtitle="Connect with supporters"
          action={<Button variant="ghost" size="sm">See All</Button>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Supporters Club", members: "5.2K", posts: 234 },
              { name: "Match Day Chat", members: "3.1K", posts: 89 },
              { name: "Transfer Rumors", members: "8.7K", posts: 456 },
              { name: "Tactical Analysis", members: "2.4K", posts: 67 },
            ].map((group) => (
              <Card key={group.name} variant="interactive" padding="md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Users className="h-6 w-6 text-foreground-muted" />
                    </div>
                    <div>
                      <CardTitle className="text-heading-sm">{group.name}</CardTitle>
                      <CardDescription>{group.members} members</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-caption">{group.posts} posts today</span>
                    <Button variant="secondary" size="sm">Join</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Recent Discussions">
          <EmptyState
            variant="default"
            title="Join the conversation"
            description="Sign in to participate in discussions and connect with other fans."
            action={<Button>Sign In</Button>}
          />
        </Section>
      </PageContainer>
    </AppShell>
  );
}
