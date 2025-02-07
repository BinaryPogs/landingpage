'use client';

import { motion } from 'framer-motion';
import { headingAnimation } from '@/components/ui/text/animations/heading';
import { cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  size = 'lg' 
}: AnimatedHeadingProps) {
  return (
    <motion.h1 
      className={cn(
        "font-normal tracking-[-0.05em] text-white/90",
        sizeClasses[size],
        className
      )}
      variants={headingAnimation.container}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={headingAnimation.letter}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
} 