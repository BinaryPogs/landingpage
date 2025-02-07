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
        "p-6 rounded-xl backdrop-blur-sm",
        "border hover:border-[#FFD700]/30",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-[#FFD700]/5",
        className
      )}
    >
      <h3 className="text-xl font-medium text-[#FFD700] mb-2">
        {title}
      </h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}