// ─── API Configuration ───────────────────────────────────
export const API_BASE_URL = 'https://scam-detector-api-7i7h.onrender.com';

// ─── Auth ─────────────────────────────────────────────────
export const TOKEN_KEY = "scam_detector_token";

// ─── Routes ───────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/app/dashboard",
  HISTORY: "/app/history",
  SCAN_DETAIL: "/app/scan/:id",
  PROFILE: "/app/profile",
  SETTINGS: "/app/settings",
};

// ─── Risk Levels ────────────────────────────────────────────
export const RISK_LEVELS = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
  UNKNOWN: "UNKNOWN",
};

// ─── Risk Level Colors (matches tailwind.config.js) ──────
export const RISK_COLORS = {
  HIGH: "#EF4444",
  MEDIUM: "#F59E0B",
  LOW: "#10B981",
  UNKNOWN: "#6B7280",
};

// ─── File Upload ──────────────────────────────────────────
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];