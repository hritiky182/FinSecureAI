import { PageHeader, SectionCard, StatusDot } from "@/components/layout/parts";
import { integrations } from "@/mock/data";
import { Badge } from "@/components/ui/badge";


const apiCalls = integrations.flatMap((i, idx) => Array.from({ length: 3 }, (_, k) => ({
  id: `API-${(idx + 1) * 100 + k}`,
  endpoint: `/v1/${i.name.toLowerCase().replace(/\s+/g, "-")}/event`,
  integration: i.name,
  status: (k === 1 ? 500 : 200),
  latency: 40 + k * 60 + idx * 7,
  time: `${(k + 1) * 7}m ago`,
})));

export default function IntPage() {
  return (
    <div>
      <PageHeader title="Integration Security" subtitle="External and internal integrations under continuous inspection" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {integrations.slice(0, 6).map((i) => (
          <div key={i.name} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{i.name}</div>
              <Badge variant="outline" className="capitalize">
                <StatusDot tone={i.threat === "low" ? "success" : i.threat === "medium" ? "warning" : "destructive"} />
                <span className="ml-1.5">{i.threat} threat</span>
              </Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <Metric label="Security Score" value={`${i.health}`} />
              <Metric label="API Health" value={`${Math.max(80, i.health - 5)}%`} />
              <Metric label="Failed Calls" value={`${Math.round((100 - i.health) * 1.4)}`} />
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Recent API Activity">
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Call ID</th>
                <th className="text-left p-3">Endpoint</th>
                <th className="text-left p-3">Integration</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Latency</th>
                <th className="text-left p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {apiCalls.map((c) => (
                <tr key={c.id} className="border-t hover:bg-accent/40">
                  <td className="p-3 font-mono text-xs">{c.id}</td>
                  <td className="p-3 font-mono text-xs truncate max-w-[260px]">{c.endpoint}</td>
                  <td className="p-3 text-muted-foreground">{c.integration}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={c.status >= 500 ? "border-destructive/40 text-destructive" : "border-success/40 text-success"}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">{c.latency} ms</td>
                  <td className="p-3 text-xs text-muted-foreground">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className="font-semibold text-sm mt-0.5">{value}</div>
    </div>
  );
}
