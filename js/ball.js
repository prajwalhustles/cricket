import {
  BALL_RADIUS,
  BALL_START_X,
  BALL_START_Y,
  BALL_SPEED,
  PITCH_X,
  BAT_Y,
  CANVAS_WIDTH
} from "./constants.js";

export class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = BALL_START_X;
    this.y = BALL_START_Y;
    this.radius = BALL_RADIUS;
    this.speed = BALL_SPEED;
    this.isHit = false;

    // Flight animation after hit
    this.inFlight = false;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.18;
    this.landed = false;
  }

  update() {
    if (this.inFlight) {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;

      if (
        this.y > BAT_Y + 80 || 
        this.x < -50 || 
        this.x > CANVAS_WIDTH + 50
      ) {
        this.landed = true;
      }
      return;
    }

    this.y += this.speed;
  }

  hit(runs) {
    this.isHit = true;
    this.inFlight = true;

    // Send ball upward and to the right
    if (runs === 6) {
      this.vx = 7;
      this.vy = -11;
    } else if (runs === 4) {
      this.vx = 8;
      this.vy = -5;
    } else if (runs === 2) {
      this.vx = 5;
      this.vy = -3;
    } else {
      this.vx = 3;
      this.vy = -2;
    }

    // Position ball near bat when hit
    this.x = PITCH_X + 25;
    this.y = BAT_Y - 20;
  }

  hasPassedBat() {
    return this.y > BAT_Y + 20;
  }
}
