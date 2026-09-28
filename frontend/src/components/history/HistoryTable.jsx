import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import RiskBadge from "../scan/RiskBadge";

export default function HistoryTable({ scans = [] }) {
  const navigate = useNavigate();

  if (scans.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 flex flex-col items-center text-center">
        <FileText className="text-gray-600 mb-3" size={32} />
        <p className="text-gray-400">No scans found</p>
        <p className="text-gray-600 text-sm mt-1">Your scan history will appear here</p>
      </div>
    );
  }

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  return (
    <>
      {/* Mobile — stacked cards */}
      <div className="space-y-3 md:hidden">
        {scans.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            onClick={() => navigate(`/app/scan/${scan.id}`)}
            className="glass rounded-xl p-4 active:bg-navy-800/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <RiskBadge riskLevel={scan.risk_level || "UNKNOWN"} />
              <span className="text-xs text-gray-500">{formatDate(scan.scanned_at)}</span>
            </div>
            <p className="text-sm text-gray-300 truncate mb-1">
              {scan.extracted_text || "No text extracted"}
            </p>
            <p className="text-xs text-gray-500">Score: {scan.risk_score ?? "—"}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop — table */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">Extracted Text</th>
              <th className="px-5 py-3 font-medium">Risk</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, i) => (
              <motion.tr
                key={scan.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                onClick={() => navigate(`/app/scan/${scan.id}`)}
                className="border-b border-navy-800 last:border-0 hover:bg-navy-800/50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3 text-gray-300 max-w-xs truncate">
                  {scan.extracted_text || "No text extracted"}
                </td>
                <td className="px-5 py-3">
                  <RiskBadge riskLevel={scan.risk_level || "UNKNOWN"} />
                </td>
                <td className="px-5 py-3 text-gray-400">{scan.risk_score ?? "—"}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{formatDate(scan.scanned_at)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}