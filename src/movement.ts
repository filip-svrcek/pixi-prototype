import { loadedSpriteSheets } from "./main";
import { CharacterAnimatedSprite, Hexagon } from "./types";

export const moveSpriteToHexagon = (
  sprite: CharacterAnimatedSprite,
  hexagon: Hexagon,
) => {
  // if (checkIfHexagonIsOccupied(hexagon)) {
  //   console.log("Hexagon is occupied");
  //   return;
  // }
  sprite.textures = loadedSpriteSheets[0].animations["walk"];
  sprite.play();
  setTimeout(() => {
    sprite.textures = loadedSpriteSheets[0].animations["idle"];
    sprite.play();
  }, 1000);

  alignCharacterSpriteAndHexagonPivots(sprite, hexagon);
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };

export const invertCharacterSpriteOnX = (sprite: CharacterAnimatedSprite) => {
  sprite.scale.x = -1;
  sprite.anchor.x = sprite.anchor.x + 1;
  sprite.texturePivot.x = sprite.width - sprite.texturePivot.x;
};

export const alignCharacterSpriteAndHexagonPivots = (
  sprite: CharacterAnimatedSprite,
  hexagon: Hexagon,
) => {
  const correctionX = hexagon.hexagonPivot.x - sprite.texturePivot.x;
  const correctionY = hexagon.hexagonPivot.y - sprite.texturePivot.y;
  sprite.x = hexagon._bounds.minX + correctionX;
  sprite.y = hexagon._bounds.minY + correctionY;
};
