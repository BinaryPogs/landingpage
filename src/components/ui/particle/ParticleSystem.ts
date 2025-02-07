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
    this.particles.forEach(particle => {
      Object.assign(particle, this.createParticle());
    });
    this.mousePos = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
  }

  updateMousePosition(x: number, y: number) {
    // Check if mouse is within canvas bounds
    const isOutside = x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height;
    
    if (isOutside !== this.isMouseOutside) {
      this.isMouseOutside = isOutside;
      if (isOutside) {
        // Reset mouse position to center when leaving
        this.mousePos = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
      }
    }

    if (!isOutside) {
      this.mousePos = { x, y };
    }
  }

  update() {
    this.particles.forEach(particle => {
      const dx = this.mousePos.x - particle.x;
      const dy = this.mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const force = Math.min(180 / (distance + 1), 8);
      const angle = Math.atan2(dy, dx);
      
      particle.speedX += Math.cos(angle) * force * 0.015;
      particle.speedY += Math.sin(angle) * force * 0.015;
      
      particle.speedX *= 0.96;
      particle.speedY *= 0.96;
      
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.x += Math.sin(Date.now() * particle.swaySpeed) * 0.3;

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