'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorProps {
  color?: string;
  size?: number;
  blur?: number;
}

export function Cursor({
  size = 160,
  blur = 115,
}: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only add mouse events if not mobile
    if (!isMobile) {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      };

      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mouseenter', handleMouseEnter);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30"
          animate={{
            background: `
              radial-gradient(
                circle at ${mousePosition.x + 5}px ${mousePosition.y - 5}px,
                rgba(120, 150, 255, 0.12) ${size * 0.04}px,
                rgba(120, 150, 255, 0.08) ${size * 0.15}px,
                rgba(120, 150, 255, 0.05) ${size * 0.35}px,
                rgba(120, 150, 255, 0.03) ${size * 0.65}px,
                rgba(120, 150, 255, 0.01) ${size * 0.85}px,
                transparent ${size}px
              ),
              radial-gradient(
                ellipse at ${mousePosition.x - 3}px ${mousePosition.y + 3}px,
                rgba(120, 150, 255, 0.1) ${size * 0.06}px ${size * 0.04}px,
                rgba(120, 150, 255, 0.07) ${size * 0.2}px ${size * 0.15}px,
                rgba(120, 150, 255, 0.04) ${size * 0.4}px ${size * 0.3}px,
                rgba(120, 150, 255, 0.02) ${size * 0.7}px ${size * 0.5}px,
                transparent ${size * 0.95}px
              ),
              radial-gradient(
                ellipse at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(120, 150, 255, 0.1) ${size * 0.05}px ${size * 0.07}px,
                rgba(120, 150, 255, 0.07) ${size * 0.18}px ${size * 0.22}px,
                rgba(120, 150, 255, 0.04) ${size * 0.38}px ${size * 0.42}px,
                rgba(120, 150, 255, 0.02) ${size * 0.68}px ${size * 0.72}px,
                transparent ${size * 0.92}px
              )
            `
          }}
          transition={{ 
            type: "tween",
            ease: "linear",
            duration: 0,
          }}
          style={{
            filter: `blur(${blur}px)`
          }}
        >
          {/* Fluid overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0],
              skew: [0, 0.5, -0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1]
            }}
            style={{
              background: `
                radial-gradient(
                  ellipse at ${mousePosition.x}px ${mousePosition.y}px,
                  rgba(120, 150, 255, 0.08) ${size * 0.08}px ${size * 0.1}px,
                  rgba(120, 150, 255, 0.05) ${size * 0.28}px ${size * 0.32}px,
                  rgba(120, 150, 255, 0.02) ${size * 0.58}px ${size * 0.62}px,
                  transparent ${size * 0.8}px
                )
              `,
              filter: `blur(${blur * 0.5}px)`,
              transition: 'none'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 