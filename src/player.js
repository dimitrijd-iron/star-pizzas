"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.lives = lives;
    this.points = 0;
    this.size = 30; //  this.width   this.height
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
    this.messageActions = {
      ArrowLeft: this.setDirectionLeft,
      ArrowRight: this.setDirectionRight,
      ArrowUp: this.useBoosters,
      F: this.fire,
      f: this.fire,
    };
  }

  setDirection(directionChange) {
    this.direction -= directionChange * this.rotationStep + 360;
    this.direction %= 360;
  }

  setDirectionLeft() {
    this.setDirection(1);
  }

  setDirectionRight() {
    setDirection(-1);
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
    // console.log("player fired!");
    const firedBullet = new Bullets(this);
    this.bullets.push(firedBullet);
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    let img = this.boostersOn ? images["boosters"] : images["pizza"];
    drawImageRotated(
      this.ctx,
      img,
      this.x,
      this.y,
      0.3,
      (this.direction / 180) * Math.PI
    );
    if (this.boostersOn) {
      boostersSound.play();
      this.boosterTimer = setTimeout(() => (this.boostersOn = false), 1000);
    }
  }

  message(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.setDirection(+1);
        break;
      case "ArrowRight":
        this.setDirection(-1);
        break;
      case "ArrowUp":
        this.useBoosters();
        break;
      case "F":
      case "f":
        this.fire();
        break;
      default:
    }
    return;
  }
}
