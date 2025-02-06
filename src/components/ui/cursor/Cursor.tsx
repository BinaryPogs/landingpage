'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface CursorProps {
  size?: number;
  blur?: number;
}

export function Cursor({
  size = 160,
  blur = 115,
}: CursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<[number, number]>([0, 0]);
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

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = [e.clientX, e.clientY];
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const [x, y] = mousePosRef.current;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      
      gradient.addColorStop(0.08, 'rgba(120, 150, 255, 0.25)');
      gradient.addColorStop(0.30, 'rgba(120, 150, 255, 0.15)');
      gradient.addColorStop(0.60, 'rgba(120, 150, 255, 0.10)');
      gradient.addColorStop(0.85, 'rgba(120, 150, 255, 0.05)');
      gradient.addColorStop(1, 'transparent');

      ctx.filter = `blur(${blur}px)`;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', () => setCanvasSize(canvas, ctx));

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isBrowser, setCanvasSize, size, blur]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" />;
} 