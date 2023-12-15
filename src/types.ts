import * as PIXI from "pixi.js";

export type Hexagon = PIXI.Graphics & {
  variant: number;
};

export type SeedMap = number[][];

export type CharacterSprite = PIXI.Sprite & {
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
  gridIndexPosition: { x: number; y: number } | null;
  // index: number;
  // selected: boolean;
  // tint: number;
  // alpha: number;
  // _bounds: PIXI.Rectangle;
};
