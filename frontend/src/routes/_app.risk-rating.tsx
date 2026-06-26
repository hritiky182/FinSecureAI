import React from "react";
import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { Badge } from "@/components/ui/badge";


const categories = [
  { name: "Critical", count: 3, sla: "1h", color: "destructive" },
  { name: "High", count: 14, sla: "4h", color: "warning" },
  { name: "Medium", count: 42, sla: "24h", color: "info" },
  { name: "Low", count: 87, sla: "72h", color: "success" },
] as const;

export default function RiskPage() {
  return (
    <div>
      <PageHeader title="Risk Rating Framework"
        subtitle="Severity classification, response SLAs and distribution" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {categories.map((c) => (
          <div key={c.name} className="rounded-xl border bg-card p-5">
            <Badge variant="outline" className={severityBadgeClass(c.name.toLowerCase())}>{c.name}</Badge>
            <div className="mt-3 text-3xl font-semibold">{c.count}</div>
            <div className="text-xs text-muted-foreground">open incidents</div>
            <div className="mt-4 pt-3 border-t text-xs flex items-center justify-between">
              <span className="text-muted-foreground">Response SLA</span>
              <span className="font-medium">{c.sla}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Risk Matrix" description="Likelihood × Impact">
        <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1.5 text-xs">
          <div />
          {["Trivial","Minor","Moderate","Major","Severe"].map((l) => (
            <div key={l} className="text-center text-muted-foreground font-medium py-1.5">{l}</div>
          ))}
          {["Rare","Unlikely","Possible","Likely","Almost Certain"].reverse().map((row, ri) => (
            <React.Fragment key={row}>
              <div className="text-right pr-2 text-muted-foreground font-medium self-center">{row}</div>
              {Array.from({ length: 5 }).map((_, ci) => {
                const score = (4 - ri) + ci;
                const tone =
                  score >= 7 ? "bg-destructive/80 text-destructive-foreground"
                  : score >= 5 ? "bg-warning/80 text-warning-foreground"
                  : score >= 3 ? "bg-info/40 text-foreground"
                  : "bg-success/40 text-foreground";
                const sample = Math.floor(Math.random() * 9);
                return (
                  <div key={`${ri}-${ci}`} className={`${tone} rounded-md aspect-square grid place-items-center font-semibold`}>
                    {sample}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
