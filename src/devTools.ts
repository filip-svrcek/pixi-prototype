import * as PIXI from "pixi.js";

export const drawBoundaries = (object: any) => {
  const { x, y, width, height, parent } = object;

  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xffffff, 1);
  graphics.drawRect(x, y, width, height);
  parent.addChild(graphics);
};
