'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Particles } from "@/components/ui/particle/Particles";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {/* Darkest base background */}
      <div className="fixed inset-0 bg-[#020a14]" />
      
      <div 
        className="fixed inset-0"
        style={{ 
          background: `linear-gradient(180deg, 
            rgba(30, 60, 100, 1) 0%,
            rgba(15, 35, 60, 0.7) 25%,
            rgba(5, 15, 30, 0.5) 50%,
            rgba(2, 10, 20, 1) 100%
          )`
        }}
      />
      <Particles />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}