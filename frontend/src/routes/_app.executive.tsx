import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Printer } from "lucide-react";
import { incidents, riskBreakdown, complianceModules, fraudIndicators } from "@/mock/data";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from "recharts";
import { exportToCSV, exportToPDF } from "@/lib/export";


export default function ExecPage() {
  return (
    <div>
      <PageHeader
        title="Executive Briefing"
        subtitle="Board-ready summary of institutional risk posture"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => exportToPDF("Executive Briefing")}><FileText className="size-4 mr-1.5" />PDF</Button>
            <Button variant="outline" size="sm" onClick={() => exportToCSV(incidents, "Executive_Briefing_Incidents")}><Download className="size-4 mr-1.5" />Excel</Button>
            <Button variant="outline" size="sm" onClick={() => exportToPDF("Executive Briefing")}><Printer className="size-4 mr-1.5" />Print</Button>
          </>
        }
      />

      <SectionCard title="Executive Summary" className="mb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Institutional risk posture is currently <span className="text-warning font-semibold">Elevated (72/100)</span>.
          Cyber health and compliance scores are strong (86 and 94 respectively), while fraud
          indicators show <span className="text-foreground font-medium">142 suspicious activities</span> in the past
          24 hours — a 12.3% increase driven primarily by rapid cash movement on dormant accounts.
          The API Gateway is degraded; remediation is in progress. No critical compliance
          violations are outstanding.
        </p>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Risk Overview">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={riskBreakdown}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" fontSize={11} stroke="var(--muted-foreground)" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} stroke="var(--muted-foreground)" />
                <Radar name="Risk" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Top Incidents" className="lg:col-span-2">
          <div className="divide-y -m-5">
            {incidents.slice(0, 5).map((i) => (
              <div key={i.id} className="p-4 flex items-center gap-3">
                <Badge variant="outline" className={severityBadgeClass(i.severity)}>{i.severity}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{i.title}</div>
                  <div className="text-[11px] text-muted-foreground">{i.module} · {i.assignee} · {i.opened}</div>
                </div>
                <Badge variant="secondary" className="font-mono text-[10px]">{i.id}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Institution Health">
          <Metric k="Uptime" v="99.97%" />
          <Metric k="Mean detection time" v="2m 14s" />
          <Metric k="Mean response time" v="11m 02s" />
          <Metric k="Open incidents" v="14" />
        </SectionCard>
        <SectionCard title="Fraud Overview">
          {fraudIndicators.slice(0, 4).map((f) => (
            <Metric key={f.name} k={f.name} v={`${f.count} cases · risk ${f.score}`} />
          ))}
        </SectionCard>
        <SectionCard title="Compliance Overview">
          {complianceModules.map((c) => (
            <Metric key={c.name} k={c.name} v={`${c.score}% · ${c.findings} findings`} />
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
