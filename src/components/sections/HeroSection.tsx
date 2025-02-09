'use client';

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";
import { ScrollIndicator } from "@/components/ui/scroll/ScrollIndicator";
import Image from "next/image";
import { useRef } from "react";

interface HeroSectionProps {
  opacity: MotionValue<number>;
}

export function HeroSection({ opacity }: HeroSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Floating animation variant
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      className="flex flex-col min-h-screen items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(255,209,250,0.3) 0%, rgba(255,169,249,0.1) 100%)`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.2,
            filter: "blur(20px)",
            y: -20
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            y: 0
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            scale: {
              type: "spring",
              damping: 20,
              stiffness: 100
            }
          }}
          className="mb-8 relative group"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-xl group-hover:opacity-75 transition-opacity"
          />
          
          {/* Logo container */}
          <motion.div
            animate={floatingAnimation}
            className="relative z-10"
          >
            <Image 
              src="/suiko.svg" 
              alt="Suiko Logo" 
              width={120} 
              height={120}
              className="drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* Text content with enhanced styling */}
        <AnimatedHeading 
          text="Suiko"
          size="xl"
          delay={0.3}
          className="mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 text-transparent bg-clip-text font-bold tracking-tight"
        />
        
        <AnimatedHeading 
          text="AI-Powered SVG Logo Generation"
          size="md"
          delay={1.5}
          className="text-gray-400 font-light tracking-wider mb-12"
        />

        {/* Call to action button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium 
                     shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 
                     transition-all duration-300 hover:scale-105"
        >
          Get Started
        </motion.button>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-16"
        >
          <ScrollIndicator />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}