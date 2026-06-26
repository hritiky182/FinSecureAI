import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { securityWidgets, incidents } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";


const attackTrend = Array.from({ length: 14 }, (_, i) => ({
  d: `D${i + 1}`,
  attempts: 200 + Math.round(Math.random() * 400),
  blocked: 180 + Math.round(Math.random() * 380),
}));

export default function CyberPage() {
  return (
    <div>
      <PageHeader title="Security Operations Center" subtitle="Live security telemetry and active threats" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {securityWidgets.map((w) => (
          <div key={w.name} className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground">{w.name}</div>
            <div className="mt-1 text-3xl font-semibold">{w.value}</div>
            <Badge variant="outline" className={`mt-2 ${severityBadgeClass(w.severity)}`}>{w.severity}</Badge>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Threat Origin Map" description="Geo-distributed attack signals" className="lg:col-span-2">
          <div className="h-72 relative rounded-lg overflow-hidden border bg-gradient-to-br from-sidebar/60 to-card">
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-90">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#grid)" />
              {[[150, 120],[300, 90],[420, 200],[540, 140],[640, 260],[200, 280],[700, 180],[380, 320]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={4 + (i % 4) * 2} fill="var(--destructive)" opacity="0.8">
                    <animate attributeName="r" values={`${4 + (i % 4) * 2};${10 + (i % 4) * 2};${4 + (i % 4) * 2}`} dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r="2" fill="var(--destructive)" />
                </g>
              ))}
            </svg>
            <div className="absolute bottom-3 left-3 text-[11px] text-muted-foreground">8 active attack sources detected</div>
          </div>
        </SectionCard>

        <SectionCard title="Incident Feed" description="Live SOC stream">
          <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {incidents.slice(0, 8).map((i) => (
              <li key={i.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate pr-2">{i.title}</span>
                  <Badge variant="outline" className={severityBadgeClass(i.severity)}>{i.severity}</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground">{i.module} · {i.opened}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Attack Trend" description="Attempts vs blocked over the last 14 days">
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={attackTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="d" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="attempts" stroke="var(--destructive)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="blocked" stroke="var(--success)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
