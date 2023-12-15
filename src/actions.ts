import * as PIXI from "pixi.js";
import { Hexagon } from "./types";

export const moveSpriteToHexagon = (
  playerSprite: PIXI.Sprite,
  hexagon: PIXI.Graphics,
) => {
  // if (checkIfHexagonIsOccupied(hexagon)) {
  //   console.log("Hexagon is occupied");
  //   return;
  // }

  const correctionY = playerSprite.height - hexagon.height * 0.8;
  playerSprite.x = hexagon._bounds.minX;
  playerSprite.y = hexagon._bounds.minY - correctionY;
};

export const moveSpriteToHexagonByIndex = (
  playerSprite: PIXI.Sprite,
  hexagons: Hexagon[],
  index: number,
) => {
  moveSpriteToHexagon(playerSprite, hexagons[index]);
};

export const moveSpriteToHexagonByCoordinates = (
  playerSprite: PIXI.Sprite,
  hexagons: Hexagon[],
  x: number,
  y: number,
) => {
  const index = hexagons.findIndex(
    (hexagon) => hexagon.x === x && hexagon.y === y,
  );
  moveSpriteToHexagonByIndex(playerSprite, hexagons, index);
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };
