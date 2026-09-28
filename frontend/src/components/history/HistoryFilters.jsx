const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

export default function HistoryFilters({ active, onChange }) {
  return (
   <div className="flex items-center gap-2 flex-wrap">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            active === value
              ? "bg-purple-600/20 text-purple-400 border border-purple-600/40"
              : "text-gray-500 border border-navy-700 hover:text-white hover:border-navy-600"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}