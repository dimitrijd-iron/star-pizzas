class Goodies {
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
    let img;
    this.ctx.save();
    switch (this.type) {
      case "mozzarella":
        img = mozzarella;
        break;
      case "tomato":
        img = tomato;
        break;
      case "mozzarella":
        img = mozzarella;
        break;
      case "basil":
      default:
        img = basil;
        break;
    }
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    this.ctx.restore();
  }

  updatePosition() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }
}
