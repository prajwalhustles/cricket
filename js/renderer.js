import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PITCH_X,
  BAT_Y,
  COLORS
} from "./constants.js";

export class Renderer {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
  }

  draw(game) {
    this.drawBackground();
    this.drawPitch();
    this.drawWickets();   // behind batter
    this.drawBatter(game.bat);
    this.drawBall(game.ball);
    this.drawScore(game);
    this.drawResult(game.lastResult);

    if (game.gameOver) {
      this.drawGameOver(game);
    }
  }

  drawBackground() {
    this.context.fillStyle = COLORS.sky;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = COLORS.grass;
    this.context.fillRect(
      0,
      this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height / 2
    );
  }

  drawPitch() {
    const width = 140;
    const height = this.canvas.height - 80;
    const x = PITCH_X - width / 2;
    const y = 40;

    this.context.fillStyle = COLORS.pitch;
    this.context.fillRect(x, y, width, height);
  }

  drawWickets() {
    const baseY = BAT_Y + 5;
    const stumpHeight = 45;
    const spacing = 10;
    const startX = PITCH_X - spacing;

    this.context.strokeStyle = "#f5deb3";
    this.context.lineWidth = 4;

    for (let i = 0; i < 3; i++) {
      const x = startX + i * spacing;
      this.context.beginPath();
      this.context.moveTo(x, baseY);
      this.context.lineTo(x, baseY - stumpHeight);
      this.context.stroke(); 
    }

    // Bails
    this.context.lineWidth = 3;
    this.context.beginPath();
    this.context.moveTo(startX - 2, baseY - stumpHeight);
    this.context.lineTo(startX + spacing + 2, baseY - stumpHeight);
    this.context.stroke(); 

    this.context.beginPath();
    this.context.moveTo(startX + spacing - 2, baseY - stumpHeight);
    this.context.lineTo(startX + spacing * 2 + 2, baseY - stumpHeight);
    this.context.stroke(); 
  }

  drawBatter(bat) {
    const ctx = this.context;
    const x = PITCH_X + 30;
    const y = BAT_Y - 65;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;

    // Head
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke(); 

    // Body
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x, y + 40);

    // Arms
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 20, y + 10);

    // Legs
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x - 12, y + 60);
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x + 12, y + 60);
    ctx.stroke(); 

    // Bat
    ctx.save(); 
    if (bat.swinging) {
      ctx.translate(x + 20, y + 10);
      ctx.rotate(-1.0);
      ctx.translate(-(x + 20), -(y + 10));
    }

    ctx.strokeStyle = COLORS.bat;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x + 20, y + 10);
    ctx.lineTo(x + 45, y - 25);
    ctx.stroke(); 

    ctx.restore(); 
  }

  drawBall(ball) {
    this.context.beginPath();
    this.context.fillStyle = COLORS.ball;
    this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.context.fill(); 
  }

  drawScore(game) {
    this.context.fillStyle = COLORS.text;
    this.context.font = "bold 28px Arial";
    this.context.fillText(`Runs: ${game.score}`, 30, 50);
    this.context.fillText(`Wickets: ${game.wickets}`, 30, 90);
    this.context.fillText(`Balls: ${game.balls}`, 30, 130);
  }

  drawResult(message) {
    this.context.fillStyle = COLORS.accent;
    this.context.font = "bold 30px Arial";
    this.context.textAlign = "center";
    this.context.fillText(message, this.canvas.width / 2, 40);
    this.context.textAlign = "left";
  }

  drawGameOver(game) {
    this.context.fillStyle = "rgba(0,0,0,0.7)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "#fff";
    this.context.textAlign = "center";
    this.context.font = "bold 48px Arial";
    this.context.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 30);

    this.context.font = "28px Arial";
    this.context.fillText(`Final Score: ${game.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

    this.context.font = "20px Arial";
    this.context.fillText("Press R to Restart", this.canvas.width / 2, this.canvas.height / 2 + 70);

    this.context.textAlign = "left";
  }
}