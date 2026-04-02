"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lottie is a large library, dynamically import it for better performance
const Lottie = dynamic(() => import("lottie-react"), { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-layer-light animate-pulse rounded-full" />
});

interface LottieIconProps {
  url?: string;
  fallbackSvg?: React.ReactNode;
  className?: string;
}

export function LottieIcon({ url, fallbackSvg, className }: LottieIconProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => res.json())
        .then(data => setAnimationData(data))
        .catch(err => console.error("Could not load lottie", err));
    }
  }, [url]);

  if (animationData) {
    return (
      <div className={className}>
         <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      {fallbackSvg}
    </div>
  );
}
