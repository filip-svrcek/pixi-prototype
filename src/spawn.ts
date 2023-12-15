import * as PIXI from "pixi.js";

import { loadedTextures } from "./main";
import { CharacterSprite, SeedMap } from "./types";

const findCharacterCoordinatesFromSeedMap = (
  seedMap: SeedMap,
  characterIndex: number,
) => {
  for (let i = 0; i < seedMap.length; i++) {
    for (let j = 0; j < seedMap[i].length; j++) {
      if (seedMap[i][j] === characterIndex) {
        return { x: j, y: i };
      }
    }
  }
  return null;
};

export const spawnPlayerCharacter = (seedMap: SeedMap) => {
  const playerCharacterCoordinates = findCharacterCoordinatesFromSeedMap(
    seedMap,
    2,
  );
  const player: CharacterSprite = Object.assign(
    new PIXI.Sprite(loadedTextures[0]),
    {
      gridIndexPosition: playerCharacterCoordinates,
    },
  );
  player.scale.set(0.2, 0.2);

  return player;
};

// export const spawnByIndex = (index: number) => {
//   switch (index) {
//     case 2:
//       return spawnPlayerCharacter();
//     default:
//       return null;
//   }
// };
