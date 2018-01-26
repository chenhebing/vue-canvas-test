const g = 10;
const radius = 8;
export default class Particle {
  constructor (ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.reset(0, 0, '', false);
  }

  paint () {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  reset (x, y, color = '', visible = true) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.color = color;
    this.visible = visible;
    this.drop = false;
  }

  goDrop () {
    const vx = Math.random() * 16 + 10;
    this.drop = true;
    this.vx = Math.random() >= 0.5 ? vx : -vx;
    this.vy = -(Math.random() * 64 + 10);
  }

  update (time) {
    if (this.drop) {
      this.x += this.vx * time;
      this.y += this.vy * time;
      let vy = this.vy + g * time;
      if (this.y >= this.height - radius) {
        this.y = this.height - radius;
        vy = -vy * 0.8;
      }
      this.vy = vy;
      if (this.x <= -radius || this.x >= this.width + radius) {
        this.visible = false;
      }
    }
    if (this.radius < radius) {
      this.radius += 0.5;
    }
  }
};
