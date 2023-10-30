import { Sprite } from "pixi.js";
import { MOVEMENT_INCREMENT } from "./constants";

export function handleMovement(sprite: Sprite, pressedKeys: string[]) {
  if (pressedKeys.includes("ArrowUp")) {
    sprite.y -= MOVEMENT_INCREMENT;
  }
  if (pressedKeys.includes("ArrowDown")) {
    sprite.y += MOVEMENT_INCREMENT;
  }
  if (pressedKeys.includes("ArrowLeft")) {
    sprite.x -= MOVEMENT_INCREMENT;
  }
  if (pressedKeys.includes("ArrowRight")) {
    sprite.x += MOVEMENT_INCREMENT;
  }
}
