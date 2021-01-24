class Baddies {
  constructor(canvas, entryTensor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.x = entryTensor.x;
    this.y = entryTensor.y;
    this.speedX = entryTensor.speedX;
    this.speedY = entryTensor.speedY;
  }

  draw() {
    this.ctx.save();
    this.ctx.drawImage(pineapple, this.x, this.y, 140, 140);
    this.ctx.restore();
  }

  updatePosition() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }
}
