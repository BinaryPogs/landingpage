'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface CursorProps {
  size?: number;
  blur?: number;
}

export function Cursor({
  size = 22,
  blur = 34,
}: CursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<[number, number]>([0, 0]);
  const lastMoveRef = useRef<number>(Date.now());
  const velocityRef = useRef<[number, number]>([0, 0]);
  const lastPosRef = useRef<[number, number]>([0, 0]);
  const currentPulseRef = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  const setCanvasSize = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const [width, height] = [window.innerWidth, window.innerHeight];
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setCanvasSize(canvas, ctx);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const [x, y] = mousePosRef.current;
      const now = Date.now();
      const timeSinceMove = now - lastMoveRef.current;
      
      // Calculate velocity with safety checks
      const dt = Math.max(Math.min(timeSinceMove, 32), 1) / 1000;
      velocityRef.current = [
        isFinite(x - lastPosRef.current[0]) ? (x - lastPosRef.current[0]) / dt : 0,
        isFinite(y - lastPosRef.current[1]) ? (y - lastPosRef.current[1]) / dt : 0
      ];
      lastPosRef.current = [x, y];
      
      // Calculate speed and normalize it with safety checks
      const speed = Math.sqrt(
        velocityRef.current[0] * velocityRef.current[0] + 
        velocityRef.current[1] * velocityRef.current[1]
      ) || 0;
      
      // Smooth transition for both moving and stopping
      const bufferDuration = 600;
      const transitionDuration = 12000;
      const growthRate = 0.018;
      const shrinkRate = 0.015;
      const stateTransitionRate = 0.002;
      
      let targetPulse;
      if (timeSinceMove < bufferDuration) {
        const moveProgress = Math.min(speed * timeSinceMove / 1000, 1);
        const easeInProgress = moveProgress * moveProgress;
        const baseSize = 1.8;
        targetPulse = baseSize + (easeInProgress * 0.4);
      } else {
        const transitionProgress = Math.min((timeSinceMove - bufferDuration) / transitionDuration, 1);
        const easeOutProgress = 1 - Math.pow(1 - transitionProgress, 1.5);
        
        const pulseWave = Math.sin(now / 3500 * Math.PI);
        const baseSize = 1.2;
        const pulseAmplitude = 0.25;
        
        const pulseInfluence = Math.min((timeSinceMove - bufferDuration) / 1000, 1);
        const transitionComponent = 0.4 * (1 - easeOutProgress);
        const pulseComponent = (pulseWave * pulseAmplitude) * pulseInfluence;
        
        targetPulse = baseSize + transitionComponent + pulseComponent;
      }
      
      const momentum = 0.85;
      const previousRate = currentPulseRef.current - (currentPulseRef.current / 1.01);
      
      const isChangingState = Math.abs(targetPulse - currentPulseRef.current) > 0.5;
      const rate = isChangingState 
        ? stateTransitionRate 
        : (targetPulse > currentPulseRef.current ? growthRate : shrinkRate);
        
      const newRate = (rate * (1 - momentum)) + (previousRate * momentum);
      
      currentPulseRef.current += (targetPulse - currentPulseRef.current) * newRate;
      currentPulseRef.current = Math.max(Math.min(currentPulseRef.current, 2.5), 0.5);

      const cursorSize = size * currentPulseRef.current;
      
      const stationaryPulse = currentPulseRef.current;
      
      const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, cursorSize * 2.5 * stationaryPulse);
      lightGradient.addColorStop(0, `rgba(120, 150, 255, ${0.12 * stationaryPulse})`);
      lightGradient.addColorStop(0.5, `rgba(120, 150, 255, ${0.08 * stationaryPulse})`);
      lightGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Main cursor gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, cursorSize);
      gradient.addColorStop(0.04, 'rgba(120, 150, 255, 0.30)');
      gradient.addColorStop(0.15, 'rgba(120, 150, 255, 0.20)');
      gradient.addColorStop(0.35, 'rgba(120, 150, 255, 0.12)');
      gradient.addColorStop(0.65, 'rgba(120, 150, 255, 0.06)');
      gradient.addColorStop(1, 'transparent');

      ctx.filter = `blur(${blur}px)`;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', (event) => {
      if (event) {
        mousePosRef.current = [event.clientX, event.clientY];
        lastMoveRef.current = Date.now();
      }
    }, { passive: true });
    window.addEventListener('resize', () => setCanvasSize(canvas, ctx));


    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', (event) => {
        if (event) {
          mousePosRef.current = [event.clientX, event.clientY];
          lastMoveRef.current = Date.now();
        }
      });

    };
  }, [isBrowser, setCanvasSize, size, blur]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" />;
} 