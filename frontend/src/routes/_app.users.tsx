import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { privilegedUsers } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";


const timeline = [
  { time: "14:22", user: "Sade Adeyemi", action: "Performed schema alteration on customers table", risk: "high" },
  { time: "13:58", user: "Liam Bennett", action: "Granted temporary admin role to USR-2031", risk: "critical" },
  { time: "12:41", user: "Mei Chen", action: "Exported audit logs for Q2 review", risk: "low" },
  { time: "11:05", user: "Tariq Ibrahim", action: "Logged in from new device (Linux Terminal)", risk: "medium" },
  { time: "09:12", user: "Amara Okafor", action: "Updated payment gateway configuration", risk: "high" },
];

export default function UsersPage() {
  return (
    <div>
      <PageHeader title="Privileged User Monitoring" subtitle="Activity, devices and risk for all elevated accounts" />

      <SectionCard className="mb-4">
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Last Login</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Device</th>
                <th className="text-left p-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {privilegedUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-accent/40">
                  <td className="p-3">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{u.id}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{u.role}</td>
                  <td className="p-3">{u.lastLogin}</td>
                  <td className="p-3 text-muted-foreground">{u.location}</td>
                  <td className="p-3 text-muted-foreground">{u.device}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={severityBadgeClass(u.riskLevel)}>
                      {u.risk}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Activity Timeline" description="Last 24 hours">
          <ol className="relative space-y-4 ml-3">
            {timeline.map((t, i) => (
              <li key={i} className="relative pl-6">
                <div className="absolute left-0 top-1.5 size-2.5 rounded-full bg-primary" />
                {i < timeline.length - 1 && <div className="absolute left-[5px] top-4 bottom-[-1rem] w-px bg-border" />}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm"><span className="font-medium">{t.user}</span> — {t.action}</div>
                    <div className="text-[11px] text-muted-foreground">{t.time}</div>
                  </div>
                  <Badge variant="outline" className={severityBadgeClass(t.risk)}>{t.risk}</Badge>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard title="Privilege Escalation Alerts" description="Roles elevated outside change window">
          <div className="space-y-3">
            {[
              { user: "USR-2031", from: "Analyst", to: "Admin", time: "14h ago" },
              { user: "USR-2009", from: "Operator", to: "DB Admin", time: "1d ago" },
              { user: "USR-2017", from: "Auditor", to: "Security Engineer", time: "2d ago" },
            ].map((a) => (
              <div key={a.user} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="size-9 rounded-lg bg-destructive/15 text-destructive grid place-items-center">
                  <ShieldAlert className="size-4" />
                </div>
                <div className="flex-1 text-sm">
                  <div><span className="font-mono text-xs">{a.user}</span> escalated <span className="text-muted-foreground">{a.from}</span> → <span className="font-medium">{a.to}</span></div>
                  <div className="text-[11px] text-muted-foreground">{a.time}</div>
                </div>
                <Badge variant="outline" className={severityBadgeClass("high")}>High</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
