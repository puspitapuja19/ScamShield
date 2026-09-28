import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { TOKEN_KEY } from "../constants";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── App load হলে, token থাকলে current user fetch করো ──
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ─── Login ────────────────────────────────────────────
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { access_token } = response.data;

    localStorage.setItem(TOKEN_KEY, access_token);

    // Login এর পরে current user এর তথ্য নিয়ে আসো
    const meResponse = await api.get("/auth/me");
    setUser(meResponse.data);

    return meResponse.data;
  };

  // ─── Register ─────────────────────────────────────────
  const register = async (email, password) => {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  };

  // ─── Logout ───────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}