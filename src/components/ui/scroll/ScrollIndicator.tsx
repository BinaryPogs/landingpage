'use client';

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="relative h-24 w-[2px]">
        <div className="absolute top-0 left-0 right-0 h-full">
          {/* Primary animated line */}
          <div className="absolute top-0 h-12 w-full animate-scrollLine">
            <div className="h-full w-full bg-gradient-to-b from-white via-white to-transparent" />
          </div>
          
          {/* Secondary animated line (delayed) */}
          <div className="absolute top-0 h-12 w-full animate-scrollLineDelayed">
            <div className="h-full w-full bg-gradient-to-b from-white via-white to-transparent" />
          </div>

          {/* Glow effects */}
          <div className="absolute inset-0 bg-[#7896ff] opacity-70 blur-[8px]" />
          <div className="absolute inset-0 bg-white opacity-50 blur-[4px]" />
        </div>
      </div>
    </motion.div>
  );
}