import * as PIXI from "pixi.js";

import { CharacterAnimatedSprite, SeedMap } from "./types";
import { loadedSpriteSheets } from "./main";
import { invertSpriteOnX } from "./actions";
import { drawBoundaries } from "./devTools";

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
      invertSpriteOnX(nonPlayer);
      nonPlayer.animationSpeed = 0.4;
      nonPlayer.play();
      npcArray.push(nonPlayer);
    }
  });

  return npcArray;
};

export const spawnCharacters = (
  characters: CharacterAnimatedSprite[],
  boardGrid: PIXI.Container,
) => {
  characters.forEach((char) => {
    if (char.gridIndexPosition) {
      boardGrid.addChild(char);
      const hexagon = boardGrid.children[char.gridIndexPosition] as PIXI.Sprite;
      const correctionY = char.height - hexagon.height * 0.8;
      char.x = hexagon._bounds.minX;
      char.y = hexagon._bounds.minY - correctionY;
      process.env.NODE_ENV === "development" && drawBoundaries(char);
    }
  });
};
