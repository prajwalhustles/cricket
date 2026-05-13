import { Game } from "./js/game.js";
import { Renderer } from "./js/renderer.js";
import { setupControls } from "./js/controls.js";

// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Create game objects
const game = new Game();
const renderer = new Renderer(canvas, context);

// Enable keyboard controls
setupControls(game);

// Main animation loop
function animate() {
  game.update();
  renderer.draw(game);
  requestAnimationFrame(animate);
}

// Start the game
animate();
