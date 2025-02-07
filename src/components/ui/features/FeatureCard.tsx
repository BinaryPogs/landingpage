'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "p-6 rounded-xl bg-white/5 backdrop-blur-sm",
        "border border-white/10 hover:border-white/20",
        "transition-colors duration-300",
        className
      )}
    >
      <h3 className="text-xl font-medium text-white mb-2">
        {title}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}