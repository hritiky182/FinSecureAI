import { PageHeader, SectionCard } from "@/components/layout/parts";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fraudTrend } from "@/mock/data";
import { exportToCSV, exportToPDF } from "@/lib/export";


const reports = [
  { name: "Executive Risk Report", desc: "Board-ready monthly briefing on institutional risk posture.", type: "Executive" },
  { name: "Fraud Investigation Report", desc: "Open cases, blocked transactions and pattern analysis.", type: "Fraud" },
  { name: "Security Operations Report", desc: "SOC activity, threat trends and incident throughput.", type: "Security" },
  { name: "Compliance Findings Report", desc: "AML, KYC and data-protection findings with remediation status.", type: "Compliance" },
  { name: "Audit Trail Export", desc: "Privileged user activity and configuration changes.", type: "Audit" },
  { name: "Reconciliation Report", desc: "Settlement variances and posting discrepancies.", type: "Reconciliation" },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Pre-built and scheduled report library" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {reports.map((r) => (
          <div key={r.name} className="rounded-xl border bg-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.type}</div>
            <div className="font-semibold mt-1">{r.name}</div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{r.desc}</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => exportToPDF(r.name)}><FileText className="size-3.5 mr-1.5" />PDF</Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => exportToCSV([r], r.name)}><Download className="size-3.5 mr-1.5" />Excel</Button>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Detection Throughput" description="Sample data — fraud cases detected vs blocked">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={fraudTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
              <Bar dataKey="detected" fill="var(--chart-1)" radius={[4,4,0,0]} />
              <Bar dataKey="blocked" fill="var(--chart-3)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
