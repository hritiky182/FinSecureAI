import { PageHeader, SectionCard } from "@/components/layout/parts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";


export default function SettingsPage() {
  const { theme, toggleTheme } = useAppStore();
  return (
    <div>
      <PageHeader title="Settings" subtitle="Profile, preferences and platform configuration" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Profile">
          <div className="space-y-3">
            <div>
              <Label htmlFor="n">Display name</Label>
              <Input id="n" defaultValue="Alexandra Morgan" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="e">Email</Label>
              <Input id="e" type="email" defaultValue="a.morgan@institution.local" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="t">Title</Label>
              <Input id="t" defaultValue="Chief Risk Officer" className="mt-1" />
            </div>
            <Button size="sm">Save changes</Button>
          </div>
        </SectionCard>

        <SectionCard title="Appearance">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Dark mode</div>
                <div className="text-xs text-muted-foreground">Use the dark color scheme</div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={() => toggleTheme()} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Compact density</div>
                <div className="text-xs text-muted-foreground">Reduce padding across tables and cards</div>
              </div>
              <Switch />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notification preferences">
          <div className="space-y-3">
            {["Critical fraud alerts","Security incidents","Compliance findings","Weekly digest"].map((l) => (
              <div key={l} className="flex items-center justify-between">
                <div className="text-sm">{l}</div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Security">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Two-factor authentication</div>
                <div className="text-xs text-muted-foreground">Required for privileged roles</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Single sign-on</div>
                <div className="text-xs text-muted-foreground">Federate via enterprise IdP</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Button size="sm" variant="outline">Rotate API keys</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
