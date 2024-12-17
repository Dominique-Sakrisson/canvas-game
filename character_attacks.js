export function meleeStrike(player) {
  if (!player) return;
  const { x, y, angle } = player;
  const size = 25; // Larger than a projectile, but smaller than magic strike
  const maxDistance = 50; // Maximum distance it can travel
  const speed = player.speed * 2; // Speed at which it moves
  const startX = x + Math.cos(angle) * (player.size / 2);
  const startY = y + Math.sin(angle) * (player.size / 2);

  return {
    xStart: player.x,
    yStart: player.y,
    angle,
    size,
    attackTiming: Date.now(),

    xEnd: player.x + Math.cos(player.angle) * 25,
    yEnd: player.y + Math.cos(player.angle) * 25,
  };
}
