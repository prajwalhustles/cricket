// Canvas size
export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 500;

// Pitch position
export const PITCH_X = CANVAS_WIDTH / 2;

// Ball settings
export const BALL_RADIUS = 10;
export const BALL_START_X = PITCH_X;
export const BALL_START_Y = 40;
export const BALL_SPEED = 5;

// Bat settings
export const BAT_WIDTH = 120;
export const BAT_HEIGHT = 12;
export const BAT_X = PITCH_X - BAT_WIDTH / 2;
export const BAT_Y = CANVAS_HEIGHT - 70;

// Hit timing zone
// If the player presses Space while the ball is in this zone,
// the shot will connect.
export const HIT_ZONE_TOP = BAT_Y - 30;
export const HIT_ZONE_BOTTOM = BAT_Y + 20;

// Match settings
export const MAX_WICKETS = 10;
export const MAX_BALLS = 30; // 5 overs

// Possible run outcomes for successful shots
export const RUN_OPTIONS = [1, 2, 4, 6];

// Colors
export const COLORS = {
  sky: "#0f172a",
  grass: "#0b8f3c",
  pitch: "#d2b48c",
  crease: "#ffffff",
  ball: "#d62828",
  bat: "#c08457",
  text: "#f8fafc",
  accent: "#38bdf8"
};