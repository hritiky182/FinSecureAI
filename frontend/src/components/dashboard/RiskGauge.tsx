import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function RiskGauge({ score }: { score: number }) {
  const tone =
    score < 30 ? "var(--success)" :
    score < 60 ? "var(--warning)" :
    score < 80 ? "oklch(0.7 0.2 50)" :
    "var(--destructive)";
  const label =
    score < 30 ? "Low Risk" : score < 60 ? "Moderate" : score < 80 ? "Elevated" : "Critical";

  const data = [
    { name: "score", value: score },
    { name: "rest", value: 100 - score },
  ];
  return (
    <div className="relative w-full h-56">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            startAngle={210}
            endAngle={-30}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={tone} />
            <Cell fill="var(--muted)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-5xl font-semibold tracking-tight" style={{ color: tone }}>{score}</div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">Overall Risk Score</div>
      </div>
    </div>
  );
}
