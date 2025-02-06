'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Particles } from "./Particles";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {/* Base dark background */}
      <div className="fixed inset-0 bg-[#030f1c]" />
      
      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-[#081e36] via-[#051628] to-[#030f1c]"
        style={{ opacity: 0.6 }}
      />
      
      {/* Particles */}
      <Particles />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}