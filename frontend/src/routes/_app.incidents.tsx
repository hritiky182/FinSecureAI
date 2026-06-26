import { useState } from "react";
import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { incidents } from "@/mock/data";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";


export default function IncPage() {
  const [active, setActive] = useState<typeof incidents[number] | null>(null);
  return (
    <div>
      <PageHeader title="Incident Management" subtitle="Investigations, evidence and case workflow" />

      <SectionCard>
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Module</th>
                <th className="text-left p-3">Severity</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Assignee</th>
                <th className="text-left p-3">Opened</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} onClick={() => setActive(i)} className="border-t hover:bg-accent/40 cursor-pointer">
                  <td className="p-3 font-mono text-xs">{i.id}</td>
                  <td className="p-3 font-medium">{i.title}</td>
                  <td className="p-3 text-muted-foreground">{i.module}</td>
                  <td className="p-3"><Badge variant="outline" className={severityBadgeClass(i.severity)}>{i.severity}</Badge></td>
                  <td className="p-3">{i.status}</td>
                  <td className="p-3">{i.assignee}</td>
                  <td className="p-3 text-xs text-muted-foreground">{i.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="sm:max-w-lg p-5 overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Badge variant="outline" className={severityBadgeClass(active.severity)}>{active.severity}</Badge>
                  <span className="font-mono text-sm">{active.id}</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold">{active.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{active.module} · Assigned to {active.assignee} · Opened {active.opened}</p>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase text-muted-foreground mb-2">Investigation timeline</div>
                  <ol className="space-y-3">
                    {[
                      ["Detected", "Anomaly detected by correlation engine"],
                      ["Triaged", "SOC analyst classified severity"],
                      ["Assigned", `Owner set to ${active.assignee}`],
                      ["In progress", "Investigation underway"],
                    ].map(([k, v], i) => (
                      <li key={i} className="flex gap-3">
                        <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div className="text-sm">
                          <span className="font-medium">{k}</span>
                          <span className="text-muted-foreground"> — {v}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase text-muted-foreground mb-2">Evidence</div>
                  <div className="space-y-2 text-sm">
                    {["packet_capture_4421.pcap", "auth_log_export.csv", "screenshot_admin_console.png"].map((f) => (
                      <div key={f} className="flex items-center justify-between rounded-md border p-2">
                        <span className="font-mono text-xs">{f}</span>
                        <Button size="sm" variant="ghost" className="h-7">View</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase text-muted-foreground mb-2">Comments</div>
                  <Textarea placeholder="Add a comment…" className="text-sm" />
                  <Button size="sm" className="mt-2">Post</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
