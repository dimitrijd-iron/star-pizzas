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
      // console.log(event.key);
      switch (event.key) {
        case "ArrowLeft":
          this.player.setDirection(1);
          break;
        case "ArrowRight":
          this.player.setDirection(-1);
          break;
        case "ArrowUp":
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
      }
    }

    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    // Start the loop using requestAnimationFrame()
    this.startLoop();
  }

  filterByPosition(item) {
    // console.log("filtering by position");
    if (item.x < 0 - 200 || item.x > game.canvas.width + 200) return false;
    if (item.y < 0 - 200 || item.y > game.canvas.height + 200) return false;
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
        const newBaddie = new Baddies(
          this.canvas,
          "pineapple",
          150,
          randomEntryTensor(this)
        );
        this.baddies.push(newBaddie);
      }

      // 1.1. Create new goodies - randomly
      if (Math.random() > 0.8) {
        const randomY = Math.random() * this.canvas.height;
        const randomType = Math.random();
        const goodiesType =
          randomType < 0.5
            ? "tomato"
            : randomType < 0.9
            ? "mozzarella"
            : "basil";
        const goodieSize = 60;
        const newGoodie = new Goodies(
          this.canvas,
          goodiesType,
          goodieSize,
          randomEntryTensor(this)
        );
        this.goodies.push(newGoodie);
      }

      //   // 1.2 Check if the player had hit any enemy
      this.checkCollisions();

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

  checkCollisions() {
    // Check collision between Player and Baddies
    this.baddies.forEach(function (baddie) {
      // if (this.player.didCollide(baddie)) {
      if (didCollide(this.player, baddie)) {
        this.player.removeLife();
        console.log("this.player.lives", this.player.lives);
        // Move the enemy off the screen, to the left
        baddie.x = +100000;
        if (this.player.lives <= 0) {
          this.gameOver();
        }
      }
    }, this);

    for (let baddie of this.baddies)
      for (let bullet of this.player.bullets) {
        if (didCollide(bullet, baddie)) {
          baddie.x = 100000;
          bullet.x = 100000;
        }
      }

    for (let goodie of this.goodies) {
      if (didCollide(this.player, goodie)) {
        let points;
        console.log(goodie);
        switch (goodie.type) {
          case "mozzarella":
            points = 10;
            break;
          case "tomato":
            points = 5;
            break;
          case "basil":
            points = 25;
            break;
            defualt: alert("unknown goodie!!");
        }
        console.log("got ", points, " points!");
        this.player.points += points;
        goodie.x = +100000;
      }
    }
  }

  gameOver() {
    this.gameIsOver = true;
    console.log("GAME OVER");
    endGame();
  }

  updateGameStats() {
    let livesElement = document.getElementById("lives-value");
    livesElement.textContent = " " + this.player.lives + " ";
    let pointsElement = document.getElementById("points-value");
    pointsElement.textContent = "0000" + this.player.points;
  }
}
