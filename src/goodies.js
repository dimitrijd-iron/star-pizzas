class Goodies {
  constructor(canvas, type, x, y, speed) {
    this.type = type;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.x = canvas.width + 50;
    this.y = y;
    this.speed = speed;
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
    console.log(this.type, this.x, this.y);
    this.ctx.drawImage(img, this.x, this.y, 60, 60);
    this.ctx.restore();
  }

  updatePosition() {
    this.x = this.x - this.speed;
  }
}
