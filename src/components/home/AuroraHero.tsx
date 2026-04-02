"use client";

import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/ShinyButton";
import Link from "next/link";

export function AuroraHero() {
  return (
    <div className="relative w-full h-screen bg-pure-white overflow-hidden flex items-center justify-center pt-12 md:pt-20">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-blue-50/50 to-white">
        <motion.div
           style={{ willChange: "transform" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0050FF] blur-[100px] mix-blend-multiply opacity-20"
        />
        <motion.div
          style={{ willChange: "transform" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#00D6FF] blur-[120px] mix-blend-multiply opacity-20"
        />
        <motion.div
          style={{ willChange: "transform" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-400 blur-[80px] mix-blend-multiply opacity-10"
        />
      </div>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-[25%] left-[5%] xl:left-[10%] backdrop-blur-2xl bg-white/50 border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.05)] rounded-2xl p-5 items-center gap-4 z-10"
      >
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        </div>
        <div>
          <p className="text-base font-bold text-heading">100% Legal</p>
          <p className="text-sm text-body font-medium">Authorized Process</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute bottom-[20%] right-[5%] xl:right-[10%] backdrop-blur-2xl bg-white/50 border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.05)] rounded-2xl p-5 items-center gap-4 z-10"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-corporate-blue shadow-inner">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <p className="text-base font-bold text-heading">Instant Payout</p>
          <p className="text-sm text-body font-medium">Same day transfer</p>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
           className="px-6 py-2 md:px-8 md:py-3 rounded-full border-2 border-corporate-blue/40 bg-white/80 backdrop-blur-2xl text-corporate-blue text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-widest md:tracking-[0.25em] uppercase mb-8 md:mb-12 shadow-[0_10px_30px_rgba(0,80,255,0.1)] inline-block group hover:scale-105 transition-transform cursor-default"
        >
          <span className="relative z-10">Hindustan Scrap Corporation</span>
          <div className="absolute inset-0 bg-corporate-blue/5 rounded-full animate-pulse blur-md -z-10" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-heading leading-[1.05] mb-6 md:mb-8 relative"
        >
          The elegant way to <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-[#00D6FF] drop-shadow-sm">
            scrap your vehicle.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="text-lg sm:text-xl md:text-2xl text-body max-w-3xl font-medium mb-10 md:mb-12 leading-relaxed"
        >
          Redefining the lifecycle of automobiles with absolute precision. Government authorized, ecologically responsible, and effortlessly transparent.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full justify-center"
        >
          <Link href="/pricing" className="w-full sm:w-auto">
            <ShinyButton variant="primary" className="text-lg px-10 py-5 w-full">Evaluate My Vehicle</ShinyButton>
          </Link>
          <Link href="/compliance" className="w-full sm:w-auto">
            <button className="text-lg px-10 py-5 text-heading font-semibold hover:bg-layer-light border border-divider rounded-full transition-all duration-300 bg-white shadow-sm hover:shadow-md w-full hover:-translate-y-1">
              Learn About Compliance
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
