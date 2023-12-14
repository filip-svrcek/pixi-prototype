import * as PIXI from "pixi.js";
import { SeedMap } from "./types";
import knight from "./assets/knight/Idle (1).png";

const textureList: { readonly [key: number]: string } = {
  2: knight,
  3: knight,
} as const;

export const loadCharacterTextures = async (seedMap: SeedMap) => {
  const textureIndexes = new Set(seedMap.flat());
  const loadedTextures = [];
  for (const textureIndex of textureIndexes) {
    if (textureIndex in textureList) {
      loadedTextures.push(PIXI.Assets.load(textureList[textureIndex]));
    }
  }
  return Promise.all(loadedTextures);
};
