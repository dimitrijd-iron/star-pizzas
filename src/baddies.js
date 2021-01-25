class Baddies {
  constructor(canvas, type, size, entryTensor) {
    this.type = type;
    this.size = size;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = entryTensor.x;
    this.y = entryTensor.y;
    this.speedX = entryTensor.speedX;
    this.speedY = entryTensor.speedY;
  }

  draw() {
    this.ctx.save();
    this.ctx.drawImage(images[this.type], this.x, this.y, this.size, this.size);
    this.ctx.restore();
  }

  updatePosition() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }
}
