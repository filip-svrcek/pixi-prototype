import * as PIXI from "pixi.js";

import { CharacterAnimatedSprite, SeedMap } from "./types";
import { loadedSpriteSheets } from "./main";
import { invertSpriteOnX } from "./actions";

export const createPlayerCharacter = (seedMap: SeedMap) => {
  const player: CharacterAnimatedSprite = Object.assign(
    new PIXI.AnimatedSprite(loadedSpriteSheets[0].animations["idle"]),
    {
      gridIndexPosition: seedMap
        .flat()
        .filter((el) => el > 0)
        .indexOf(2),
    },
  );
  player.animationSpeed = 0.4;
  player.play();

  return player;
};

export const createNonPlayerCharacters = (seedMap: SeedMap) => {
  const usableHexagons = seedMap.flat().filter((el) => el > 0);
  let npcArray: CharacterAnimatedSprite[] = [];

  usableHexagons.forEach((el, index) => {
    if (el > 2) {
      const nonPlayer: CharacterAnimatedSprite = Object.assign(
        new PIXI.AnimatedSprite(loadedSpriteSheets[0].animations["idle"]),
        {
          gridIndexPosition: index,
        },
      );
      invertSpriteOnX(nonPlayer)
      nonPlayer.animationSpeed = 0.4;
      nonPlayer.play();
      npcArray.push(nonPlayer);
    }
  });

  return npcArray;
};
