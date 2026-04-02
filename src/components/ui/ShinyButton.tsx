"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const ShinyButton = ({ children, className = "", onClick, variant = "primary" }: { children: React.ReactNode, className?: string, onClick?: () => void, variant?: "primary" | "outline" }) => {
  const isOutline = variant === "outline";
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 ${
        isOutline 
        ? "bg-transparent border border-corporate-blue/30 hover:bg-corporate-blue/5 shadow-sm" 
        : "bg-corporate-blue text-white hover:bg-blue-700 shadow-[0_0_20px_rgba(0,80,255,0.4)] hover:shadow-[0_0_40px_rgba(0,214,255,0.6)]"
      } ${className}`}
    >
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        className={`absolute inset-0 w-full ${isOutline ? "bg-gradient-to-r from-transparent via-corporate-blue/10 to-transparent" : "bg-gradient-to-r from-transparent via-white/20 to-transparent"}`}
      />
      <span className="relative z-10 flex items-center gap-2 tracking-wide">{children}</span>
    </motion.button>
  );
};
