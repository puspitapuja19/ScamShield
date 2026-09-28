import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../api/axios";
import HistoryTable from "../../components/history/HistoryTable";
import HistoryFilters from "../../components/history/HistoryFilters";
import SearchBar from "../../components/history/SearchBar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function HistoryPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/history/me")
      .then((response) => {
        setScans(response.data);
      })
      .catch(() => {
        toast.error("History load করতে সমস্যা হয়েছে");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const matchesFilter = filter === "ALL" || scan.risk_level === filter;
      const matchesSearch =
        !search || (scan.extracted_text || "").toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [scans, filter, search]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white">Scan History</h1>
        <p className="text-gray-500 text-sm mt-1">All your previous scans in one place</p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <HistoryFilters active={filter} onChange={setFilter} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : (
        <HistoryTable scans={filteredScans} />
      )}
    </div>
  );
}