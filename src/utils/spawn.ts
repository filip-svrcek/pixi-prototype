import { CharacterAnimatedSprite, Hexagon, SeedMap } from "../types";
import { loadedSpriteSheets } from "../main";
import {
  getCoordsToAlignCharacterSpriteAndHexagonPivots,
  invertCharacterSpriteOnXToFaceLeft,
} from "../actions/movement";
import { AnimatedSprite, Container } from "pixi.js";

export const createPlayerCharacter = (seedMap: SeedMap) => {
  const player: CharacterAnimatedSprite = Object.assign(
    new AnimatedSprite(loadedSpriteSheets[0].animations["idle"]),
    {
      gridIndexPosition: seedMap
        .flat()
        .filter((el) => el > 0)
        .indexOf(2),
      texturePivot: { x: 45, y: 130 },
      hexagon: null,
      facingDirection: "right" as const,
    },
  );
  player.animationSpeed = 0.4;
  player.play();

  return player;
};

export const createNonPlayerCharacters = (seedMap: SeedMap) => {
  const usableHexagons = seedMap.flat().filter((el) => el > 0);
  let npcArray: CharacterAnimatedSprite[] = [];

  usableHexagons.forEach((el, index) => {
    if (el > 2) {
      const nonPlayer: CharacterAnimatedSprite = Object.assign(
        new AnimatedSprite(loadedSpriteSheets[0].animations["idle"]),
        {
          gridIndexPosition: index,
          texturePivot: { x: 45, y: 130 },
          hexagon: null,
          facingDirection: "right" as const,
        },
      );
      invertCharacterSpriteOnXToFaceLeft(nonPlayer);
      nonPlayer.animationSpeed = 0.4;
      nonPlayer.play();
      npcArray.push(nonPlayer);
    }
  });

  return npcArray;
};

export const spawnCharacters = (
  characters: CharacterAnimatedSprite[],
  boardGrid: Container,
) => {
  characters.forEach((char) => {
    if (char.gridIndexPosition) {
      boardGrid.addChild(char);
      const hexagon = boardGrid.children[char.gridIndexPosition] as Hexagon;
      char.hexagon = hexagon;
      const { x, y } = getCoordsToAlignCharacterSpriteAndHexagonPivots(
        char.texturePivot,
        hexagon,
      );
      char.position.set(x, y);

      // devDrawPoint(
      //   hexagon._bounds.minX+ hexagon.hexagonPivot.x,
      //   hexagon._bounds.minY + hexagon.hexagonPivot.y,
      //   hexagon.parent,
      //   "blue",
      // );
      // devDrawPoint(hexagon._bounds.minX, hexagon._bounds.minY, hexagon.parent);
      // devDrawBoundariesFromBounds(hexagon, "purple");
      // devDrawPoint(
      //   hexagon._bounds.minX,
      //   hexagon._bounds.maxY,
      //   hexagon.parent,
      //   "yellow",
      // );
      // devDrawBoundariesFromCoords(char);
    }
  });
};
