import * as PIXI from "pixi.js";

export function createCollisionMap(app: PIXI.Application) {
  const collisionContainer = new PIXI.Container();
  app.stage.addChild(collisionContainer);

  const rectangle = new PIXI.Graphics();
  rectangle.beginFill(0xff0000);
  rectangle.drawRect(200, app.screen.height / 2, app.screen.width, 50);
  rectangle.endFill();

  const circle = new PIXI.Graphics();
  circle.beginFill(0x00ff00);
  circle.drawCircle(600, app.screen.height / 2 + 20, 30);
  circle.endFill();

  collisionContainer.addChild(rectangle, circle);

  return collisionContainer;
}
