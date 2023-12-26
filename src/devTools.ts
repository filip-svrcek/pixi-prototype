import * as PIXI from "pixi.js";

export const devDrawBoundariesFromCoords = (object: any, color = "white") => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { x, y, width, height, parent } = object;

  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, color, 1);
  graphics.drawRect(x, y, width, height);
  parent.addChild(graphics);
};

export const devDrawBoundariesFromBounds = (object: any, color = "white") => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { _bounds } = object;
  const { minX: x, minY: y } = _bounds;
  const width = _bounds.maxX - _bounds.minX;
  const height = _bounds.maxY - _bounds.minY;
  const { parent } = object;

  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, color, 1);
  graphics.drawRect(x, y, width, height);
  parent.addChild(graphics);
};

export const devDrawPoint = (
  x: number,
  y: number,
  parent: PIXI.Container,
  color = "white",
) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const graphics = new PIXI.Graphics();
  graphics.beginFill(color);
  graphics.drawCircle(x, y, 5);
  graphics.endFill();
  parent.addChild(graphics);
};
