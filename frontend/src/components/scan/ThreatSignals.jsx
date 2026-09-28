import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function ThreatSignals({ flags = [] }) {
  if (flags.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-800 border border-navy-700">
        <ShieldCheck className="text-risk-low flex-shrink-0" size={20} />
        <p className="text-sm text-gray-300">কোনো সন্দেহজনক signal পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {flags.map((flag, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-navy-800 border border-navy-700 hover:border-risk-high/40 transition-colors"
        >
          <AlertTriangle className="text-risk-high flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-gray-300">{flag}</p>
        </motion.div>
      ))}
    </div>
  );
}