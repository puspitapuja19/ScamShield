import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export default function PhoneMockup() {
  return (
    <div className="relative w-[280px] h-[560px]">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[36px] bg-navy-900 border border-navy-700 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-navy-950 rounded-b-2xl z-10" />

        {/* Screen content */}
        <div className="pt-12 px-4 h-full flex flex-col">
          <div className="glass rounded-2xl p-4 flex-1 flex flex-col">
            <p className="text-xs text-gray-500 mb-3">Message Screenshot</p>

            <div className="bg-navy-800 rounded-xl p-3 text-xs text-gray-400 leading-relaxed mb-4">
              "You've won 50,000 Taka! Click this link now to claim your prize..."
            </div>

            {/* Animated risk gauge mimic */}
            <div className="flex flex-col items-center py-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg width={96} height={96} className="-rotate-90">
                  <circle cx={48} cy={48} r={40} stroke="#1F2937" strokeWidth={8} fill="none" />
                  <motion.circle
                    cx={48}
                    cy={48}
                    r={40}
                    stroke="#EF4444"
                    strokeWidth={8}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * 0.15 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    style={{ filter: "drop-shadow(0 0 6px #EF444480)" }}
                  />
                </svg>
                <span className="absolute font-space font-bold text-white text-lg">87</span>
              </div>
              <span className="text-risk-high text-xs font-semibold mt-2">HIGH RISK</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex items-start gap-2 bg-navy-800 rounded-lg p-2.5 mt-auto"
            >
              <AlertTriangle className="text-risk-high flex-shrink-0" size={14} />
              <span className="text-xs text-gray-400">Suspicious link detected</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -left-8 top-16 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-glow-purple"
      >
        <ShieldAlert className="text-purple-400" size={16} />
        <span className="text-xs text-white font-medium">Real-time Analysis</span>
      </motion.div>

      {/* Ambient glow behind phone */}
      <div className="absolute inset-0 -z-10 bg-purple-600/20 blur-[80px] rounded-full" />
    </div>
  );
}