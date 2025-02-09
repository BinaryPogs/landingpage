'use client';

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { LogoGenerationSection } from "@/components/sections/LogoGenerationSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";


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
  const opacity5 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const y4 = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);
  const y5 = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);

  return (
    <div ref={containerRef} className="relative">
      <HeroSection opacity={opacity} />
      <WorkflowSection opacity={opacity2} y={y2} />
      <LogoGenerationSection opacity={opacity3} y={y3} />
      <FeaturesSection opacity={opacity4} y={y4} />
      <WaitlistSection opacity={opacity5} y={y5} />
    </div>
  );
}