'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  color?: string;
  size?: number;
  blur?: number;
}

export function Cursor({
  size = 160,
  blur = 115,
}: CursorProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    setIsMounted(true);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(120, 150, 255, 0.12) ${size * 0.04}px,
          rgba(120, 150, 255, 0.08) ${size * 0.15}px,
          rgba(120, 150, 255, 0.05) ${size * 0.35}px,
          rgba(120, 150, 255, 0.03) ${size * 0.65}px,
          transparent ${size}px)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
} 