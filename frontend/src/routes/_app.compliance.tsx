import { PageHeader, SectionCard } from "@/components/layout/parts";
import { complianceModules, complianceTimeline } from "@/mock/data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";


const findings = [
  { id: "FND-901", area: "AML", title: "Transaction not screened against updated watchlist", severity: "high" },
  { id: "FND-902", area: "KYC", title: "Missing periodic refresh for 12 customer files", severity: "medium" },
  { id: "FND-903", area: "Data Protection", title: "PII access without business justification", severity: "high" },
  { id: "FND-904", area: "Internal Policy", title: "Approval threshold breached on funds transfer", severity: "low" },
];

export default function CompPage() {
  return (
    <div>
      <PageHeader title="Compliance Monitoring"
        subtitle="AML, KYC, Data Protection and internal policy adherence" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {complianceModules.map((c) => (
          <div key={c.name} className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground">{c.name}</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-3xl font-semibold text-success">{c.score}<span className="text-base text-muted-foreground">%</span></div>
              <div className="text-xs text-muted-foreground">{c.findings} findings</div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: `${c.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Compliance Score Timeline" description="Trailing 12 months" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={complianceTimeline}>
                <defs>
                  <linearGradient id="comp" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={11} stroke="var(--muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--muted-foreground)" domain={[70, 100]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="score" stroke="var(--success)" fill="url(#comp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Audit Findings">
          <ul className="space-y-3 text-sm">
            {findings.map((f) => (
              <li key={f.id} className="border-l-2 pl-3 border-warning">
                <div className="font-medium">{f.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{f.area} · {f.id}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
