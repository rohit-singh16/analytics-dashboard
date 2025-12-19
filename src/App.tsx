import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CallVolumeChart from "./components/CallVolumeChart";
import CallDistributionChart from "./components/CallDistributionChart";
import FuturisticBackground from "./components/FuturisticBackground";
import type { ChartData } from "./components/CallVolumeChart";
import { supabase } from "./lib/supabase";
import toast from "react-hot-toast";

const DEFAULT_DATA: ChartData[] = [
  { day: "Mon", calls: 120 },
  { day: "Tue", calls: 200 },
  { day: "Wed", calls: 150 },
  { day: "Thu", calls: 280 },
  { day: "Fri", calls: 220 },
  { day: "Sat", calls: 90 },
  { day: "Sun", calls: 60 },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function App() {
  const [email, setEmail] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>(DEFAULT_DATA);
  const [selectedDay, setSelectedDay] = useState("Wed");
  const [callCount, setCallCount] = useState(150);

  const [existingRow, setExistingRow] = useState(false);
  const [showOverwrite, setShowOverwrite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load existing analytics
  useEffect(() => {
    if (!isValidEmail(email)) return;

    const loadData = async () => {
      const { data } = await supabase
        .from("call_analytics")
        .select("data")
        .eq("email", email)
        .maybeSingle();

      if (Array.isArray(data?.data)) {
        setChartData(data.data);

        const d = data.data.find(
          (x: ChartData) => x.day === selectedDay
        );
        if (d) setCallCount(d.calls);

        setExistingRow(true);
      } else {
        setExistingRow(false);
      }
    };

    loadData();
  }, [email, selectedDay]);

  // Save / overwrite analytics
  const saveData = async () => {
    setLoading(true);

    const updated = chartData.map((d) =>
      d.day === selectedDay ? { ...d, calls: callCount } : d
    );

    const { error } = await supabase
      .from("call_analytics")
      .upsert(
        {
          email,
          data: updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    setLoading(false);

    if (error) {
      toast.error("Failed to save analytics");
      return;
    }

    setChartData(updated);
    setShowOverwrite(false);
    setExistingRow(true);
    toast.success("Analytics saved successfully");
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-200">
      <FuturisticBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-14">
        <h1 className="text-4xl font-bold tracking-tight gradient-text">
          Call Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* FORM CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card lg:col-span-1 grid gap-6"
          >
            <div>
              <label className="form-label gradient-text">Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label gradient-text">Select Day</label>
              <select
                className="input"
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(e.target.value);
                  const d = chartData.find(
                    (x) => x.day === e.target.value
                  );
                  if (d) setCallCount(d.calls);
                }}
              >
                {DAYS.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label gradient-text">Call Count</label>
              <input
                type="number"
                className="input"
                value={callCount}
                onChange={(e) =>
                  setCallCount(Number(e.target.value))
                }
              />
            </div>

            <div className="pt-3">
              <button
                className="primary-btn"
                disabled={!isValidEmail(email) || loading}
                onClick={() =>
                  existingRow ? setShowOverwrite(true) : saveData()
                }
              >
                {loading ? "Saving..." : "Save Analytics"}
              </button>
            </div>
          </motion.div>

          {/* OVERWRITE CONFIRMATION */}
          <AnimatePresence>
          {showOverwrite && (
          <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="
          glass-card
          lg:col-span-1
          border border-yellow-400/30
          text-slate-200
          "
          >
          {/* MESSAGE */}
          <p
          style={{ color: "#fde047" }}
          className="text-sm leading-relaxed mb-4"
          >
          Existing analytics already exist for this email.
          <br />
          Do you want to overwrite them?
          </p>

          {/* ACTIONS */}
          
  {/* YES BUTTON */}
  <div className="flex gap-3">
  <button
    className="btn-warning"
    onClick={saveData}
  >
    Yes, overwrite
  </button>

  <button
    className="btn-warning-outline"
    onClick={() => setShowOverwrite(false)}
  >
    Cancel
  </button>
</div>

    </motion.div>
  )}
</AnimatePresence>


          {/* AREA CHART */}
          <div className="glass-card lg:col-span-2">
            <CallVolumeChart data={chartData} />
          </div>

          {/* DONUT CHART */}
          <div className="glass-card lg:col-span-3">
            <CallDistributionChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
