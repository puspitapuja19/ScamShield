import { motion } from "framer-motion";
import { RISK_COLORS } from "../../constants";

const LEVELS = ["LOW", "MEDIUM", "HIGH"];

export default function RiskSpectrum({ riskLevel = "UNKNOWN" }) {
  const activeIndex = LEVELS.indexOf(riskLevel);

  return (
    <div className="w-full">
      <div className="flex h-2 rounded-full overflow-hidden bg-navy-800">
        {LEVELS.map((level, i) => (
          <div
            key={level}
            className="flex-1"
            style={{
              backgroundColor: i <= activeIndex ? RISK_COLORS[level] : "#1F2937",
            }}
          />
        ))}
      </div>

      <div className="relative mt-2 h-6">
        {activeIndex !== -1 && (
          <motion.div
            initial={{ left: "0%" }}
            animate={{ left: `${(activeIndex / (LEVELS.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -translate-x-1/2 text-xs font-semibold"
            style={{ color: RISK_COLORS[riskLevel] }}
          >
            ▲
          </motion.div>
        )}
      </div>

      <div className="flex justify-between text-xs text-gray-500 -mt-4">
        <span>LOW</span>
        <span>MEDIUM</span>
        <span>HIGH</span>
      </div>
    </div>
  );
}