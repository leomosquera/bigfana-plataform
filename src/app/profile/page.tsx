import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from "lucide-react";
import { copy } from "@/lib/i18n";

export default function ProfilePage() {
  return (
    <AppShell title={copy.profile.pageTitle}>
      <PageContainer className="space-y-8">
        {/* Profile Header */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <User className="h-10 w-10 text-foreground-muted" />
            </div>
            <div className="flex-1">
              <h2 className="text-heading-lg text-foreground">{copy.auth.guestUser}</h2>
              <p className="text-body-sm text-foreground-muted">{copy.auth.signInForProfile}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button className="flex-1">{copy.auth.signIn}</Button>
            <Button variant="secondary" className="flex-1">{copy.auth.createAccount}</Button>
          </div>
        </Card>

        {/* Quick Settings */}
        <Section title={copy.profile.settingsSection}>
          <Card padding="none">
            {[
              { icon: Bell, label: copy.profile.notifications, href: "/profile/notifications" },
              { icon: Shield, label: copy.profile.privacy, href: "/profile/privacy" },
              { icon: Settings, label: copy.profile.preferences, href: "/profile/preferences" },
            ].map((item, i, arr) => (
              <button
                key={item.label}
                className={`flex w-full items-center justify-between px-5 py-4 text-left hover:bg-card-hover transition-colors ${
                  i < arr.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-foreground-muted" />
                  <span className="text-body-md text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-foreground-subtle" />
              </button>
            ))}
          </Card>
        </Section>

        {/* Account */}
        <Section title={copy.profile.accountSection}>
          <Card padding="md" variant="default">
            <button className="flex w-full items-center gap-3 text-destructive hover:opacity-80 transition-opacity">
              <LogOut className="h-5 w-5" />
              <span className="text-body-md font-medium">{copy.auth.signOut}</span>
            </button>
          </Card>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
