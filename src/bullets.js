class Bullets {
  constructor(canvas, player) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = player.x;
    this.y = player.y;
    this.xSize = 2;
    this.ySize = 5;
    this.xSpeed = 10 * Math.sin((this.direction / 180) * Math.PI);
    this.ySpeed = 10 * Math.cos((this.direction / 180) * Math.PI);
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
  }

  updatePosition() {
    // apply inertia
    this.xSpeed *= this.inertia;
    this.ySpeed *= this.inertia;
    // add module to module idea credit
    // credit: https://github.com/jedimahdi/asteroids-game/blob/master/src/utils/base.js
    this.x += this.xSpeed + this.canvas.width;
    this.x %= this.canvas.width;
    this.y += this.ySpeed + this.canvas.height;
    this.y %= this.canvas.height;
  }
}
