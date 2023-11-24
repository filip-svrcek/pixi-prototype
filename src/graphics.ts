import * as PIXI from "pixi.js";

export const drawHexagon = () => {
  // Create a Graphics object
  const graphics = new PIXI.Graphics();

  // Set the fill color and line style
  graphics.beginFill(0xff0000);
  graphics.lineStyle(2, 0x000000);

  // Define the size of the hexagon
  const size = 50;

  // Calculate the points of the hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push(new PIXI.Point(x, y));
  }

  // Move the graphics object to the starting point
  graphics.moveTo(points[0].x, points[0].y);

  // Draw the hexagon by connecting the points
  for (let i = 1; i < 6; i++) {
    graphics.lineTo(points[i].x, points[i].y);
  }

  // Close the shape
  graphics.lineTo(points[0].x, points[0].y);

  // End the fill and line style
  graphics.endFill();

  return graphics;
};

export const drawHexagonBoard = (map: number[][]) => {
  const grid = new PIXI.Container();
  const size = 50;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push(new PIXI.Point(x, y));
  }
  let x = 0.9 * size;
  let y = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const graphics = new PIXI.Graphics();
      grid.addChild(graphics);
      graphics.beginFill(0xff0000);
      graphics.lineStyle(2, 0x000000);
      graphics.moveTo(points[0].x + x, points[0].y + y);
      for (let i = 1; i < 6; i++) {
        graphics.lineTo(points[i].x + x, points[i].y + y);
      }
      graphics.lineTo(points[0].x + x, points[0].y + y);
      graphics.endFill();
      graphics.interactive = true;
      graphics.on("mouseover", () => {
        graphics.tint = 0x00ff00;
      });
      graphics.on("mouseout", () => {
        graphics.tint = 0xff0000;
      });
      x += 1.8 * size;
    }
    if (row % 2 === 0) {
      x = 0;
    } else {
      x = 0.9 * size;
    }

    y += 1.6 * size;
  }
  return grid;
};
