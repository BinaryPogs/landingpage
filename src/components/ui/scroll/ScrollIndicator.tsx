'use client';

export function ScrollIndicator() {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="relative h-24 w-[2px]">
        {/* Static glowing base */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white opacity-30" />
          <div className="absolute inset-0 bg-[#7896ff] opacity-50 blur-[8px]" />
        </div>

        {/* Animated elements */}
        <div 
          className="absolute top-0 left-0 right-0 h-full"
          style={{
            animation: `pulse 2s ease-in-out infinite`
          }}
        >
          <div className="h-12 w-full bg-gradient-to-b from-white via-white to-transparent" 
               style={{
                 animation: `slideDown 2s linear infinite`
               }}
          />
          <div className="h-12 w-full bg-gradient-to-b from-white via-white to-transparent"
               style={{
                 animation: `slideDown 2s linear infinite 1s`
               }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            transform: scaleY(0) translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: scaleY(1) translateY(40px);
            opacity: 1;
          }
          100% {
            transform: scaleY(0) translateY(80px);
            opacity: 0.2;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}