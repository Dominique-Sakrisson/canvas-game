//the style of this attack looks like a spear or a lazer beam

//just need to change it to have a very slow fire rate

function spearStrike() {
  const { x, y, angle } = player;
  const size = 50; // Larger than a projectile, but smaller than magic strike
  const maxDistance = 0; // Maximum distance it can travel
  const speed = player.speed * 2; // Speed at which it moves
  const startX = x + Math.cos(angle) * (player.size / 2);
  const startY = y + Math.sin(angle) * (player.size / 2);
  // Create a melee strike that moves forward

  meleeStrikes.push({
    xStart: player.x,
    yStart: player.y,
    angle,
    size,
    speed,
    xEnd: player.x + Math.cos(player.angle) * 100,
    yEnd: player.y + Math.cos(player.angle) * 100,
    // distanceTraveled: 0,
    maxDistance,
  });
  // // Create a melee strike that moves forward
  // meleeStrikes.push({
  //   x: startX,
  //   y: startY,
  //   angle,
  //   size,
  //   speed,
  //   distanceTraveled: 0,
  //   maxDistance,
  // });
}
