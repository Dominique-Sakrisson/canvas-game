// Generate a certain number of walls (e.g., 5 walls) ensuring they don't break the rules
export function rollWalls(numberWalls, payload) {
  let walls = [];
  for (let i = 0; i < numberWalls; i++) {
    walls.push(generateWall(payload));
  }
  return walls;
}

export function generateWall(payload) {
  let newWall;
  let validWall = false;
  let MIN_HEIGHT = 150;
  let MIN_WIDTH = 50;
  let walls = [];
  // Define the canvas size for boundary checking
  const canvasWidth = 900;
  const canvasHeight = 900;
  const WALL_WIDTH = 4;
  // const MIN_DISTANCE =  WALL_WIDTH * 15; // Minimum distance between walls (3 wall widths)
  // Try to generate a valid wall until one is found
  while (!validWall) {
    // Randomly generate the coordinates and dimensions for the new wall
    newWall = {
      x: Math.floor(Math.random() * (canvasWidth - WALL_WIDTH)), // Random X position
      y: Math.floor(Math.random() * (canvasHeight - WALL_WIDTH)), // Random Y position
      width: Math.floor(WALL_WIDTH + Math.random() * 500 + MIN_WIDTH), // Random width between 20 and 70
      height: Math.floor(WALL_WIDTH + Math.random() * 500 + MIN_HEIGHT), // Random height between 20 and 70
    };
    if (newWall.width > 150 && newWall.height > 150) {
      let chance = Math.floor(Math.random() * 2);
      switch (chance) {
        case 0:
          newWall.height = Math.floor(WALL_WIDTH + Math.random() * 50);
          break;
        case 1:
          newWall.width = Math.floor(WALL_WIDTH + Math.random() * 50);
      }
    }
    if (newWall.height > 450) {
      newWall.height = newWall.height - MIN_HEIGHT;
    }
    if (newWall.width > 450) {
      newWall.width = newWall.width - MIN_WIDTH;
    }
    const { canvas, player } = payload;
    // Check if the wall respects the minimum distance rule
    validWall = !isWallTooClose(newWall, walls, canvas, player);
  }

  // Once a valid wall is found, add it to the walls array
  return newWall;
  // walls.push(newWall);
}

//the new wall,
//the player
//the walls array
export function isWallTooClose(newWall, walls, canvas, player) {
  console.log("canvas");
  const MIN_DISTANCE = 60;
  for (let i = 0; i < walls.length; i++) {
    const existingWall = walls[i];
   
    // Check if the new wall is too close to any existing wall (within the MIN_DISTANCE)

    if (
      Math.abs(newWall.x + newWall.width - canvas.height / 2) < MIN_DISTANCE ||
      Math.abs(newWall.x - newWall.width - canvas.width / 2) < MIN_DISTANCE ||
      Math.abs(newWall.y + newWall.height - canvas.height / 2) < MIN_DISTANCE ||
      Math.abs(newWall.y - newWall.height - canvas.width / 2) < MIN_DISTANCE ||
      Math.abs(existingWall.x - newWall.x) < MIN_DISTANCE ||
      Math.abs(existingWall.y - newWall.y) < MIN_DISTANCE ||
      Math.abs(player.x - newWall.x) < MIN_DISTANCE ||
      Math.abs(player.x - newWall.x) < MIN_DISTANCE ||
      Math.abs(player.y - newWall.x) < MIN_DISTANCE ||
      Math.abs(player.x - newWall.y) < MIN_DISTANCE ||
      Math.abs(player.y - newWall.y) < MIN_DISTANCE ||
      Math.abs(
        existingWall.x + existingWall.width - (newWall.x + newWall.width),
      ) < MIN_DISTANCE ||
      Math.abs(
        existingWall.y + existingWall.height - (newWall.y + newWall.height),
      ) < MIN_DISTANCE
    ) {
      return true; // The new wall is too close to an existing one
    }
  }
  return false; // No walls are too close, the new wall is valid
}

export function wallMetricDataFormat(walls) {
  // if (!walls) return;
  if (!walls.length) return;
  let wallListString = "";
  let count = 1;
  walls.forEach((wall) => {
    wallListString += `wall ${count} x1: ${wall.x}, x2: ${wall.x + wall.width} <br>
      wall ${count} y: ${wall.y}, y2: ${wall.y + wall.height} <br> `;
    count++;
  });
  return wallListString;
}
