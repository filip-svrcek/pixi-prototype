import * as PIXI from "pixi.js";
import { SeedMap } from "../types";
import knightSpriteSheet from "./../assets/knight/knight.json";
import knightSpriteSheetImage from "../assets/knight/knight.png";

const spriteSheetList: { readonly [key: number]: any } = {
  2: { json: knightSpriteSheet, image: knightSpriteSheetImage },
  3: { json: knightSpriteSheet, image: knightSpriteSheetImage },
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
      const baseTexture = PIXI.BaseTexture.from(
        spriteSheetList[textureIndex].image,
      );
      const sheet = new PIXI.Spritesheet(
        baseTexture,
        spriteSheetList[textureIndex].json,
      );
      await sheet.parse();
      loadSpriteSheets.push(sheet);
    }
  }
  return loadSpriteSheets;
};
