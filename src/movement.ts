import { loadedSpriteSheets } from "./main";
import { CharacterAnimatedSprite, Hexagon } from "./types";
import { getHexagonsFromBoard } from "./utils";

export const moveSpriteToHexagon = (
  sprite: CharacterAnimatedSprite,
  hexagon: Hexagon,
) => {
  // if (checkIfHexagonIsOccupied(hexagon)) {
  //   console.log("Hexagon is occupied");
  //   return;
  // }
  // resetHexagonBoard(hexagon.parent);
  const path = getPathToHexagon(sprite.hexagon!, hexagon);
  movementAnimationOnPath(sprite, path);
  // console.log(
  //   "path",
  //   path.map((el) => el.hexagonGridCoords),
  // );
  // // movementAnimationOnPath(sprite, path);
  // const newPosition = getCoordsToAlignCharacterSpriteAndHexagonPivots(
  //   sprite.texturePivot,
  //   hexagon,
  // );
  sprite.hexagon = hexagon;
  // sprite.position = newPosition;
  // colorHexagonPath(path);
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };

export const invertCharacterSpriteOnXToFaceLeft = (
  sprite: CharacterAnimatedSprite,
  hexagonStoodAt?: Hexagon | null,
) => {
  if (sprite.facingDirection === "right") {
    sprite.scale.x = -1;
    sprite.anchor.x = sprite.anchor.x + 1;
    sprite.texturePivot.x = sprite.width - sprite.texturePivot.x;
    sprite.facingDirection = "left";
    if (hexagonStoodAt) {
      const { x, y } = getCoordsToAlignCharacterSpriteAndHexagonPivots(
        sprite.texturePivot,
        hexagonStoodAt,
      );
      sprite.position.set(x, y);
    }
  }
};

export const invertCharacterSpriteOnXToFaceRight = (
  sprite: CharacterAnimatedSprite,
  hexagonStoodAt?: Hexagon | null,
) => {
  if (sprite.facingDirection === "left") {
    sprite.scale.x = 1;
    sprite.anchor.x = 0;
    sprite.texturePivot.x = sprite.width - sprite.texturePivot.x;
    sprite.facingDirection = "right";
    if (hexagonStoodAt) {
      const { x, y } = getCoordsToAlignCharacterSpriteAndHexagonPivots(
        sprite.texturePivot,
        hexagonStoodAt,
      );
      sprite.position.set(x, y);
    }
  }
};

export const getCoordsToAlignCharacterSpriteAndHexagonPivots = (
  spriteTexturePivot: { x: number; y: number },
  hexagon: Hexagon,
) => {
  const correctionX = hexagon.hexagonPivot.x - spriteTexturePivot.x;
  const correctionY = hexagon.hexagonPivot.y - spriteTexturePivot.y;
  return {
    x: hexagon._bounds.minX + correctionX,
    y: hexagon._bounds.minY + correctionY,
  };
};

const getPathToHexagon = (startHexagon: Hexagon, endHexagon: Hexagon) => {
  const startNode = startHexagon;
  const endNode = endHexagon;
  Object.assign(startNode, {
    tempPathCalc: { previous: null, visited: false, cost: 0 },
  });
  const queue = [startNode];

  while (queue.length > 0) {
    queue.sort((a, b) => a.tempPathCalc!.cost - b.tempPathCalc!.cost);
    const currentNode = queue.shift() as Hexagon;
    // console.log("currentNode", currentNode.hexagonGridCoords, currentNode);
    // console.log(
    //   "queue",
    //   queue.map((el) => el.hexagonGridCoords),
    // );

    if (currentNode === endNode) {
      // Reached the destination
      // console.log("reached destination");
      break;
    }

    if (currentNode && !currentNode?.tempPathCalc?.visited) {
      currentNode.tempPathCalc!.visited = true;

      for (const neighbor of currentNode.neighbors) {
        if (!neighbor.tempPathCalc) {
          Object.assign(neighbor, {
            tempPathCalc: { previous: currentNode, visited: false, cost: null },
          });
        }
        // console.log(neighbor.hexagonGridCoords);
        const newCost =
          currentNode.tempPathCalc!.cost + (neighbor.tempPathCalc!.cost ?? 1);
        if (!neighbor.tempPathCalc!.visited) {
          // console.log("pushing", neighbor.hexagonGridCoords);
          neighbor.tempPathCalc!.cost = newCost;
          queue.push(neighbor);
        }
      }
    }
  }

  // Now, you can trace back the path from endNode to startNode using the "previous" property in each node.
  let path = [];
  let current = endNode;
  while (current) {
    path.unshift(current);
    current = current.tempPathCalc!.previous!;
  }
  getHexagonsFromBoard(startNode.parent).forEach((el) => {
    delete el.tempPathCalc;
  });

  return path;
};

const faceCorrectDirectionOnPath = (
  sprite: CharacterAnimatedSprite,
  hexagonCurrent: Hexagon,
  hexagonNext: Hexagon,
) => {
  if (hexagonNext.hexagonGridCoords.x > hexagonCurrent.hexagonGridCoords.x) {
    invertCharacterSpriteOnXToFaceRight(sprite);
  }
  if (hexagonNext.hexagonGridCoords.x < hexagonCurrent.hexagonGridCoords.x) {
    invertCharacterSpriteOnXToFaceLeft(sprite);
  }
};

const movementAnimationOnPath = async (
  sprite: CharacterAnimatedSprite,
  path: Hexagon[],
) => {
  const timeToNextHexagon = 500; //ms
  const framesPerTravelToNextHexagon = 25;
  const frameTimeToLive = timeToNextHexagon / framesPerTravelToNextHexagon;

  sprite.textures = loadedSpriteSheets[0].animations["walk"];
  sprite.play();

  for (let i = 0; i < path.length - 1; i++) {
    faceCorrectDirectionOnPath(sprite, path[i], path[i + 1]);

    const initSpriteTexturePivot = sprite.texturePivot;
    const { x: endX, y: endY } =
      getCoordsToAlignCharacterSpriteAndHexagonPivots(
        initSpriteTexturePivot,
        path[i + 1],
      );
    const { x: startX, y: startY } = sprite.position;
    const xStep = (endX - startX) / framesPerTravelToNextHexagon;
    const yStep = (endY - startY) / framesPerTravelToNextHexagon;

    const interval = setInterval(() => {
      sprite.position.set(sprite.position.x + xStep, sprite.position.y + yStep);
    }, frameTimeToLive);

    await timeout(timeToNextHexagon).then(() => {
      clearInterval(interval);
      sprite.position.set(endX, endY);
      if (i === path.length - 2) {
        invertCharacterSpriteOnXToFaceRight(sprite, path[i + 1]);
        sprite.textures = loadedSpriteSheets[0].animations["idle"];
        sprite.play();
      }
    });
  }
};

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
