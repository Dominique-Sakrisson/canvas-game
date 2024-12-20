export function drawWalls(walls, ctx) {
  ctx.fillStyle = "gray"; // Wall color
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";

  walls.forEach((wall) => {
    ctx.beginPath();
    ctx.rect(wall.x, wall.y, wall.width, wall.height);
    ctx.fill();
    ctx.stroke();
  });
}
