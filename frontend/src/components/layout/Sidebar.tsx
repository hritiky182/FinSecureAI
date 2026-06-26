import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Receipt, ShieldAlert, Network, Users, Database,
  ShieldCheck, Scale, FileCheck2, AlertTriangle, Bell, FileText,
  Sparkles, Settings, Activity, Crown, GitCompareArrows,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/executive", label: "Executive View", icon: Crown },
  { to: "/data-intelligence", label: "Data Intelligence", icon: Activity },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/fraud", label: "Fraud Detection", icon: ShieldAlert },
  { to: "/integrations", label: "Integrations", icon: Network },
  { to: "/users", label: "User Monitoring", icon: Users },
  { to: "/database", label: "Database Integrity", icon: Database },
  { to: "/cybersecurity", label: "Cybersecurity", icon: ShieldCheck },
  { to: "/reconciliation", label: "Reconciliation", icon: GitCompareArrows },
  { to: "/compliance", label: "Compliance", icon: Scale },
  { to: "/risk-rating", label: "Risk Rating", icon: FileCheck2 },
  { to: "/incidents", label: "Incidents", icon: AlertTriangle },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-2">
        <div className="size-9 rounded-lg bg-primary/20 grid place-items-center">
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">Sentinel FRI</div>
          <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Risk Intelligence</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border text-[11px] text-sidebar-foreground/60">
        v1.0 · Prototype
      </div>
    </aside>
  );
}
