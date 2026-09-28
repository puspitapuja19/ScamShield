import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { ROUTES } from "../../constants";
import PhoneMockup from "./PhoneMockup";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-xs text-purple-400 mb-6">
            <ShieldCheck size={14} />
            <span>AI-powered scam message detection</span>
          </div>

          <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Catch scam messages,{" "}
            <span className="bg-gradient-purple bg-clip-text text-transparent">
              before it's too late
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg mt-6 max-w-lg leading-relaxed">
            Upload a screenshot and our AI tells you in seconds whether it's a
            scam — with a risk score, threat signals, and a detailed explanation.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to={ROUTES.REGISTER}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-purple text-white font-medium shadow-glow-purple"
              >
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="px-6 py-3.5 rounded-xl border border-navy-700 text-gray-300 hover:text-white hover:border-navy-600 transition-colors font-medium"
            >
              Log In
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">
            <span>✓ Completely free</span>
            <span>✓ No card required</span>
          </div>
        </motion.div>

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}