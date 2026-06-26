import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { fraudIndicators, fraudHeatmap, fraudTrend } from "@/mock/data";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


export default function FraudPage() {
  return (
    <div>
      <PageHeader title="Fraud Detection" subtitle="Behavioral signals across accounts, customers and channels" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {fraudIndicators.map((f) => (
          <div key={f.name} className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground">{f.name}</div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-2xl font-semibold">{f.count}</div>
              <div className={cn("text-xs flex items-center gap-0.5",
                f.trend === "up" ? "text-destructive" : "text-success")}>
                {f.trend === "up" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                {f.score}
              </div>
            </div>
            <div className="h-1.5 mt-3 bg-muted rounded-full overflow-hidden">
              <div className={cn("h-full",
                f.score > 75 ? "bg-destructive" : f.score > 50 ? "bg-warning" : "bg-success")}
                style={{ width: `${f.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SectionCard title="Fraud Trend" description="Detected vs blocked, 12 months">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={fraudTrend}>
                <defs>
                  <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={11} stroke="var(--muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="detected" stroke="var(--destructive)" fill="url(#fg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Activity Heatmap" description="Suspicious events by hour & day">
          <div className="grid grid-cols-24 gap-0.5" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
            {fraudHeatmap.map((c, i) => (
              <div
                key={i}
                title={`Day ${c.day + 1}, ${c.hour}:00 — ${c.value}`}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor:
                    c.value > 75 ? "var(--destructive)"
                    : c.value > 50 ? "var(--warning)"
                    : c.value > 25 ? "var(--info)"
                    : "var(--muted)",
                  opacity: 0.3 + (c.value / 100) * 0.7,
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-3 justify-end">
            <span>Low</span>
            <div className="flex gap-0.5">
              {[0.3, 0.5, 0.7, 0.9].map((o, i) => (
                <div key={i} className="size-3 rounded-sm" style={{ background: "var(--destructive)", opacity: o }} />
              ))}
            </div>
            <span>High</span>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Open Investigations">
        <div className="divide-y -m-5">
          {fraudIndicators.map((f, i) => (
            <div key={f.name} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-sm">{f.name}</div>
                <div className="text-xs text-muted-foreground">Pattern detected across {f.count} entities</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={severityBadgeClass(
                  f.score > 75 ? "critical" : f.score > 50 ? "high" : "medium",
                )}>Risk {f.score}</Badge>
                <Badge variant="secondary">CASE-{4000 + i}</Badge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
