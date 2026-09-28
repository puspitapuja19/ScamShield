import { motion } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Screenshot",
    description: "Take a screenshot of any suspicious message and upload it — SMS, email, or chat.",
  },
  {
    icon: ScanSearch,
    title: "AI Analyzes It",
    description: "Our AI reads the text and checks it against known scam patterns and threat signals.",
  },
  {
    icon: ShieldCheck,
    title: "Get Your Verdict",
    description: "See a risk score, a clear explanation, and exactly what to watch out for.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-gray-500 mt-3">Three simple steps to stay protected</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-navy-700 via-purple-600/40 to-navy-700" />

          {steps.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center mb-5 shadow-glow-purple">
                <Icon className="text-purple-400" size={26} />
              </div>
              <span className="text-xs font-semibold text-purple-500 mb-2">
                STEP {i + 1}
              </span>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}