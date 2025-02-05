import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { themeConfig } from "@/app/conf/theme";

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
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}