import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6">
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function SectionCard({
  title, description, action, children, className,
}: {
  title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card/70 backdrop-blur-md text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div>
            {title && <h2 className="font-semibold text-sm tracking-tight uppercase text-muted-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function StatusDot({ tone = "success" }: { tone?: "success" | "warning" | "destructive" | "info" | "muted" }) {
  const map = {
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    info: "bg-info",
    muted: "bg-muted-foreground",
  };
  return <span className={cn("inline-block size-2 rounded-full", map[tone])} />;
}

export function severityBadgeClass(sev: string) {
  const m: Record<string, string> = {
    critical: "bg-destructive/15 text-destructive border-destructive/30",
    high: "bg-warning/15 text-warning border-warning/30",
    medium: "bg-info/15 text-info border-info/30",
    low: "bg-success/15 text-success border-success/30",
  };
  return m[sev] ?? "bg-muted text-muted-foreground";
}
