export function setupControls(game) {
  document.addEventListener("keydown", (event) => {
    // Space bar → attempt a shot
    if (event.code === "Space") {
      event.preventDefault();
      game.attemptShot();
    }

    // R → restart after game over
    if (event.key.toLowerCase() === "r") {
      if (game.gameOver) {
        game.reset();
      }
    }
  });
}