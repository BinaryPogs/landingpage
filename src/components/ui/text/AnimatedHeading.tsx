'use client';

import { motion } from 'framer-motion';
import { headingAnimation } from '@/components/ui/text/animations/heading';
import { cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

const sizeClasses = {
  sm: 'text-3xl',
  md: 'text-4xl',
  lg: 'text-5xl',
  xl: 'text-6xl'
};

export function AnimatedHeading({ 
  text, 
  className,
  size = 'lg',
  delay = 0
}: AnimatedHeadingProps) {
  return (
    <motion.h1 
      className={cn(
        "font-normal tracking-[-0.05em] text-white/90",
        sizeClasses[size],
        className
      )}
      custom={delay}
      variants={headingAnimation.container}
      initial="hidden"
      animate="visible"
    >
      {text}
    </motion.h1>
  );
} 