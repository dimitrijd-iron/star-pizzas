"use strict";

/*
author: github.com/iron-dimitrijd
license: GNU-GPL 3.0
*/

// source organization, credit and thanks:
// credit: https://github.com/ross-u/wdft-en-jan-2021/tree/master/m1/w2/d4/eternal_enemies

let game; // store instance of the current Game
let splashScreen; // Start Game Screen - element reference
let gameScreen; // Game Screen - element reference
let gameOverScreen; //  Game Over Screen - element reference
let storyScreen;
let cnt = 0;
let pizza;
let mozzarella;
let tomato;
let basil;
let pineapple;
let boosters;
let boostersSound;
let stars;
let mission;

/* 

   initial storyline

*/

function removeStoryScreen() {
  storyScreen.remove();
}

function createStoryScreen() {
  storyScreen = buildDom(`
    <main class="splash container">
      <div class="fade"></div>

      <section class="star-wars">
      
        <div class="crawl">
      
          <div class="title">
            <p>Star Pizzas</p>
            <h1>The Revenge of the</h1>
            <h1>Pinapples</h1>
          </div>
          <br>
          <p>In a restaurant very very close, no more than a few minutes ago somebody put pineapples on a PIZZA!</p>
          <br><br>
          <p>Cpt. Slice, a brave chef from IronStar, is on a life-risking misssiong to save the people from bad pizzas and restore freedom to the galaxy…</p>
      
        </div>
      
      </section>

      <canvas></canvas>
    </div>
    </main>
  `);
  document.body.appendChild(storyScreen);
}

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
  // canvasEl.width = document.body.clientWidth;
  // canvasEl.height = document.body.clientHeight;

  canvasEl.width = canvasContainer.clientWidth;
  canvasEl.height = canvasContainer.clientHeight;

  let ctx = canvasEl.getContext("2d");
  ctx.drawImage(stars, 0, 0, canvasEl.width, canvasEl.height);

  ctx.drawImage(
    mission,
    canvasEl.width / 2 - 200,
    canvasEl.height / 2 - 200,
    400,
    400
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
    <main>
  		<h1>Game over</h1>
  		<p>Your score: <span></span></p>
  		<button>Restart</button>
  	</main>
  `);

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
  console.log("end game function!", game.player.points);
  createGameOverScreen();
  let pointsElement = document.body.querySelector("span");
  pointsElement.textContent = game.player.points;
  console.log(pointsElement);
}

/* loads assets */
// image credits: unknown
pizza = new Image();
pizza.src = "./img/pizza-starship.png";
mozzarella = new Image();
mozzarella.src = "./img/mozzarella.png";
tomato = new Image();
tomato.src = "./img/tomato.png";
basil = new Image();
basil.src = "./img/basil.png";
pineapple = new Image();
pineapple.src = "./img/pineapple.png";
boosters = new Image();
boosters.src = "./img/boosters.png";
stars = new Image();
stars.src = "./img/stars.jpg";
mission = new Image();
mission.src = "./img/mission.png";

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
boostersSound = new Audio("./sound/rocket.mp3");

// Run the function once all of the resources are loaded
// window.addEventListener("load", createSplashScreen);

window.addEventListener("load", createStoryScreen);

setTimeout(function () {
  removeStoryScreen();
  createSplashScreen();
}, 25000);
