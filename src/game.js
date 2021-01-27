class Game {
  constructor() {
    // canvas and canvas elements
    this.canvas = undefined;
    this.ctx = undefined;
    this.gameScreen = undefined;

    // entities
    this.goodies = [];
    this.baddies = [];
    this.bullets = [];
    this.player = undefined;

    this.entityList = ["player", "goodies", "baddies", "bullets"];

    this.entityCollisions = [
      ["baddies", "player"],
      ["goodies", "player"],
      ["baddies", "bullets"],
    ];

    this.keyEventToEntity = {
      ArrowLeft: ["player"],
      ArrowRight: ["player"],
      ArrowUp: ["player"],
      F: ["player"],
      f: ["player", "player"],
      " ": ["player"],
    };

    // game status
    this.gameIsOver = false;
  }

  //  Create the canvas, set dimensions and get the context
  //  Expect .canva-container class to be available in DOM
  createCanvas() {
    this.canvas = document.querySelector("canvas");
    const canvasContainer = document.querySelector(".canvas-container");
    this.canvas.width = canvasContainer.clientWidth;
    this.canvas.height = canvasContainer.clientHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.drawImage(stars, 0, 0, this.canvas.width, this.canvas.height);
  }

  // Key board event handler
  handleKeyDown(event) {
    let msg = event.key;
    for (let entity of this.keyEventToEntity[msg]) this[entity].message(event);
  }

  //  Bind the event handlers
  createEventHandlers() {
    const boundHandleKeyDown = this.handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);
  }

  start() {
    this.createCanvas();
    this.createEventHandlers();
    this.player = new Player(this.canvas, 2);
    this.startLoop();
  }

  filterByPosition(item) {
    if (item.x < 0 - 200 || item.x > game.canvas.width + 200) return false;
    if (item.y < 0 - 200 || item.y > game.canvas.height + 200) return false;
    return true;
  }

  startLoop() {
    const loop = function () {
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
      this.ctx.drawImage(stars, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = "12px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        `Lives: ${this.player.lives}  Points: ${this.player.points}`,
        10,
        this.canvas.height - 10
      );

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
    for (let baddie of this.baddies) {
      if (didCollide(this.player, baddie)) {
        this.player.removeLife();
        baddie.x = +100000;
        if (this.player.lives <= 0) {
          this.gameOver();
        }
      }
    }

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
}
