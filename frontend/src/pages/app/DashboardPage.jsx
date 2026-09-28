import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "../../components/scan/UploadZone";
import ScanResult from "../../components/scan/ScanResult";

export default function DashboardPage() {
  const [scanResult, setScanResult] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">Scam Detection</h1>
        <p className="text-gray-500 text-sm mt-1">
          একটা screenshot upload করো, scam কিনা analyze করি
        </p>
      </motion.div>

      <UploadZone onScanComplete={setScanResult} />

      <AnimatePresence mode="wait">
        {scanResult && (
          <div className="mt-6">
            <ScanResult result={scanResult} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}