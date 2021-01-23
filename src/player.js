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
    this.boostersPower = 1;
    this.boostersOn = false;
  }

  setDirection(directionChange) {
    console.log("setting direction");
    this.direction += directionChange * this.rotationStep;
    this.direction %= 360;
  }

  updatePosition() {
    // console.log("updating position");
    // apply inertia
    this.xSpeed *= this.inertia;
    this.ySpeed *= this.inertia;
    this.x += this.xSpeed;
    this.x %= this.canvas.width;
    this.y += this.ySpeed;
    this.y %= this.canvas.height;
  }

  boosters() {
    this.boostersOn = true;
    this.xSpeed += Math.sin((this.direction / 180) * Math.PI);
    this.ySpeed -= Math.cos((this.direction / 180) * Math.PI);
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
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((this.direction / 180) * Math.PI);
    this.ctx.drawImage(this.boostersOn ? boosters : pizza, 0, 0);
    this.ctx.restore();
    this.boostersOn = false;
  }
}
