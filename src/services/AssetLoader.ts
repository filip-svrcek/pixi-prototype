// import { BaseTexture, Spritesheet } from "pixi.js";
// import { ISpriteSheetData, SeedMap } from "../core/interfaces";
// import { TileTerrainType } from "../config/constants";
// import knightSpriteSheet from "../assets/knight/knight.json";
// import knightSpriteSheetImage from "../assets/knight/knight.png";

// /**
//  * AssetLoader handles loading of game assets
//  */
// export class AssetLoader {
//   private static spriteSheetMap: Record<number, ISpriteSheetData> = {
//     [TileTerrainType.PLAYER_SPAWN]: {
//       json: knightSpriteSheet,
//       image: knightSpriteSheetImage,
//     },
//     [TileTerrainType.ENEMY_SPAWN]: {
//       json: knightSpriteSheet,
//       image: knightSpriteSheetImage,
//     },
//   };

//   /**
//    * Load all spritesheets needed for the seed map
//    */
//   static async loadSpritesheets(seedMap: SeedMap): Promise<Spritesheet[]> {
//     const tileTypes = new Set(seedMap.flat());
//     const loadPromises: Promise<Spritesheet>[] = [];

//     for (const tileType of tileTypes) {
//       if (tileType in this.spriteSheetMap) {
//         loadPromises.push(this.loadSpritesheet(tileType));
//       }
//     }

//     return Promise.all(loadPromises);
//   }

//   /**
//    * Load a single spritesheet
//    */
//   private static async loadSpritesheet(tileType: number): Promise<Spritesheet> {
//     const data = this.spriteSheetMap[tileType];
//     const baseTexture = BaseTexture.from(data.image);
//     const sheet = new Spritesheet(baseTexture, data.json);
//     await sheet.parse();
//     return sheet;
//   }
// }
