"use strict";

class Player {
  constructor(canvas, starShips) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.starShips = starShips;
    this.size = 10; //  this.width   this.height
    this.x = Math.floor(this.canvas.width / 2);
    this.y = Math.floor(this.canvas.height / 2);
    this.direction = 0; // in fraction of unity
    this.rotationStep = 1 / 16; // it should be 1/2^n in integers
    this.speed = 1;
  }

  setDirection(directionChange) {
    console.log("setting direction");
    this.direction += 1 + directionChange * this.rotationStep;
    this.direction %= 1;
    console.log(Math.floor(this.direction * 360));
  }

  updatePosition() {
    // console.log("updating position");
    this.x += Math.sin(Math.PI * this.direction) * this.speed;
    this.x %= this.canvas.width;
    this.y += Math.cos(Math.PI * this.direction) * this.speed;
    this.y %= this.canvas.height;
    // console.log(this.x, this.y);
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
    this.ctx.fillStyle = "#66D3FA";
    // this.ctx.fillRect(x, y, width, height);
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
