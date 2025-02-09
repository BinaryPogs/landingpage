'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, className, icon: Icon }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "p-6 rounded-xl backdrop-blur-sm",
        "border hover:border-[#ffd1fa]/40",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-[#ffd1fa]/5",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#fff7ad]/10 to-[#ffa9f9]/10 flex items-center justify-center mb-4 border border-[#ffd1fa]/20">
        <Icon className="w-6 h-6 text-[#ffd1fa]" />
      </div>
      <h3 className="text-xl font-medium text-[#ffd1fa] mb-2">
        {title}
      </h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}