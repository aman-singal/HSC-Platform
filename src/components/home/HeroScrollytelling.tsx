"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // We use 300vh so that scrubbing is smooth but not excessively long.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adding a spring to smooth out the native video playback scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.1,
  });

  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Frame scrubber loop
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      if (videoDuration > 0 && videoRef.current) {
        // Fast, direct scrubbing to the spring progress
        videoRef.current.currentTime = smoothProgress.get() * videoDuration;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothProgress, videoDuration]);

  // -- ANIMATION MAPPINGS (Apple-style Parallax) --

  // The Video element's position and scale
  // Phase 1: Center [0-0.1]
  // Phase 2: Shift to Right (Text Left) [0.2-0.4]
  // Phase 3: Shift to Left (Text Right) [0.5-0.7]
  // Phase 4: Shift back to Center [0.8-1.0]
  const videoX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9, 1],
    ["0vw", "0vw", "15vw", "15vw", "-15vw", "-15vw", "-15vw", "0vw", "0vw"]
  );

  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.75, 0.9, 1],
    [1, 1, 0.7, 0.7, 1, 1]
  );

  // Intro Content (Center)
  const introOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // Phase 1 Content (Left Side)
  const t1Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const t1X = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [-50, 0, 0, -50]);

  // Phase 2 Content (Right Side)
  const t2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const t2X = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [50, 0, 0, 50]);

  // Final CTA (Center)
  const outroOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-layer-light w-full">
      {/* Sticky Container holds exactly 1 screen height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* The Native Video object, shifting left to right */}
        <motion.div
          style={{ x: videoX, scale: videoScale }}
          className="absolute z-0 w-[90vw] md:w-[60vw] max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-divider bg-black"
        >
          <video
            ref={videoRef}
            src="/hero1.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* --- Intro Content --- */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute z-10 flex flex-col items-center text-center pointer-events-none"
        >
          <div className="backdrop-blur-xl bg-pure-white/80 p-10 md:p-14 rounded-[2rem] border border-white/60 shadow-2xl pointer-events-auto max-w-3xl mx-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-heading leading-[1.1] mb-6">
              End of the road.<br />
              <span className="text-corporate-blue">Start of something better.</span>
            </h1>
            <p className="text-xl text-subheading font-medium mb-8">
              Scroll to explore the future of vehicle scrapping.
            </p>
            <svg className="w-8 h-8 animate-bounce mx-auto text-corporate-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </motion.div>

        {/* --- Phase 1: Text Left --- */}
        <motion.div
          style={{ opacity: t1Opacity, x: t1X }}
          className="absolute left-0 w-full md:w-1/2 flex items-center px-6 md:px-16 pointer-events-none z-10"
        >
          <div className="backdrop-blur-xl bg-pure-white/90 p-10 rounded-[2rem] border border-divider shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-heading mb-4">
              Precision dismantling.
            </h2>
            <p className="text-lg text-subheading mb-4">
              Every vehicle is processed using certified methods designed to ensure ultimate safety and transparency.
            </p>
            <p className="text-body">
              Our advanced machinery safely drains fluids and segregates parts for the cleanest possible recycling stream.
            </p>
          </div>
        </motion.div>

        {/* --- Phase 2: Text Right --- */}
        <motion.div
          style={{ opacity: t2Opacity, x: t2X }}
          className="absolute right-0 w-full md:w-1/2 flex items-center justify-end px-6 md:px-16 pointer-events-none z-10"
        >
          <div className="backdrop-blur-xl bg-pure-white/90 p-10 rounded-[2rem] border border-divider shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-heading mb-4">
              Nothing wasted.
            </h2>
            <p className="text-lg text-subheading mb-4">
              Drastically reducing environmental impact by repurposing everything.
            </p>
            <p className="text-body">
              From metals to rubber, each material stream finds a new life, supporting a global circular economy.
            </p>
          </div>
        </motion.div>

        {/* --- Final CTA --- */}
        <motion.div
          style={{ opacity: outroOpacity, y: outroY }}
          className="absolute z-10 flex flex-col items-center text-center pointer-events-none mt-32"
        >
          <div className="backdrop-blur-xl bg-pure-white/90 p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-2xl pointer-events-auto max-w-4xl mx-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.1] mb-6">
              Ready to clear the road?
            </h2>
            <p className="text-xl text-subheading font-medium mb-8">
              Join thousands of businesses and fleets contributing to a cleaner future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShinyButton variant="primary">Get Scrap Value</ShinyButton>
              <ShinyButton variant="outline" className="text-corporate-blue border-corporate-blue bg-white hover:bg-blue-50 hover:text-blue-800">Book Pickup</ShinyButton>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
