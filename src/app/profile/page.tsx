import { AppShell, PageContainer, Section } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, EmptyState } from "@/components/ui";
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      <PageContainer className="space-y-8">
        {/* Profile Header */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <User className="h-10 w-10 text-foreground-muted" />
            </div>
            <div className="flex-1">
              <h2 className="text-heading-lg text-foreground">Guest User</h2>
              <p className="text-body-sm text-foreground-muted">Sign in to access your profile</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button className="flex-1">Sign In</Button>
            <Button variant="secondary" className="flex-1">Create Account</Button>
          </div>
        </Card>

        {/* Quick Settings */}
        <Section title="Settings">
          <Card padding="none">
            {[
              { icon: Bell, label: "Notifications", href: "/profile/notifications" },
              { icon: Shield, label: "Privacy", href: "/profile/privacy" },
              { icon: Settings, label: "Preferences", href: "/profile/preferences" },
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

        {/* Danger Zone */}
        <Section title="Account">
          <Card padding="md" variant="default">
            <button className="flex w-full items-center gap-3 text-destructive hover:opacity-80 transition-opacity">
              <LogOut className="h-5 w-5" />
              <span className="text-body-md font-medium">Sign Out</span>
            </button>
          </Card>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
