import * as PIXI from "pixi.js";

export type Hexagon = PIXI.Graphics & {
  occupants: PIXI.Sprite[];
};
