class Baddies {
  constructor(canvas, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.x = canvas.width + 50;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    this.ctx.save();
    this.ctx.drawImage(pineapple, this.x, this.y, 90, 90);
    this.ctx.restore();
  }

  updatePosition() {
    this.x = this.x - this.speed;
  }
}
