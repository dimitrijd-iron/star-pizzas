"use strict";

class Game {
  constructor() {
    this.canvas = undefined;
    this.ctx = undefined;
    this.goodies = [];
    this.baddies = [];
    this.bullets = [];
    this.starBase = undefined;
    this.player = undefined;
    this.gameIsOver = false;
    this.score = 0;
    this.gameScreen = undefined;
    this.starShipsElement = undefined;
    this.ingredientsElement = undefined;
  }

  start() {
    const canvasContainer = document.querySelector(".canvas-container");

    // Get and create the canvas context
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and lives elements
    this.starShipsElement = document.querySelector(".starships .value");
    this.ingredientsElement = document.querySelector(".ingredients .value");

    // Set the canvas dimensions
    const containerWidth = canvasContainer.clientWidth;
    const containerHeight = canvasContainer.clientHeight;

    this.canvas.width = containerWidth;
    this.canvas.height = containerHeight;

    // Create the new Player - Cap Slice
    this.player = new Player(this.canvas, 3);

    this.player.draw();

    function handleKeyDown(event) {
      console.log(event.key);
      switch (event.key) {
        case "ArrowLeft":
          console.log("positive rotation");
          this.player.setDirection(1);
          break;
        case "ArrowRight":
          console.log("negative rotation");
          this.player.setDirection(-1);
          break;
        case "ArrowUp":
          console.log("boosters on!");
          this.player.useBoosters();
          break;
        case "F":
        case "f":
          this.player.fire();
          break;
        case "S":
        case "s":
          console.log("pizza shields up!");
          // this.player.shieldsOn();
          break;
        default:
          console.log("any other key");
      }
    }

    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    // Start the loop using requestAnimationFrame()
    this.startLoop();
  }

  filterByPosition(item) {
    // console.log("filtering by position");
    if (item.x < 0 - 50 || item.x > game.canvas.width + 50) return false;
    if (item.y < 0 - 50 || item.y > game.canvas.height + 50) return false;
    return true;
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
      //   this.score += 5;
      this.updateGameStats();

      // 1.1. Create new baddies - randomly
      if (Math.random() > 0.97) {
        const randomY = Math.random() * this.canvas.height;
        const newBaddie = new Baddies(this.canvas, randomY, 5);
        this.baddies.push(newBaddie);
      }

      // 1.1. Create new goodies - randomly
      if (Math.random() > 0.97) {
        const randomY = Math.random() * this.canvas.height;
        const randomType = Math.random();
        const goodiesType =
          randomType < 0.5
            ? "tomato"
            : randomType < 0.9
            ? "mozzarella"
            : "basil";
        const newGoodie = new Goodies(
          this.canvas,
          goodiesType,
          this.canvas.width + 50,
          randomY,
          5
        );
        this.goodies.push(newGoodie);
      }

      //   // 1.2 Check if the player had hit any enemy
      //   this.checkCollisions();

      // 1.3.1 Update the player and check the screen collision
      this.player.updatePosition();

      // 1.3.2 Update the baddies
      const updatedBaddies = this.baddies.filter(this.filterByPosition);
      this.baddies.forEach((el) => el.updatePosition());
      this.baddies = updatedBaddies;

      // 1.3.3 Update the goodies
      const updatedGoodies = this.goodies.filter(this.filterByPosition);
      this.goodies.forEach((el) => el.updatePosition());
      this.goodies = updatedGoodies;

      // 1.3.3 Update the bullets
      const updatedBullets = this.player.bullets.filter(this.filterByPosition);
      this.player.bullets.forEach((el) => el.updatePosition());
      this.player.bullets = updatedBullets;

      // 2. CLEAR THE CANVAS - clear the previous frame
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. DRAW - UPDATE THE CANVAS
      // 3.1 Draw the player
      this.player.draw();

      // 3.2 Draw all of the baddies
      this.baddies.forEach(function (baddie) {
        // console.log("drawing baddies");
        baddie.draw();
      });

      // 3.2 Draw all of the goodies
      this.goodies.forEach(function (goodie) {
        // console.log("drawing goodies");
        goodie.draw();
      });

      // 3.2 Draw all of the bullet
      this.player.bullets.forEach(function (bullet) {
        bullet.draw();
      });

      // 4. REPEAT
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }
    }.bind(this);

    // initial call
    loop();
  }

  // checkCollisions() {
  //   // .forEach .map .filter methods block the value of `this`
  //   this.enemies.forEach(function (enemy) {
  //     if (this.player.didCollide(enemy)) {
  //       this.player.removeLife();

  //       console.log("this.player.lives", this.player.lives);

  //       // Move the enemy off the screen, to the left
  //       enemy.x = 0 - enemy.size;

  //       if (this.player.lives <= 0) {
  //         this.gameOver(); // TODO
  //       }
  //     }
  //   }, this);
  // }

  gameOver() {
    this.gameIsOver = true;
    console.log("GAME OVER");

    // show the end game screen
    endGame();
  }

  updateGameStats() {
    // this.starShipsElement.textContent = this.player.starships;
    // this.ingredientsElement.textContent = this.ingredients;
  }
}
