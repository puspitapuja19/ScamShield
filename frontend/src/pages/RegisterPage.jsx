import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-8">
          <ShieldAlert className="text-purple-500" size={32} />
          <span className="font-space text-xl font-bold text-white">Scam Detector</span>
        </div>
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1 text-center">Create Account</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Scam থেকে নিজেকে রক্ষা করুন</p>
          <RegisterForm />
        </div>
      </motion.div>
    </div>
  );
}