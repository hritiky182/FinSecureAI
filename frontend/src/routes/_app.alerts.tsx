import { useState } from "react";
import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { alerts } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Eye, UserPlus, Search } from "lucide-react";


export default function AlertsPage() {
  const [sev, setSev] = useState("all");
  const [mod, setMod] = useState("all");
  const list = alerts.filter((a) => (sev === "all" || a.severity === sev) && (mod === "all" || a.module === mod));

  return (
    <div>
      <PageHeader title="Real-Time Alerts" subtitle={`${list.length} active alerts across all modules`} />

      <SectionCard className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select value={sev} onValueChange={setSev}>
            <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mod} onValueChange={setMod}>
            <SelectTrigger><SelectValue placeholder="Module" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modules</SelectItem>
              {["Cybersecurity","Database","Fraud","Integrations","Users"].map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="24h">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Mark all as read</Button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((a) => (
          <div key={a.id} className={`rounded-xl border bg-card p-4 ${a.read ? "opacity-70" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={severityBadgeClass(a.severity)}>{a.severity}</Badge>
                  <Badge variant="secondary" className="text-[10px]">{a.module}</Badge>
                  {!a.read && <span className="size-1.5 rounded-full bg-primary" />}
                </div>
                <div className="font-medium mt-2">{a.title}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{a.id} · {a.opened} · {a.assignee}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="ghost" className="h-8"><Eye className="size-3.5 mr-1.5" />Mark read</Button>
              <Button size="sm" variant="ghost" className="h-8"><UserPlus className="size-3.5 mr-1.5" />Assign</Button>
              <Button size="sm" className="h-8 ml-auto"><Search className="size-3.5 mr-1.5" />Investigate</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
