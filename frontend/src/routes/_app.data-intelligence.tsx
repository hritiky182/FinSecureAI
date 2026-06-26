import { PageHeader, SectionCard, StatusDot } from "@/components/layout/parts";
import { integrations } from "@/mock/data";
import { Badge } from "@/components/ui/badge";


export default function DIPage() {
  return (
    <div>
      <PageHeader title="Universal Data Intelligence"
        subtitle="Connected upstream and downstream systems feeding the platform" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm truncate pr-2">{i.name}</div>
              <Badge variant="outline" className="text-[10px]">
                <StatusDot tone={i.status === "Operational" ? "success" : i.status === "Degraded" ? "warning" : "destructive"} />
                <span className="ml-1.5">{i.status}</span>
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Health</div>
                <div className="font-semibold text-base">{i.health}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Throughput</div>
                <div className="font-semibold text-base">{i.throughput}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Last sync</div>
                <div className="font-medium">{i.lastSync}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Threat</div>
                <div className="font-medium capitalize">{i.threat}</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: `${i.health}%` }} />
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Data Pipeline Telemetry" className="mt-4">
        <div className="text-sm text-muted-foreground">
          All 8 integrations are streaming events into the central correlation engine. End-to-end ingestion latency is currently <span className="text-foreground font-medium">412 ms</span> with no backlog.
        </div>
      </SectionCard>
    </div>
  );
}
