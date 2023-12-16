import * as PIXI from "pixi.js";
import { Hexagon } from "./types";

export const moveSpriteToHexagon = (
  playerSprite: PIXI.Sprite,
  hexagon: Hexagon,
) => {
  // if (checkIfHexagonIsOccupied(hexagon)) {
  //   console.log("Hexagon is occupied");
  //   return;
  // }

  const correctionY = playerSprite.height - hexagon.height * 0.8;
  playerSprite.x = hexagon._bounds.minX;
  playerSprite.y = hexagon._bounds.minY - correctionY;
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };
