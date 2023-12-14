import * as PIXI from "pixi.js";

export type Hexagon = PIXI.Graphics & {
  occupant: PIXI.Sprite | null;
};

export type SeedMap = number[][];
