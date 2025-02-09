'use client';

import { motion, MotionValue } from "framer-motion";
import { FeatureCard } from "@/components/ui/features/FeatureCard";
import { Sparkles, Code2, Lock } from "lucide-react";

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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#fff7ad] via-[#ffd1fa] to-[#ffa9f9] text-transparent bg-clip-text mb-8"
      >
        Why Choose Suiko?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-4">
        <FeatureCard 
          icon={Sparkles}
          title="AI-Powered Design"
          description="Advanced AI algorithms create unique, professional logos tailored to your brand"
          className="bg-[#0A192F]/30 border-[#ffd1fa]/20"
        />
        <FeatureCard 
          icon={Code2}
          title="Clean SVG Code"
          description="Get optimized, ready-to-use SVG code for perfect scaling across all platforms"
          className="bg-[#0A192F]/30 border-[#ffd1fa]/20"
        />
        <FeatureCard 
          icon={Lock}
          title="Ownership & Rights"
          description="Full commercial rights with optional NFT minting for blockchain verification"
          className="bg-[#0A192F]/30 border-[#ffd1fa]/20"
        />
      </div>
    </motion.div>
  );
} 