import { PageHeader, SectionCard } from "@/components/layout/parts";
import { reconciliation, reconMetrics } from "@/mock/data";
import { cn } from "@/lib/utils";


export default function ReconPage() {
  return (
    <div>
      <PageHeader title="Reconciliation Intelligence"
        subtitle="Settlement, posting and discrepancy monitoring across funds movement" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {reconMetrics.map((m) => (
          <div key={m.label} className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground">{m.label}</div>
            <div className={cn(
              "mt-1 text-2xl font-semibold",
              m.tone === "destructive" && "text-destructive",
              m.tone === "warning" && "text-warning",
            )}>{m.value}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Settlement Reconciliation">
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Source</th>
                <th className="text-right p-3">Expected</th>
                <th className="text-right p-3">Actual</th>
                <th className="text-right p-3">Variance</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reconciliation.map((r) => (
                <tr key={r.source} className="border-t hover:bg-accent/40">
                  <td className="p-3 font-medium">{r.source}</td>
                  <td className="p-3 text-right tabular-nums">${r.expected.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums">${r.actual.toLocaleString()}</td>
                  <td className={cn("p-3 text-right tabular-nums font-medium",
                    r.diff < 0 ? "text-destructive" : r.diff > 0 ? "text-warning" : "text-success")}>
                    {r.diff > 0 ? "+" : ""}{r.diff.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs",
                      r.status === "ok" ? "text-success" : "text-warning")}>
                      <span className={cn("size-2 rounded-full",
                        r.status === "ok" ? "bg-success" : "bg-warning")} />
                      {r.status === "ok" ? "Reconciled" : "Variance flagged"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
