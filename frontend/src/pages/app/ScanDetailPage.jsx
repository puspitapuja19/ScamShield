import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import ScanResult from "../../components/scan/ScanResult";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { ROUTES } from "../../constants";

export default function ScanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .get(`/history/me/${id}`)
      .then((response) => {
        setScan(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.error("Scan পাওয়া যায়নি");
        } else {
          toast.error("Scan load করতে সমস্যা হয়েছে");
        }
        navigate(ROUTES.HISTORY);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("এই scan টা permanently delete করতে চান?")) return;

    setDeleting(true);
    try {
      await api.delete(`/history/me/${id}`);
      toast.success("Scan delete হয়েছে");
      navigate(ROUTES.HISTORY);
    } catch (err) {
      toast.error("Delete করতে সমস্যা হয়েছে");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (!scan) return null;

  // flags আসে JSON string হিসেবে, তাই parse করতে হবে
  let parsedFlags = [];
  try {
    parsedFlags = scan.flags ? JSON.parse(scan.flags) : [];
  } catch {
    parsedFlags = [];
  }

  const result = {
    risk_level: scan.risk_level,
    risk_score: scan.risk_score,
    flags: parsedFlags,
    explanation: scan.explanation,
    extracted_text: scan.extracted_text,
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={() => navigate(ROUTES.HISTORY)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={18} />
          History তে ফিরে যান
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-400 border border-red-900/40 hover:bg-red-950/30 transition-colors disabled:opacity-50"
        >
          <Trash2 size={16} />
          {deleting ? "Delete হচ্ছে..." : "Delete"}
        </button>
      </motion.div>

      <p className="text-xs text-gray-500 mb-4">
        Scanned on{" "}
        {new Date(scan.scanned_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <ScanResult result={result} />
    </div>
  );
}