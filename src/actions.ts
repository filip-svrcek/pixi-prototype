import { CharacterAnimatedSprite, Hexagon } from "./types";
import * as PIXI from "pixi.js";

export const moveSpriteToHexagon = (
  sprite: CharacterAnimatedSprite,
  hexagon: Hexagon,
) => {
  // if (checkIfHexagonIsOccupied(hexagon)) {
  //   console.log("Hexagon is occupied");
  //   return;
  // }

  const correctionY = sprite.height - hexagon.height * 0.8;
  sprite.x = hexagon._bounds.minX;
  sprite.y = hexagon._bounds.minY - correctionY;
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };

export const invertSpriteOnX = (sprite: PIXI.Sprite)=>{
  sprite.scale.x = -1;
  sprite.anchor.x = sprite.anchor.x + 1;
}