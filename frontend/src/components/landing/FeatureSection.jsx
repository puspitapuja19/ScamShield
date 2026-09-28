import { motion } from "framer-motion";
import { Zap, Lock, Languages } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get a risk score and explanation in seconds — no waiting, no signup friction.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your screenshots are analyzed securely and never shared with third parties.",
  },
  {
    icon: Languages,
    title: "Bengali & English",
    description: "Works seamlessly with scam messages written in either language.",
  },
];

export default function FeatureSection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mt-3">Built to keep you one step ahead of scammers</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FeatureCard icon={f.icon} title={f.title} description={f.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}