class Ball {
  radius: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  mass: number;
  color: string;

  constructor(x, y, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.dx = randomDx();
    this.dy = randomDy();
    this.mass = this.radius * this.radius * this.radius;
    this.color = "#000000";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      Math.round(this.x),
      Math.round(this.y),
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  speed() {
    // 해당 물체의 순간 속도
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }
  angle() {
    // 해당 물체의 각도 반환
    return Math.atan2(this.dy, this.dx);
  }
}
