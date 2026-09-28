import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass rounded-2xl p-6 border border-navy-700 hover:border-purple-600/40 hover:shadow-glow-purple transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-4">
        <Icon className="text-purple-400" size={22} />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}