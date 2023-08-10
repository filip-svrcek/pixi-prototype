import { Sprite } from "pixi.js";

export function handleMovement(sprite: Sprite, pressedKeys: string[]) {
  console.log("pressedKeys", pressedKeys);
  if (pressedKeys.includes("ArrowUp")) {
    sprite.y -= 20;
  }
  if (pressedKeys.includes("ArrowDown")) {
    sprite.y += 20;
  }
  if (pressedKeys.includes("ArrowLeft")) {
    sprite.x -= 20;
  }
  if (pressedKeys.includes("ArrowRight")) {
    sprite.x += 20;
  }
}
