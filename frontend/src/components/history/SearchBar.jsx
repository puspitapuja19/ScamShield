import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search extracted text..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
}