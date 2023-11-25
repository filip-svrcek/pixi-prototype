import * as PIXI from "pixi.js";
import { boardGridX, boardGridY } from "./main";

export const drawHexagon = (
  startingPoints: { x: number; y: number },
  playerSprite: PIXI.Sprite,
  size = 50,
) => {
  const { x, y } = startingPoints;
  // Create a Graphics object
  const graphics = new PIXI.Graphics();

  // Set the fill color and line style
  graphics.beginFill(0xff0000);
  graphics.lineStyle(2, 0x000000);

  // Calculate the points of the hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push(new PIXI.Point(x, y));
  }

  // Move the graphics object to the starting point
  graphics.moveTo(points[0].x + x, points[0].y + y);

  // Draw the hexagon by connecting the points
  for (let i = 1; i < 6; i++) {
    graphics.lineTo(points[i].x + x, points[i].y + y);
  }

  // Close the shape
  graphics.lineTo(points[0].x + x, points[0].y + y);

  // End the fill and line style
  graphics.endFill();

  // Make the hexagon interactive
  graphics.interactive = true;
  graphics.on("mouseover", () => {
    if (graphics.tint !== 0x000000) {
      graphics.tint = 0x00ff00;
    }
  });
  graphics.on("mouseout", () => {
    if (graphics.tint !== 0x000000) {
      graphics.tint = 0xff0000;
    }
  });
  graphics.on("click", () => {
    const correctionY = playerSprite.height - graphics.height * 0.8;
    playerSprite.x = graphics._bounds.minX + boardGridX;
    playerSprite.y = graphics._bounds.minY + boardGridY - correctionY;
  });

  return graphics;
};

export const drawHexagonBoard = (
  map: number[][],
  playerSprite: PIXI.Sprite,
) => {
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
      const hexagon = drawHexagon({ x, y }, playerSprite, size);
      grid.addChild(hexagon);
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
