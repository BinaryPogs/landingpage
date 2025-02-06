'use client';

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div 
        className="relative h-24 w-[2px]"
      >
        <motion.div
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0.2, 1, 0.2],
            y: [0, 40, 80]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 right-0 h-12 origin-top"
        >
          <div className="h-full w-full bg-gradient-to-b from-white to-transparent" />
        </motion.div>

        <motion.div
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0.2, 1, 0.2],
            y: [0, 40, 80]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
          className="absolute top-0 left-0 right-0 h-12 origin-top"
        >
          <div className="h-full w-full bg-gradient-to-b from-white to-transparent" />
        </motion.div>

        <div className="absolute inset-0 bg-[#7896ff] opacity-40 blur-[6px]" />
        <div className="absolute inset-0 bg-white opacity-30 blur-[3px]" />
      </motion.div>
    </motion.div>
  );
}