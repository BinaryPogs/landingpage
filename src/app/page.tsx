'use client';
  
import { MailingListForm } from "@/components/ui/mailing/MailingListForm";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ui/scroll/ScrollIndicator";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";
import { FeatureCard } from "@/components/ui/features/FeatureCard";

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
      {/* First Section - Hero */}
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

      {/* Second Section - Features */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
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

      {/* Third Section - Join */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="flex flex-col min-h-screen items-center justify-center gap-8"
      >
        <AnimatedHeading 
          text="Join the Waitlist"
          size="lg"
          className="mb-4"
        />
        <MailingListForm className="w-full max-w-md" />
      </motion.div>
    </div>
  );
}