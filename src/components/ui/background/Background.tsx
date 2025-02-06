import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { themeConfig } from "@/app/conf/theme";
import { Particles } from "./Particles";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      <div 
        className="fixed inset-0"
        style={{ backgroundColor: themeConfig.colors.background.base }}
      />
      <Particles />
      <div 
        className="fixed inset-0 bg-gradient-to-b from-transparent via-background-base/50 to-background-base"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}