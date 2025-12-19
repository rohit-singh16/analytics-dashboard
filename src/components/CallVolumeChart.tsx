import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export type ChartData = {
  day: string;
  calls: number;
};

export default function CallVolumeChart({ data }: { data: ChartData[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <h2 className="text-xl font-semibold mb-8 gradient-text">
        Weekly Call Volume
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
  contentStyle={{
    backgroundColor: "rgba(2, 6, 23, 0.95)",
    border: "1px solid rgba(99,102,241,0.4)",
    borderRadius: "8px",
    color: "#e5e7eb",
  }}
  itemStyle={{
    color: "#e5e7eb",
  }}
  labelStyle={{
    color: "#93c5fd",
    fontWeight: 600,
  }}
/>
          <Area
            type="monotone"
            dataKey="calls"
            stroke="#4f46e5"
            strokeWidth={3}
            fill="url(#areaGlow)"
            animationDuration={1400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
