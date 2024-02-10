import * as PIXI from "pixi.js";

export type Hexagon = PIXI.Graphics & {
  variant: number;
  hexagonPivot: { x: number; y: number };
  hexagonGridCoords: { x: number; y: number };
  neighbors: Hexagon[];
  tempPathCalc?: { cost: number; previous: Hexagon | null; visited: boolean };
};

export type SeedMap = number[][];

export type CharacterAnimatedSprite = PIXI.AnimatedSprite & {
  // health: number;
  // attack: number;
  // defense: number;
  // speed: number;
  // range: number;
  // move: number;
  // level: number;
  // experience: number;
  // name: string;
  // type: string;
  // id: string;
  // owner: string;
  gridIndexPosition: number;
  hexagon: Hexagon | null;
  texturePivot: { x: number; y: number };
  facingDirection: "left" | "right";
  // index: number;
  // selected: boolean;
  // tint: number;
  // alpha: number;
  // _bounds: PIXI.Rectangle;
};

// export type SpriteSheet = {
//   frames: {
//     [key: string]: {
//       frame: {
//         x: number;
//         y: number;
//         w: number;
//         h: number;
//       };
//       rotated: boolean;
//       trimmed: boolean;
//       spriteSourceSize: {
//         x: number;
//         y: number;
//         w: number;
//         h: number;
//       };
//       sourceSize: {
//         w: number;
//         h: number;
//       };
//     };
//   };
//   animations: {
//     [key: string]: PIXI.Texture[];
//   };
// };
