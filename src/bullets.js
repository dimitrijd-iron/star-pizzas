class Bullets {
  constructor(player) {
    this.canvas = player.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = player.x;
    this.y = player.y;
    this.xSize = 2;
    this.ySize = 5;
    this.xSpeed =
      player.xSpeed + 6 * Math.sin((player.direction / 180) * Math.PI);
    this.ySpeed =
      player.ySpeed - 6 * Math.cos((player.direction / 180) * Math.PI);

    console.log("bullet", this.x, this.y, this.xSpeed, this.ySpeed);
  }

  draw() {
    console.log("drawing bullet", this.x, this.y, this.xSize, this.ySize);
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
  }

  updatePosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
