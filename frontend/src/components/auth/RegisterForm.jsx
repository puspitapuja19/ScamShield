import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import GlowButton from "../ui/GlowButton";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password);
      toast.success("Registration successful!");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const detail = err.response?.data?.detail || "There was a problem registering";
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-navy-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-navy-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="••••••••"
        />
      </div>

      <GlowButton type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </GlowButton>

      <p className="text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <Link to={ROUTES.REGISTER} className="text-purple-400 hover:text-purple-300">
          Register
        </Link>
      </p>
    </form>
  );
}
  
  
  
  
  