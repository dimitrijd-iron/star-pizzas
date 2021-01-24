"use strict";

class Player {
  constructor(canvas, starShips) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.starShips = starShips;
    this.size = 20; //  this.width   this.height
    this.x = Math.floor(this.canvas.width / 2);
    this.y = Math.floor(this.canvas.height / 2);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction = 0; // 0 to 359 degrees; 0 is north / "top"
    this.rotationStep = 6; // in 360 degrees
    this.inertia = 0.995;
    this.speed = 1;
    this.boostersOn = false;
    this.boosterTimer = undefined;
    this.bullets = [];
  }

  setDirection(directionChange) {
    this.direction -= directionChange * this.rotationStep + 360;
    this.direction %= 360;
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

  useBoosters() {
    if (this.boosterTimer !== undefined) {
      clearTimeout(this.boosterTimer);
      this.boosterTimer = undefined;
    }
    this.boostersOn = true;
    this.xSpeed += Math.sin((this.direction / 180) * Math.PI);
    this.ySpeed -= Math.cos((this.direction / 180) * Math.PI);
  }

  fire() {
    console.log("player fired!");
    const firedBullet = new Bullets(this);
    this.bullets.push(firedBullet);
  }

  // handleScreenCollision() {
  //   const screenTop = 0;
  //   const screenBottom = this.canvas.height;

  //   const playerTop = this.y;
  //   const playerBottom = this.y + this.size;

  //   if (playerBottom >= screenBottom) this.setDirection("up");
  //   else if (playerTop <= screenTop) this.setDirection("down");
  // }

  // removeLife() {
  //   this.lives -= 1;
  // }

  // didCollide(enemy) {
  //   const playerLeft = this.x;
  //   const playerRight = this.x + this.size;
  //   const playerTop = this.y;
  //   const playerBottom = this.y + this.size;

  //   const enemyLeft = enemy.x;
  //   const enemyRight = enemy.x + enemy.size;
  //   const enemyTop = enemy.y;
  //   const enemyBottom = enemy.y + enemy.size;

  //   const crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
  //   const crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;

  //   const crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;
  //   const crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;

  //   if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  draw() {
    let img = this.boostersOn ? boosters : pizza;
    drawImageRotated(
      this.ctx,
      img,
      this.x,
      this.y,
      0.15,
      (this.direction / 180) * Math.PI
    );
    if (this.boostersOn) {
      boostersSound.play();
      this.boosterTimer = setTimeout(() => (this.boostersOn = false), 1000);
    }
  }
}

function drawImageRotated(ctx, img, x, y, scale, rot) {
  // Credit: https://stackoverflow.com/a/50052594
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(rot);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
