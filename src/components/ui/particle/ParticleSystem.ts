export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  sway: number;
  swaySpeed: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mousePos: { x: number; y: number };
  private isMouseOutside: boolean = false;
  private isDispersing: boolean = false;
  private disperseStartTime: number = 0;
  private disperseDuration: number = 2000;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mousePos = { x: canvas.width / 2, y: canvas.height / 2 };
  }

  createParticle(): Particle {
    const colors = [
      'rgba(120, 180, 255, 0.6)',
      'rgba(70, 150, 255, 0.4)',
      'rgba(40, 120, 255, 0.3)',
      'rgba(200, 220, 255, 0.5)',
    ];

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 3 + 0.5,
      speedX: 0,
      speedY: 0,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      sway: Math.random() * 50,
      swaySpeed: Math.random() * 0.002 + 0.001
    };
  }

  init(count: number = 150) {
    this.particles = Array(count).fill(null).map(() => this.createParticle());
  }

  resetParticles() {
    this.disperseParticles();
  }

  updateMousePosition(x: number, y: number) {
    const isOutside = x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height;
    
    if (isOutside !== this.isMouseOutside) {
      this.isMouseOutside = isOutside;
      if (isOutside) {
        this.disperseParticles();
      }
    }

    if (!isOutside) {
      this.mousePos = { x, y };
    }
  }

  disperseParticles() {
    this.isDispersing = true;
    this.disperseStartTime = Date.now();
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    this.particles.forEach(particle => {
      // Calculate direction away from center
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const angle = Math.atan2(dy, dx);
      
      // Add randomness to the angle
      const randomAngle = angle + (Math.random() - 0.5) * Math.PI;
      
      // Strong initial force
      const force = 20 + Math.random() * 15;
      
      particle.speedX = Math.cos(randomAngle) * force;
      particle.speedY = Math.sin(randomAngle) * force;
    });
  }

  update() {
    const now = Date.now();
    const disperseProgress = this.isDispersing 
      ? Math.min((now - this.disperseStartTime) / this.disperseDuration, 1)
      : 0;

    this.particles.forEach(particle => {
      if (this.isDispersing) {
        if (disperseProgress === 1) {
          this.isDispersing = false;
        }
      } else {
        const dx = this.mousePos.x - particle.x;
        const dy = this.mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(180 / (distance + 1), 12);
        const angle = Math.atan2(dy, dx);
        
        particle.speedX += Math.cos(angle) * force * 0.035;
        particle.speedY += Math.sin(angle) * force * 0.035;
      }
      
      const speedDecay = this.isDispersing ? 0.98 : 0.92;
      particle.speedX *= speedDecay;
      particle.speedY *= speedDecay;
      
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      this.handleBoundaries(particle);
    });
  }

  private handleBoundaries(particle: Particle) {
    const buffer = 50;
    if (particle.x < -buffer) particle.x = this.canvas.width + buffer;
    if (particle.x > this.canvas.width + buffer) particle.x = -buffer;
    if (particle.y < -buffer) particle.y = this.canvas.height + buffer;
    if (particle.y > this.canvas.height + buffer) particle.y = -buffer;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }
}