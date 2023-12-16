import * as PIXI from "pixi.js";

import { loadedTextures } from "./main";
import { CharacterSprite, SeedMap } from "./types";

export const createPlayerCharacter = (seedMap: SeedMap) => {
  const player: CharacterSprite = Object.assign(
    new PIXI.Sprite(loadedTextures[0]),
    {
      gridIndexPosition: seedMap
        .flat()
        .filter((el) => el > 0)
        .indexOf(2),
    },
  );
  player.scale.set(0.2, 0.2);

  return player;
};

export const createNonPlayerCharacters = (seedMap: SeedMap) => {
  const usableHexagons = seedMap.flat().filter((el) => el > 0);
  let npcArray: CharacterSprite[] = [];

  usableHexagons.forEach((el, index) => {
    if (el > 2) {
      const nonPlayer: CharacterSprite = Object.assign(
        new PIXI.Sprite(loadedTextures[0]),
        {
          gridIndexPosition: index,
        },
      );
      nonPlayer.scale.set(0.2, 0.2);
      npcArray.push(nonPlayer);
    }
  });

  return npcArray;
};
