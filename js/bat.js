import {
  BAT_WIDTH,
  BAT_HEIGHT,
  BAT_X,
  BAT_Y
} from "./constants.js";

export class Bat {
  constructor() {
    this.width = BAT_WIDTH;
    this.height = BAT_HEIGHT;
    this.x = BAT_X;
    this.y = BAT_Y;

    // Swing state
    this.swinging = false;
    this.swingTimer = 0;
    this.swingDuration = 10; // frames
  }

  // Start the bat swing
  swing() {
    if (!this.swinging) {
      this.swinging = true;
      this.swingTimer = this.swingDuration;
    }
  }

  // Update swing animation
  update() {
    if (this.swinging) {
      this.swingTimer--;

      if (this.swingTimer <= 0) {
        this.swinging = false;
      }
    }
  }
}