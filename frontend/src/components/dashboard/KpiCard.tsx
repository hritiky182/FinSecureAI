import { ArrowDown, ArrowUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export function KpiCard({
  label, value, suffix, change, trend, tone, data,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  change: number;
  trend: "up" | "down";
  tone: string;
  data: { y: number }[];
}) {
  const positive = trend === "up";
  const toneClass: Record<string, string> = {
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    info: "text-info",
  };
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{label}</div>
        <div className={cn("text-[11px] flex items-center gap-0.5 font-medium", positive ? "text-success" : "text-destructive")}>
          {positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <div className={cn("text-2xl font-semibold tracking-tight", toneClass[tone])}>
            {value}<span className="text-sm text-muted-foreground font-normal">{suffix}</span>
          </div>
        </div>
        <div className="w-20 h-10 -mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="y"
                stroke={positive ? "var(--success)" : "var(--destructive)"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
