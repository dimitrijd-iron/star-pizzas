class Bullets {
  constructor(player) {
    this.canvas = player.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = player.x;
    this.y = player.y;
    this.size = 5;
    this.xSpeed =
      player.xSpeed + 6 * Math.sin((player.direction / 180) * Math.PI);
    this.ySpeed =
      player.ySpeed - 6 * Math.cos((player.direction / 180) * Math.PI);

    console.log("bullet", this.x, this.y, this.xSpeed, this.ySpeed);
  }

  didCollide(obj) {
    const centerX = this.x + this.size / 2;
    const centerY = this.y + this.size / 2;
    const objX = obj.x + obj.size / 2;
    const objY = obj.y + obj.size / 2;
    const minDist2 = (this.size / 2 + obj.size / 2) ** 2;
    if (calcDist2(centerX, centerY, objX, objY) < minDist2) return true;
    return false;
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
