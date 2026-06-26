import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/layout/parts";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RiskGauge } from "@/components/dashboard/RiskGauge";
import { kpis, sparkData, txnVolume, fraudTrend, riskTrend, riskBreakdown } from "@/mock/data";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import { useAppStore } from "@/store/app-store";
import { exportToCSV, exportToPDF } from "@/lib/export";


export default function Dashboard() {
  const role = useAppStore((s) => s.role);
  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        subtitle={`${role} view — institution-wide risk, fraud and compliance intelligence`}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => exportToPDF("Executive Dashboard")}><FileText className="size-4 mr-1.5" />PDF</Button>
            <Button variant="outline" size="sm" onClick={() => exportToCSV(kpis, "Executive_Dashboard_KPIs")}><Download className="size-4 mr-1.5" />Excel</Button>
          </>
        }
      />

      <motion.div
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.04 } } }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        {kpis.map((k, i) => (
          <motion.div key={k.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <KpiCard {...k} data={sparkData(i + 1)} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Overall Risk Posture" description="Aggregated across all modules">
          <RiskGauge score={72} />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              ["Low", "0–29", "bg-success"],
              ["Moderate", "30–59", "bg-warning"],
              ["Elevated", "60–79", "bg-orange-500"],
              ["Critical", "80–100", "bg-destructive"],
            ].map(([l, r, c]) => (
              <div key={l} className="text-center">
                <div className={`h-1.5 rounded-full ${c} mb-1.5`} />
                <div className="text-[11px] font-medium">{l}</div>
                <div className="text-[10px] text-muted-foreground">{r}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Institution Risk Breakdown" className="lg:col-span-2" description="Multi-dimensional risk factor analysis">
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={riskBreakdown}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} stroke="var(--border)" />
                <Radar name="Risk Index" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SectionCard title="Transaction Volume" description="Last 14 days, flagged vs total">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={txnVolume}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="volume" stroke="var(--chart-1)" fill="url(#g1)" />
                <Area type="monotone" dataKey="flagged" stroke="var(--destructive)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Fraud Detected vs Blocked" description="Trailing 12 months">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={fraudTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="detected" fill="var(--chart-5)" radius={[4,4,0,0]} />
                <Bar dataKey="blocked" fill="var(--chart-3)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Risk Score Trend" description="Rolling 30-day overall risk index">
        <div className="h-56">
          <ResponsiveContainer>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[40, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
