"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/ShinyButton";

export default function AboutPage() {
  const stats = [
    { label: "Material Recovered", value: "92%" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Years Experience", value: "25+" },
    { label: "Facility Size", value: "4.5 Acre" }
  ];

  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-32 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 md:mb-24 relative">
        {/* Background glow decoration */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full h-[600px] bg-corporate-blue/5 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block px-4 py-1.5 rounded-full border border-corporate-blue/20 bg-blue-50 text-corporate-blue text-sm font-black tracking-widest uppercase mb-6 md:mb-10 shadow-sm"
        >
          Our Story
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl sm:text-6xl md:text-[6.5rem] font-black tracking-tighter text-heading leading-[0.95] md:leading-[0.85] mb-8 md:mb-12"
        >
          Redefining <br/>automobile life.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-body max-w-4xl mx-auto leading-relaxed font-medium"
        >
          Hindustan Scrap Corporation is a government-authorized RVSF dedicated to bringing absolute transparency, efficiency, and eco-consciousness to India's end-of-life vehicle sector.
        </motion.p>
      </div>

      {/* 2. STATS GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 md:mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
               className="bg-layer-light p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-divider text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-default"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-corporate-blue mb-2 tracking-tight">{stat.value}</h2>
              <p className="text-heading font-black tracking-widest uppercase text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. CONTENT BLOCK */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="aspect-square bg-layer-light rounded-[3rem] overflow-hidden relative border border-divider shadow-2xl hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-32 h-32 text-divider/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m0 10h1m-1 4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <motion.div 
             animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-10 left-10 p-6 bg-white shadow-2xl rounded-3xl border border-divider flex items-center gap-4"
          >
             <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
             </div>
             <div>
               <p className="text-sm font-black text-heading uppercase tracking-tighter">Zero Impact</p>
               <p className="text-xs text-body font-medium">Eco-Certified</p>
             </div>
          </motion.div>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-heading tracking-tight"
          >
            Our Mission is <br className="hidden sm:block" /> 
            <span className="text-corporate-blue tracking-tighter underline underline-offset-[12px] decoration-4 decoration-blue-100">Zero Landfill.</span>
          </motion.h2>

          <p className="text-base sm:text-lg text-body leading-relaxed font-semibold">
            To transform millions of aging, polluting vehicles into clean, reusable industrial materials. We believe in a circular economy where every component of an automobile finds a second life, entirely bypassing landfills.
          </p>

          <div className="space-y-6 pt-4">
             {["100% Authorized & Certified Process", "Over 90% Material Recovery Rate", "Zero-Harm Environmental Impact"].map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 * i }}
                   className="flex items-center gap-4 text-heading font-black text-lg bg-warm-white p-4 rounded-2xl border border-divider shadow-sm"
                >
                   <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-corporate-blue text-sm">✓</span>
                   {item}
                </motion.div>
             ))}
          </div>

          <div className="pt-8">
             <Link href="/contact">
               <ShinyButton variant="primary" className="px-10 py-5 text-lg">Contact Our Experts</ShinyButton>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
