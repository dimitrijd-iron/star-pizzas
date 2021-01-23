"use strict";

class Game {
  constructor() {
    this.canvas = undefined;
    this.ctx = undefined;
    this.asteroids = [];
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

    // this.player.draw();

    // Arrow function doesn't value `this` inside.
    // Arrow function takes the value of this form the surrounding scope (place)
    // where it is created

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
        case " ":
          console.log("FIRE!");
          // this.player.fire();
          break;
        case "P":
        case "p":
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

  startLoop() {
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
      //   this.score += 5;
      this.updateGameStats();

      //   // 1.1. Create new enemies - randomly
      //   if (Math.random() > 0.97) {
      //     // 0 - 0.991

      //     const randomY = Math.random() * this.canvas.height;
      //     const newEnemy = new Enemy(this.canvas, randomY, 5);

      //     this.enemies.push(newEnemy);
      //   }

      //   // 1.2 Check if the player had hit any enemy
      //   this.checkCollisions();

      // 1.3 Update the player and check the screen collision
      this.player.updatePosition();
      //   this.player.handleScreenCollision();

      // 1.4 Move existing the enemies
      // 1.5 Remove the enemies that are outside of the screen
      //   const updatedEnemies = this.enemies.filter(function (enemyObj) {
      //     enemyObj.updatePosition();
      //     return enemyObj.isInsideScreen(); // false - filter out
      //   });

      // this.enemies = updatedEnemies;

      // 2. CLEAR THE CANVAS - clear the previous frame
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. DRAW - UPDATE THE CANVAS
      // 3.1 Draw the player
      this.player.draw();

      // 3.2 Draw all of the enemies
      // this.enemies.forEach(function (enemyObj) {
      //   enemyObj.draw();
      // });

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
