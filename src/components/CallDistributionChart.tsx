import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "./CallVolumeChart";

const COLORS = [
  "#94a3b8",
  "#60a5fa",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#cbd5f5",
];

export default function CallDistributionChart({
  data,
}: {
  data: ChartData[];
}) {
  if (!Array.isArray(data)) return null;

  return (
    <div className="glass-card">
      <h2 className="text-xl font-semibold mb-6 gradient-text">
        Call Distribution
      </h2>

      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="calls"
            nameKey="day"
            innerRadius={90}
            outerRadius={140}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
  contentStyle={{
    backgroundColor: "rgba(2, 6, 23, 0.95)",
    border: "1px solid rgba(99,102,241,0.4)",
    borderRadius: "8px",
    color: "#e5e7eb",
  }}
  itemStyle={{
    color: "#e5e7eb",
    fontWeight: 500,
  }}
  labelStyle={{
    color: "#93c5fd",
    fontWeight: 600,
  }}
/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
