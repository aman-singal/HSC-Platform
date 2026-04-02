"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Hide scrollbar globally while preloader is active
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-pure-white flex items-center justify-center flex-col"
        >
          <div className="w-full max-w-sm md:max-w-md px-6 relative">
             <video 
               ref={videoRef}
               src="/logo.mp4" 
               autoPlay 
               muted 
               playsInline 
               onEnded={handleVideoEnd}
               className="w-full h-auto drop-shadow-sm"
             />
             <div className="mt-8 flex justify-center w-full">
               <button 
                 onClick={handleVideoEnd} 
                 className="text-xs text-body hover:text-heading tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity"
               >
                 Skip Intro
               </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
