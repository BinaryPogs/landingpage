'use client';

import { useEffect, useRef } from 'react';
import { ParticleSystem } from './ParticleSystem';

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (systemRef.current) {
        systemRef.current.resetParticles();
      }
    };

    resize();
    
    systemRef.current = new ParticleSystem(canvas, ctx);
    systemRef.current.init();

    const animate = () => {
      if (systemRef.current) {
        systemRef.current.update();
        systemRef.current.draw();
      }
      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (systemRef.current) {
        systemRef.current.updateMousePosition(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (systemRef.current) {
        systemRef.current.updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && systemRef.current) {
        systemRef.current.disperseParticles();
      }
    };

    const handleWindowBlur = () => {
      if (systemRef.current) {
        systemRef.current.updateMousePosition(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    const handleWindowFocus = () => {
      if (systemRef.current) {
        systemRef.current.disperseParticles();
      }
    };

    const handleMouseLeave = () => {
      if (systemRef.current) {
        systemRef.current.updateMousePosition(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
} 