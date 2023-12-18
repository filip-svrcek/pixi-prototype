import * as PIXI from "pixi.js";
import { SeedMap, SpriteSheet } from "./types";

const spriteSheetList: { readonly [key: number]: string } = {
  2: "src/assets/knight/knight.json",
  3: "src/assets/knight/knight.json",
} as const;
// const textureList: { readonly [key: number]: string } = {
//   4: "src/assets/knight/knight.json",
// } as const;

// export const loadCharacterTextures = async (seedMap: SeedMap) => {
//   const textureIndexes = new Set(seedMap.flat());
//   const loadedTextures = [];
//   for (const textureIndex of textureIndexes) {
//     if (textureIndex in textureList) {
//       loadedTextures.push(PIXI.Assets.load(textureList[textureIndex]));
//     }
//   }
//   return Promise.all(loadedTextures);
// };

export const loadSpriteSheets = async (seedMap: SeedMap) => {
  const textureIndexes = new Set(seedMap.flat());
  const loadSpriteSheets = [];
  for (const textureIndex of textureIndexes) {
    if (textureIndex in spriteSheetList) {
      loadSpriteSheets.push(PIXI.Assets.load(spriteSheetList[textureIndex]));
    }
  }
  return Promise.all<SpriteSheet>(loadSpriteSheets);
};
