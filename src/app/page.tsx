'use client';

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);

  return (
    <div ref={containerRef} className="relative">
      <HeroSection opacity={opacity} />
      <FeaturesSection opacity={opacity2} y={y2} />
      <WaitlistSection opacity={opacity3} y={y3} />
    </div>
  );
}