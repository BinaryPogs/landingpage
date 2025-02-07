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
      className="flex flex-col min-h-screen items-center justify-center gap-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <FeatureCard 
          title="Set & Forget"
          description="Schedule automatic SUI purchases daily, weekly, or monthly"
        />
        <FeatureCard 
          title="Smart Execution"
          description="Best price execution using Sui's DEX aggregator"
        />
        <FeatureCard 
          title="Track Progress"
          description="Monitor your average entry price and portfolio growth"
        />
      </div>
    </motion.div>
  );
} 