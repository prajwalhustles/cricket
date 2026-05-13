import {
  HIT_ZONE_TOP,
  HIT_ZONE_BOTTOM,
  MAX_WICKETS,
  MAX_BALLS,
  RUN_OPTIONS
} from "./constants.js";

import { Ball } from "./ball.js";
import { Bat } from "./bat.js";

export class Game {
  constructor() {
    this.reset();
  }

  reset() {
    this.ball = new Ball();
    this.bat = new Bat();

    this.score = 0;
    this.wickets = 0;
    this.balls = 0;

    this.lastResult = "Press Space to hit";
    this.gameOver = false;
  }

  update() {
    if (this.gameOver) return;

    this.ball.update();
    this.bat.update();

    // Wait until hit animation completes
    if (this.ball.inFlight) {
      if (this.ball.landed) {
        this.balls++;

        if (
          this.wickets >= MAX_WICKETS || 
          this.balls >= MAX_BALLS
        ) {
          this.gameOver = true;
          return;
        }

        this.ball.reset();
      }
      return;
    }

    // Ball missed the bat
    if (this.ball.hasPassedBat()) {
      if (!this.ball.isHit) {
        this.wickets++;
        this.lastResult = "OUT!";
      }

      this.balls++;

      if (
        this.wickets >= MAX_WICKETS || 
        this.balls >= MAX_BALLS
      ) {
        this.gameOver = true;
        return;
      }

      this.ball.reset();
    }
  }

  attemptShot() {
    if (this.gameOver) return;

    this.bat.swing();

    if (this.ball.isHit || this.ball.inFlight) return;

    if (
      this.ball.y >= HIT_ZONE_TOP &&
      this.ball.y <= HIT_ZONE_BOTTOM
    ) {
      const runs =
        RUN_OPTIONS[
          Math.floor(Math.random() * RUN_OPTIONS.length)
        ]; 

      this.score += runs;
      this.lastResult = `${runs} Run${runs > 1 ? "s" : ""}!`;

      this.ball.hit(runs);
    }
  }
}