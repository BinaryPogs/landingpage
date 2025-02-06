'use client';

export function ScrollIndicator() {
  return (
    <div className="scroll-indicator-wrapper">
      <div className="scroll-indicator">
        <div className="scroll-line scroll-line-1" />
        <div className="scroll-line scroll-line-2" />
        <div className="scroll-glow" />
      </div>

      <style jsx global>{`
        .scroll-indicator-wrapper {
          --scroll-width: 2px;
          --scroll-height: 96px;
          --scroll-color: #fff;
          --scroll-glow: #7896ff;
          
          position: fixed;
          bottom: 48px;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
          z-index: 50;
          width: var(--scroll-width);
          height: var(--scroll-height);
          will-change: transform;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }

        .scroll-indicator {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }

        .scroll-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, var(--scroll-color), transparent);
          opacity: 0;
          transform: translate3d(0, -100%, 0) scaleY(0);
          will-change: transform, opacity;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .scroll-line-1 {
          animation: scrollAnimation 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .scroll-line-2 {
          animation: scrollAnimation 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1s;
        }

        .scroll-glow {
          position: absolute;
          top: 0;
          left: -4px;
          right: -4px;
          bottom: 0;
          background: var(--scroll-glow);
          filter: blur(8px);
          opacity: 0.6;
          transform: translate3d(0, 0, 0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        @keyframes scrollAnimation {
          0% {
            transform: translate3d(0, -100%, 0) scaleY(0);
            opacity: 0;
          }
          50% {
            transform: translate3d(0, 0, 0) scaleY(1);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 100%, 0) scaleY(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}