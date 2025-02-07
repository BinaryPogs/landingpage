'use client';

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DCAPreviewSection } from "@/components/sections/DCAPreviewSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2], [0.7, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const y4 = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  return (
    <div ref={containerRef} className="relative">
      <HeroSection opacity={opacity} />
      <DCAPreviewSection opacity={opacity2} y={y2} />
      <FeaturesSection opacity={opacity3} y={y3} />
      <WaitlistSection opacity={opacity4} y={y4} />
    </div>
  );
}