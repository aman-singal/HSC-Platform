"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export const SpotlightCard = ({ children, className = "", glowColor = "rgba(0, 80, 255, 0.4)" }: { children: React.ReactNode, className?: string, glowColor?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for high-performance cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => opacity.set(1);
  const handleMouseLeave = () => opacity.set(0);

  // Dynamic colors for the spotlight
  const spotlightBG = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${glowColor.replace('0.4', '0.05')}, transparent 40%)`;
  const borderBG = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, ${glowColor}, transparent 40%)`;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative rounded-3xl overflow-hidden border border-divider bg-warm-white p-10 shadow-sm hover:shadow-xl transition-shadow ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: spotlightBG,
        }}
      />
      
      {/* Light border reflection hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 group-hover:block hidden"
        style={{
          opacity,
          background: borderBG,
          WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: `exclude`,
          padding: `1.5px`
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};
