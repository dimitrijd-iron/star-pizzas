class MovingObjects {
  constructor(player) {
    this.canvas = player.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = player.x;
    this.y = player.y;
    this.size = 10;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xAccel = 0;
    this.yAccel = 0;
    this.soundOn = true;
    this.soundTimer = undefined;
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.xSpeed *= this.xAccel;
    this.ySpeed *= this.yAccel;
  }
}
