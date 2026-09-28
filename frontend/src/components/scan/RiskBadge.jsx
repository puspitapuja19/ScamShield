import { RISK_COLORS } from "../../constants";

const LABELS = {
  HIGH: "উচ্চ ঝুঁকি",
  MEDIUM: "মাঝারি ঝুঁকি",
  LOW: "নিরাপদ",
  UNKNOWN: "অজানা",
};

export default function RiskBadge({ riskLevel = "UNKNOWN" }) {
  const color = RISK_COLORS[riskLevel] || RISK_COLORS.UNKNOWN;

  return (
    <span
      className="px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {LABELS[riskLevel] || riskLevel}
    </span>
  );
}