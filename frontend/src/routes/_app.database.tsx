import { PageHeader, SectionCard } from "@/components/layout/parts";
import { databaseStats, dbChanges } from "@/mock/data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";


const health = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  queries: 8000 + Math.round(Math.sin(i / 3) * 1800 + Math.random() * 600),
  errors: Math.round(Math.random() * 12),
}));

export default function DBPage() {
  return (
    <div>
      <PageHeader title="Database Integrity Monitoring"
        subtitle="Continuous monitoring of schema, configuration and record-level changes" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {databaseStats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{s.change} vs prior 24h</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Query Volume" description="Last 24 hours" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={health}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="hour" fontSize={10} stroke="var(--muted-foreground)" />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="queries" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="errors" stroke="var(--destructive)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Integrity Score">
          <div className="text-6xl font-semibold text-success">98.6%</div>
          <p className="text-sm text-muted-foreground mt-2">No critical integrity drift detected across monitored tables in the last 24 hours.</p>
        </SectionCard>
      </div>

      <SectionCard title="Change History">
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Change ID</th>
                <th className="text-left p-3">Table</th>
                <th className="text-left p-3">Action</th>
                <th className="text-left p-3">User</th>
                <th className="text-right p-3">Rows</th>
                <th className="text-left p-3">When</th>
              </tr>
            </thead>
            <tbody>
              {dbChanges.map((c) => (
                <tr key={c.id} className="border-t hover:bg-accent/40">
                  <td className="p-3 font-mono text-xs">{c.id}</td>
                  <td className="p-3 font-mono">{c.table}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={c.action === "DELETE" || c.action === "ALTER" ? "border-destructive/40 text-destructive" : ""}>
                      {c.action}
                    </Badge>
                  </td>
                  <td className="p-3">{c.user}</td>
                  <td className="p-3 text-right">{c.rows.toLocaleString()}</td>
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
