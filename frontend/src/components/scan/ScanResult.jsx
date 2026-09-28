import { motion } from "framer-motion";
import RiskGauge from "./RiskGauge";
import RiskSpectrum from "./RiskSpectrum";
import ThreatSignals from "./ThreatSignals";
import ExtractedText from "./ExtractedText";
import RiskBadge from "./RiskBadge";

export default function ScanResult({ result }) {
  if (!result) return null;

  const { risk_level, risk_score, flags, explanation, extracted_text } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Analysis Result</h2>
        <RiskBadge riskLevel={risk_level} />
      </div>

      <div className="flex flex-col items-center py-4">
        <RiskGauge score={risk_score} riskLevel={risk_level} />
      </div>

      <RiskSpectrum riskLevel={risk_level} />

      {explanation && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">ব্যাখ্যা</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{explanation}</p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">সতর্কতা সংকেত</h3>
        <ThreatSignals flags={flags} />
      </div>

      <ExtractedText text={extracted_text} />
    </motion.div>
  );
}