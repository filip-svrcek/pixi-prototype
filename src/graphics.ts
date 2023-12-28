import * as PIXI from "pixi.js";
import { Hexagon } from "./types";
import { assignHexagonNeighbors } from "./utils";

export const drawHexagon = (
  drawingStartingPoints: { x: number; y: number },
  size = 50,
  hexagonVariant = 1,
  hexagonGridCoords: { x: number; y: number },
) => {
  const { x, y } = drawingStartingPoints;

  // Create a Graphics object
  const hexagon = Object.assign(new PIXI.Graphics(), {
    variant: hexagonVariant,
    hexagonPivot: { x: 45, y: 75 },
    hexagonGridCoords,
  });

  if (hexagonVariant === 0) {
    return;
  }

  // Set the fill color and line style
  hexagon.beginFill(0xff0000);
  hexagon.lineStyle(2, 0x000000);
  hexagon.alpha = 0.5;

  // Calculate the points of the hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push(new PIXI.Point(x, y));
  }

  // Move the hexagon object to the starting point
  hexagon.moveTo(points[0].x + x, points[0].y + y);

  // Draw the hexagon by connecting the points
  for (let i = 1; i < 6; i++) {
    hexagon.lineTo(points[i].x + x, points[i].y + y);
  }

  // Close the shape
  hexagon.lineTo(points[0].x + x, points[0].y + y);

  // End the fill and line style
  hexagon.endFill();

  // Make the hexagon interactive
  hexagon.interactive = true;

  hexagon.on("mouseover", () => {
    if (hexagon.tint !== 0x000000) {
      hexagon.tint = 0x00ff00;
    }
  });
  hexagon.on("mouseout", () => {
    if (hexagon.tint !== 0x000000) {
      hexagon.tint = 0xff0000;
    }
  });

  return hexagon;
};

export const drawHexagonBoard = (map: number[][]) => {
  const gridContainer = new PIXI.Container();
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
      const hexagon = drawHexagon({ x, y }, size, map[row][col], {
        x: col,
        y: row,
      });
      hexagon && gridContainer.addChild(hexagon);
      x += 1.8 * size;
    }
    if (row % 2 === 0) {
      x = 0;
    } else {
      x = 0.9 * size;
    }

    y += 1.6 * size;
  }
  gridContainer.x = 0.5 * window.innerWidth - gridContainer.width / 2;
  gridContainer.y = 0.5 * window.innerHeight - gridContainer.height / 2;
  assignHexagonNeighbors(gridContainer.children as Hexagon[]);
  return gridContainer as PIXI.Container<Hexagon>;
};
