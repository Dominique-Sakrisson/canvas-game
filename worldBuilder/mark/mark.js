function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 // Mark constructor
 export function createMark(canvas, marks) {
  const mark = {
    x: Math.random() * (canvas.width - 150), // Adjusted for mark's radius
    y: Math.random() * (canvas.height - 150), // Adjusted for mark's radius
    opacity: 1, // Start with opacity 0 (washed out)
    createdAt: Date.now(), // Timestamp for when the mark was created
    lifespan: 6500, // Mark will last for 2.5 seconds
    radius: getRandomInt(25, 300),
    damageStyle: "mark",
    damage: 1,
    // baseColor: getRandomColor(), // Store base color
    isActive: false, // Mark is not interactable until fully faded in
  };
  mark.damage = mark.radius * 0.01;
  return mark;
}

// Update all marks, fade in, apply AOE effects
export function updateMarks(ctx, marks) {
  const currentTime = Date.now();

  marks = marks.filter((mark) => {
    const age = currentTime - mark.createdAt;

    // Gradually fade in the gradient over the entire lifespan
    const gradientOpacity = Math.min(age / mark.lifespan, 1); // Fade in from 0 to 1 over the lifespan

    // Create a radial gradient with increasing opacity
    const gradient = ctx.createRadialGradient(
      mark.x,
      mark.y,
      0, // Start at the center of the mark
      mark.x,
      mark.y,
      mark.radius, // End at the outer edge of the mark
    );

    // Apply the gradient opacity
    gradient.addColorStop(0, `rgba(255, 0, 0, ${gradientOpacity})`); // Red at the center
    gradient.addColorStop(
      0.5,
      `rgba(255, 165, 0, ${gradientOpacity * 0.7})`,
    ); // Orange in the middle
    gradient.addColorStop(1, `rgba(0, 0, 255, ${gradientOpacity * 0.4})`); // Blue at the outer edge

    mark.color = gradient;

    // Once the gradient reaches 80%, start the flashing effect for the borders
    if (gradientOpacity >= 0.65 && !mark.hasFlashed) {
      mark.isActive = true;
      mark.hasFlashed = true;
      mark.flashCount = 10; // Set the number of flashes to 5
      mark.borderColor = "white";
      mark.flashInterval = setInterval(() => {
        if (mark.flashCount > 0) {
          // Toggle the border color to simulate the flash effect
          mark.borderColor =
            mark.borderColor === "white" ? "transparent" : "white";
          mark.flashCount--;
        } else {
          clearInterval(mark.flashInterval); // Stop flashing after 5 flashes
          mark.borderColor = "transparent"; // Reset the border color after flashing
        }
      }, 200); // Flash every 200ms
    }

    // Mark is now interactable after it has fully faded in
    if (gradientOpacity === 1) {
      mark.isActive = true;
    }

    // Remove the mark after it exceeds its lifespan
    if (age >= mark.lifespan) {
      marks = marks.filter((m) => m !== mark); // Remove the mark after collision
      return false;
    }

    return true;
  });
  return marks
}
//drawing of the marks with the canvas context
export function drawMarks(ctx, marks) {
  for (let mark of marks) {
    ctx.save(); // Save the current context state

    let markRadius = getRandomInt(25, 100);
    ctx.beginPath();
    ctx.arc(mark.x, mark.y, mark.radius, 0, Math.PI * 2); // Draw a circle with radius 10
    ctx.fillStyle = mark.color;
    ctx.fill();

    // Apply border if flashing
    if (mark.borderColor) {
      ctx.lineWidth = 20;
      ctx.strokeStyle = mark.borderColor;
      ctx.stroke();
    }
    ctx.restore();
  }
}
