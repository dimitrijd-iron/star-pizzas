"use strict";

/*
author: github.com/iron-dimitrijd
all rights and lefts reserved
*/

// source organization, credit and thanks:
// credit: https://github.com/ross-u/wdft-en-jan-2021/tree/master/m1/w2/d4/eternal_enemies

let game; // store instance of the current Game
let splashScreen; // Start Game Screen - element reference
let gameScreen; // Game Screen - element reference
let gameOverScreen; //  Game Over Screen - element reference
let cnt = 0;
let pizza;
let mozzarella;
let tomato;
let basil;
let pineapple;
let boosters;
let stars;
let mission;

let boostersSound;
let laserSound;

/* 

   initial storyline

*/

function removeSplashScreen() {
  splashScreen.remove();
}

/* 
 -- splash (start) screen
 */

function createSplashScreen() {
  splashScreen = buildDom(`
    <main class="splash container">
      <div class="canvas-container">
      <canvas></canvas>
    </div>
    </main>
  `);
  document.body.appendChild(splashScreen);
  const canvasEl = document.querySelector("canvas");
  const canvasContainer = document.querySelector(".canvas-container");
  canvasEl.width = canvasContainer.clientWidth;
  canvasEl.height = canvasContainer.clientHeight;

  let ctx = canvasEl.getContext("2d");
  ctx.drawImage(stars, 0, 0, canvasEl.width, canvasEl.height);

  ctx.drawImage(
    mission,
    canvasEl.width / 2 - 225,
    canvasEl.height / 2 - 225,
    450,
    450
  );

  canvasEl.addEventListener("click", startGame);
}

function removeSplashScreen() {
  splashScreen.remove();
}

// splash (start) screen

function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game container">
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

  document.body.appendChild(gameScreen);
  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

// -- game over screen

function createGameOverScreen() {
  gameOverScreen = buildDom(`
    <main class="game-over-screen">
      <h1>Game over</h1>
      <h2>Your score: ${game.player.points}</h2>
      <h2>${game.player.points >= 50 ? "You MADE it!" : "Try Again!"}</h2>
      <span><img src=${
        game.player.points >= 0
          ? "img/pizza-prize.png"
          : "img/pineapple-pizza.png width='300px'"
      }></img></span>
      <h2><button>Restart</button></div></h2>
  	</main>
  `);

  // let imgEl = gameOverScreen.querySelector("img");
  // imgEl.size = "200px";

  document.body.appendChild(gameOverScreen);
  const restartButton = gameOverScreen.querySelector("button");

  restartButton.addEventListener("click", startGame);
}

function removeGameOverScreen() {
  gameOverScreen.remove();
}

// -- Setting the game state - on game start/game over

function startGame() {
  if (gameOverScreen) {
    removeGameOverScreen();
  }

  removeSplashScreen();

  createGameScreen();

  game = new Game();
  game.gameScreen = gameScreen;

  //   Start the game ...
  game.start();
}

function endGame() {
  gameScreen.remove();
  createGameOverScreen();
}

/* loads assets */
// image credits: unknown
pizza = new Image();
pizza.src = "img/pizza-starship.png";
mozzarella = new Image();
mozzarella.src = "img/mozzarella.png";
tomato = new Image();
tomato.src = "img/tomato.png";
basil = new Image();
basil.src = "img/basil.png";
pineapple = new Image();
pineapple.src = "img/pineapple.png";
boosters = new Image();
boosters.src = "img/boosters.png";
stars = new Image();
stars.src = "img/stars.jpg";
mission = new Image();
mission.src = "img/mission.png";

const images = {
  pizza: pizza,
  boosters: boosters,
  tomato: tomato,
  mozzarella: mozzarella,
  pineapple: pineapple,
  basil: basil,
  stars: stars,
  mission: mission,
};

// credit: https://soundbible.com/1492-Rocket-Thrusters.html
boostersSound = new Audio("sound/rocket.mp3");

// credit: https://www.fesliyanstudios.com/play-mp3/5462
laserSound = new Audio("sound/laser.mp3");

// Run the function once all of the resources are loaded
// window.addEventListener("load", createSplashScreen);

window.addEventListener("load", createSplashScreen);

setTimeout(function () {
  removeSplashScreen();
  createGameScreen();
}, 25000);
