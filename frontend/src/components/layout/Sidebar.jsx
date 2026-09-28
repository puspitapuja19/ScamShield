import { NavLink } from "react-router-dom";
import { LayoutDashboard, History, User, Settings, LogOut, ShieldAlert, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";

const navItems = [
  { label: "Dashboard", path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "History", path: ROUTES.HISTORY, icon: History },
  { label: "Profile", path: ROUTES.PROFILE, icon: User },
  { label: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile overlay — sidebar খোলা থাকলে background dim হবে */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`w-64 h-screen bg-navy-900 border-r border-navy-700 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close button (mobile) */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-purple-500" size={28} />
            <span className="font-space text-lg font-bold text-white">Scam Detector</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden">
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-purple-600/20 text-purple-400 shadow-glow-purple"
                    : "text-gray-400 hover:bg-navy-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-6 border-t border-navy-700">
          {user && (
            <p className="text-xs text-gray-500 px-4 mb-3 truncate">{user.email}</p>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:bg-navy-800 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}