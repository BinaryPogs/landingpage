'use client';

import { motion, MotionValue } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";
import { ScrollIndicator } from "@/components/ui/scroll/ScrollIndicator";

interface HeroSectionProps {
  opacity: MotionValue<number>;
}

export function HeroSection({ opacity }: HeroSectionProps) {
  return (
    <motion.div 
      style={{ opacity }}
      className="flex flex-col min-h-screen items-center justify-center relative"
    >
      <AnimatedHeading 
        text="Ride the Waves"
        size="xl"
        className="mb-4"
      />
      <AnimatedHeading 
        text="Automated DCA for Sui"
        size="md"
        className="text-white/70"
      />
      <ScrollIndicator />
    </motion.div>
  );
} 