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
    this.soundOn = true;
    this.soundTimer = undefined;
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    if (this.soundOn) {
      laserSound.play();
      this.soundTimer = setTimeout(() => (this.soundOn = false), 300);
    }
  }

  updatePosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
