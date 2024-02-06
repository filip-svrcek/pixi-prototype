import * as PIXI from "pixi.js";
import { Hexagon } from "./types";

export const areObjectsEqual = (obj1: any, obj2: any) => {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through the keys and compare values
  for (let key of keys1) {
    // Check if the key exists in both objects
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    // Check if the values are equal
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If all checks pass, the objects are equal
  return true;
};

export const getHexagonsFromBoard = (board: PIXI.Container) => {
  const hexagons: Hexagon[] = [];
  board.children.forEach((el: any) => {
    if (Object.hasOwnProperty.call(el, "hexagonGridCoords")) {
      hexagons.push(el);
    }
  });
  return hexagons;
};

export const assignHexagonNeighbors = (hexagons: Hexagon[]) => {
  hexagons.forEach((hexagon) => {
    const { x, y } = hexagon.hexagonGridCoords;
    const neighbors = hexagons.filter((el) => {
      const { x: neighborX, y: neighborY } = el.hexagonGridCoords;
      return (
        (x === neighborX && y - 1 === neighborY) ||
        (x === neighborX && y + 1 === neighborY) ||
        (x + 1 === neighborX && y === neighborY) ||
        (x - 1 === neighborX && y === neighborY) ||
        (y % 2 === 0
          ? (x + 1 === neighborX && y + 1 === neighborY) ||
            (x + 1 === neighborX && y - 1 === neighborY)
          : (x - 1 === neighborX && y + 1 === neighborY) ||
            (x - 1 === neighborX && y - 1 === neighborY))
      );
    });
    hexagon.neighbors = neighbors;
  });
};

// export const resetHexagonBoard = (board: PIXI.Container) => {
//   board.children.forEach((el: any) => {
//     if (Object.hasOwnProperty.call(el, "hexagonGridCoords")) {
//       el.tint = 0xffffff;
//     }
//   });
// };

// export const colorHexagonPath = (path: Hexagon[]) => {
//   path.forEach((hexagon) => {
//     hexagon.tint = 0x555555;
//   });
// };
