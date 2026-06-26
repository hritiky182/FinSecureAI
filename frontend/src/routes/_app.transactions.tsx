import { useState, useMemo } from "react";
import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Download, Filter } from "lucide-react";
import { transactions } from "@/mock/data";
import { cn } from "@/lib/utils";


export default function TxPage() {
  const [status, setStatus] = useState("all");
  const [branch, setBranch] = useState("all");
  const [risk, setRisk] = useState("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<typeof transactions[number] | null>(null);

  const rows = useMemo(() => transactions.filter((t) => {
    if (status !== "all" && t.status.toLowerCase() !== status) return false;
    if (branch !== "all" && t.branch !== branch) return false;
    if (risk === "high" && t.risk < 70) return false;
    if (risk === "med" && (t.risk < 40 || t.risk >= 70)) return false;
    if (risk === "low" && t.risk >= 40) return false;
    if (q && !`${t.id} ${t.customer}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [status, branch, risk, q]);

  const branches = Array.from(new Set(transactions.map((t) => t.branch)));

  return (
    <div>
      <PageHeader
        title="Transaction Intelligence"
        subtitle={`${rows.length.toLocaleString()} transactions matching current filters`}
        actions={<Button variant="outline" size="sm"><Download className="size-4 mr-1.5" />Export</Button>}
      />

      <SectionCard className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Input placeholder="Search ID or customer" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger><SelectValue placeholder="Branch" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All branches</SelectItem>
              {branches.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={risk} onValueChange={setRisk}>
            <SelectTrigger><SelectValue placeholder="Risk level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any risk</SelectItem>
              <SelectItem value="high">High (70+)</SelectItem>
              <SelectItem value="med">Medium (40–69)</SelectItem>
              <SelectItem value="low">Low (&lt;40)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Filter className="size-4 mr-1.5" />More filters</Button>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="overflow-x-auto -m-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-3 font-medium">Transaction ID</th>
                <th className="text-left p-3 font-medium">Customer</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Channel</th>
                <th className="text-right p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Risk</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 40).map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setActive(t)}
                  className="border-t hover:bg-accent/40 cursor-pointer"
                >
                  <td className="p-3 font-mono text-xs">{t.id}</td>
                  <td className="p-3">{t.customer}</td>
                  <td className="p-3 text-muted-foreground">{t.type}</td>
                  <td className="p-3 text-muted-foreground">{t.channel}</td>
                  <td className="p-3 text-right font-medium">${t.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn("h-full",
                            t.risk > 70 ? "bg-destructive" : t.risk > 40 ? "bg-warning" : "bg-success")}
                          style={{ width: `${t.risk}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{t.risk}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn(
                      "text-[10px]",
                      t.status === "Flagged" && severityBadgeClass("critical"),
                      t.status === "Pending" && severityBadgeClass("medium"),
                      t.status === "Declined" && severityBadgeClass("high"),
                      t.status === "Approved" && severityBadgeClass("low"),
                    )}>{t.status}</Badge>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">No transactions match the current filters.</div>
          )}
        </div>
      </SectionCard>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="sm:max-w-md p-5">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-mono text-base">{active.id}</SheetTitle>
                <SheetDescription>{active.customer} · {active.channel}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4 text-sm">
                <Row k="Amount" v={`$${active.amount.toLocaleString()}`} />
                <Row k="Type" v={active.type} />
                <Row k="Branch" v={active.branch} />
                <Row k="Status" v={active.status} />
                <Row k="Risk Score" v={`${active.risk}/100`} />
                <Row k="Time" v={active.time} />
                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground mb-2">Risk signals</div>
                  <ul className="space-y-1.5 text-xs">
                    <li>• Velocity above 90th percentile for customer profile</li>
                    <li>• Channel/device mismatch vs historical baseline</li>
                    <li>• Beneficiary account onboarded within 30 days</li>
                  </ul>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">Mark as reviewed</Button>
                  <Button size="sm" className="flex-1">Open investigation</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-right">{v}</span>
    </div>
  );
}
