import * as PIXI from "pixi.js";

import { loadedTextures } from "./main";

export const spawnPlayerCharacter = () => {
  const player = new PIXI.Sprite(loadedTextures[0]);
  player.scale.set(0.2, 0.2);

  return player;
};

export const spawnByIndex = (index: number) => {
  switch (index) {
    case 2:
      return spawnPlayerCharacter();
    default:
      return null;
  }
};
