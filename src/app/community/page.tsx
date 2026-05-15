import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, EmptyState } from "@/components/ui";
import { Users, MessageCircle, TrendingUp } from "lucide-react";
import { copy } from "@/lib/i18n";

export default function CommunityPage() {
  return (
    <AppShell title={copy.community.pageTitle}>
      <PageContainer className="space-y-8">
        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: copy.community.members, value: "12.4K" },
            { icon: MessageCircle, label: copy.community.postsToday, value: "847" },
            { icon: TrendingUp, label: copy.common.trending, value: "#ElClásico" },
          ].map((stat) => (
            <Card key={stat.label} variant="glass" padding="md" className="text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-heading-sm text-foreground">{stat.value}</p>
              <p className="text-caption">{stat.label}</p>
            </Card>
          ))}
        </div>

        <Section
          title={copy.community.fanGroups}
          subtitle={copy.community.fanGroupsSubtitle}
          action={<Button variant="ghost" size="sm">{copy.common.seeAll}</Button>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Club de Hinchas", members: "5.2K", posts: 234 },
              { name: "Chat del Partido", members: "3.1K", posts: 89 },
              { name: "Rumores de Fichajes", members: "8.7K", posts: 456 },
              { name: "Análisis Táctico", members: "2.4K", posts: 67 },
            ].map((group) => (
              <Card key={group.name} variant="interactive" padding="md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Users className="h-6 w-6 text-foreground-muted" />
                    </div>
                    <div>
                      <CardTitle className="text-heading-sm">{group.name}</CardTitle>
                      <CardDescription>{group.members} {copy.community.members.toLowerCase()}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-caption">{group.posts} {copy.community.postsCount}</span>
                    <Button variant="secondary" size="sm">{copy.common.join}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title={copy.community.recentDiscussions}>
          <EmptyState
            variant="default"
            title={copy.community.joinConversationTitle}
            description={copy.community.joinConversationDesc}
            action={<Button>{copy.auth.signIn}</Button>}
          />
        </Section>
      </PageContainer>
    </AppShell>
  );
}
