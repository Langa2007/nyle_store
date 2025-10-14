"use client";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-gray-200"
    >
      <h1 className="text-xl font-bold mb-2">Profile</h1>
      <p>Manage your account and view orders.</p>
    </motion.div>
  );
}
