import { Container, DisplayObject, Sprite } from "pixi.js";
import { MOVEMENT_INCREMENT } from "./constants";

export function checkCollision(character: Sprite, collisionObject: Sprite) {
  return (
    character.x < collisionObject.x + collisionObject.width &&
    character.x + character.width > collisionObject.x &&
    character.y < collisionObject.y + collisionObject.height &&
    character.y + character.height > collisionObject.y
  );
}

function checkGrounded(
  character: Sprite,
  collisionObject: Container<DisplayObject>,
) {
  return character.y + character.height > collisionObject.y;
}

export function makeCharacterFall(
  character: Sprite,
  collisionMap: Container<DisplayObject>,
) {
  if (!checkGrounded(character, collisionMap)) {
    character.y += 2 * MOVEMENT_INCREMENT;
  }
}

export function handleMovement(
  character: Sprite,
  pressedKeys: string[],
  collisionMap: Container<DisplayObject>,
) {
  if (pressedKeys.includes("ArrowLeft")) {
    character.x -= MOVEMENT_INCREMENT;
  }
  if (pressedKeys.includes("ArrowRight")) {
    character.x += MOVEMENT_INCREMENT;
  }
}
