'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorProps {
  color?: string;
  size?: number;
  blur?: number;
}

export function Cursor({
  color = 'rgba(120, 150, 255, 0.15)',
  size = 160,
  blur = 115,
}: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkMobile();

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `
              radial-gradient(
                circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(120, 150, 255, 0.12) ${size * 0.04}px,
                rgba(120, 150, 255, 0.08) ${size * 0.15}px,
                rgba(120, 150, 255, 0.05) ${size * 0.35}px,
                rgba(120, 150, 255, 0.03) ${size * 0.65}px,
                rgba(120, 150, 255, 0.01) ${size * 0.85}px,
                transparent ${size}px
              )
            `,
            filter: `blur(${blur}px)`
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `
                radial-gradient(
                  circle at ${mousePosition.x}px ${mousePosition.y}px,
                  rgba(120, 150, 255, 0.1) ${size * 0.05}px,
                  rgba(120, 150, 255, 0.07) ${size * 0.18}px,
                  rgba(120, 150, 255, 0.04) ${size * 0.38}px,
                  rgba(120, 150, 255, 0.02) ${size * 0.68}px,
                  transparent ${size}px
                )
              `
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 