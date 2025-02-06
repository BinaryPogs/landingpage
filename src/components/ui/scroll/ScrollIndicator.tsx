'use client';

import { motion, AnimatePresence } from "framer-motion";

export function ScrollIndicator() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <motion.div 
          className="relative h-24 w-[2px]"
          initial="initial"
          animate="animate"
        >
          {/* Main line */}
          <motion.div
            variants={{
              initial: { scaleY: 0, opacity: 0.2, y: 0 },
              animate: {
                scaleY: [0, 1, 0],
                opacity: [0.2, 1, 0.2],
                y: [0, 40, 80],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }
              }
            }}
            className="absolute top-0 left-0 right-0 h-12 origin-top"
          >
            <div className="h-full w-full bg-gradient-to-b from-white to-transparent" />
          </motion.div>

          {/* Second line */}
          <motion.div
            variants={{
              initial: { scaleY: 0, opacity: 0.2, y: 0 },
              animate: {
                scaleY: [0, 1, 0],
                opacity: [0.2, 1, 0.2],
                y: [0, 40, 80],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }
              }
            }}
            className="absolute top-0 left-0 right-0 h-12 origin-top"
          >
            <div className="h-full w-full bg-gradient-to-b from-white to-transparent" />
          </motion.div>

          {/* Enhanced glow effects */}
          <motion.div 
            className="absolute inset-0"
            variants={{
              initial: { opacity: 0 },
              animate: { 
                opacity: 0.4,
                transition: { duration: 1 }
              }
            }}
          >
            <div className="absolute inset-0 bg-[#7896ff] opacity-60 blur-[6px]" />
            <div className="absolute inset-0 bg-white opacity-40 blur-[3px]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}