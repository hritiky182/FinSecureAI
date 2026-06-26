import { PageHeader, SectionCard, severityBadgeClass } from "@/components/layout/parts";
import { notifications } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const categories = ["All", "Fraud", "Security", "Compliance", "System Alerts"];

export default function NotifPage() {
  return (
    <div>
      <PageHeader title="Notification Center" subtitle="All system, security and compliance notifications" />

      <Tabs defaultValue="All">
        <TabsList className="mb-4">
          {categories.map((c) => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}
        </TabsList>
        {categories.map((c) => (
          <TabsContent key={c} value={c}>
            <SectionCard>
              <ul className="divide-y -m-5">
                {notifications
                  .filter((n) => c === "All" || n.category === c)
                  .map((n) => (
                  <li key={n.id} className="p-4 flex items-center gap-3">
                    <Badge variant="outline" className={severityBadgeClass(n.severity)}>{n.severity}</Badge>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-[11px] text-muted-foreground">{n.category} · {n.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
