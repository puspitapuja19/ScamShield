import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";

export default function ExtractedText({ text }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  return (
    <div className="border border-navy-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-navy-800 hover:bg-navy-700 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FileText size={16} />
          <span>Extracted Text</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="px-4 py-3 bg-navy-900 text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
          {text}
        </div>
      )}
    </div>
  );
}