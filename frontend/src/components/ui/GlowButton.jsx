export default function GlowButton({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-3 rounded-xl bg-gradient-purple text-white font-medium shadow-glow-purple hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}