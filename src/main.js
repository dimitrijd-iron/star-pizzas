"use strict";

let game; // store instance of the current Game
let splashScreen; // Start Game Screen - element reference
let gameScreen; // Game Screen - element reference
let gameOverScreen; //  Game Over Screen - element reference
let cnt = 0;

// Helper function used to create DOM elements out of a string
function buildDom(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const result = tempDiv.children[0];
  return result;
}

// -- splash (start) screen

function createSplashScreen() {
  splashScreen = buildDom(`
    <main>
      <h1>Star Pizzas</h1>
      <button>Start Baking</button>
    </main>
  `);

  document.body.appendChild(splashScreen);
  const startButton = splashScreen.querySelector("button");
  // make it a pizza!

  startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
  splashScreen.remove();
}

// -- game screen

function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game container">
      <div class="canvas-container">
        <canvas></canvas>
      </div>
      <footer>
      <div class="starships">
        <span class="label">Starships:</span>
        <span class="value"></span>
      </div>
      <div class="ingredients">
        <span class="label">Ingredients:</span>
        <span class="value"></span>
      </div>
    </footer>
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
  createGameOverScreen();
}

// Run the function once all of the resources are loaded
window.addEventListener("load", createSplashScreen);
