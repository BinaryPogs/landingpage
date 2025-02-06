'use client';

import '@/components/ui/scroll/ScrollIndicator.css';

export function ScrollIndicator() {
  return (
    <div className="scroll-indicator-wrapper">
      <div className="scroll-indicator">
        <div className="chevron" />
        <div className="scroll-glow" />
      </div>
    </div>
  );
}