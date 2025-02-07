'use client';

import { motion, MotionValue } from "framer-motion";
import { FeatureCard } from "@/components/ui/features/FeatureCard";

interface FeaturesSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export function FeaturesSection({ opacity, y }: FeaturesSectionProps) {
  return (
    <motion.div 
      style={{ opacity, y }}
      className="flex flex-col h-[60vh] items-center justify-center gap-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-4">
        <FeatureCard 
          title="Set & Forget"
          description="Schedule automatic SUI purchases daily, weekly, or monthly"
          className="bg-[#0A192F]/30 border-[#1a2942]/50"
        />
        <FeatureCard 
          title="Smart Execution"
          description="Best price execution using Sui's DEX aggregator"
          className="bg-[#0A192F]/30 border-[#1a2942]/50"
        />
        <FeatureCard 
          title="Track Progress"
          description="Monitor your average entry price and portfolio growth"
          className="bg-[#0A192F]/30 border-[#1a2942]/50"
        />
      </div>
    </motion.div>
  );
} 