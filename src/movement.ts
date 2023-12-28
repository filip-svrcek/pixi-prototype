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

  const path = dijkstraHexGrid(sprite.hexagon!, hexagon);
  movementAnimationOnPath(sprite, path);
  sprite.hexagon = hexagon;
};

// const checkIfHexagonIsOccupied = (hexagon: Hexagon) => {
//   // change
//   return !!hexagon.occupant;
// };

export const invertCharacterSpriteOnX = (sprite: CharacterAnimatedSprite) => {
  sprite.scale.x = -1;
  sprite.anchor.x = sprite.anchor.x + 1;
  sprite.texturePivot.x = sprite.width - sprite.texturePivot.x;
};

export const alignCharacterSpriteAndHexagonPivots = (
  sprite: CharacterAnimatedSprite,
  hexagon: Hexagon,
) => {
  const correctionX = hexagon.hexagonPivot.x - sprite.texturePivot.x;
  const correctionY = hexagon.hexagonPivot.y - sprite.texturePivot.y;
  sprite.x = hexagon._bounds.minX + correctionX;
  sprite.y = hexagon._bounds.minY + correctionY;
};

const dijkstraHexGrid = (startHexagon: Hexagon, endHexagon: Hexagon) => {
  const startNode = startHexagon;
  const endNode = endHexagon;
  Object.assign(startNode, {
    tempPathCalc: { previous: null, visited: false, cost: 0 },
  });
  const queue = [startNode];

  while (queue.length > 0) {
    queue.sort((a, b) => a.tempPathCalc!.cost - b.tempPathCalc!.cost);
    const currentNode = queue.shift() as Hexagon;
    console.log("currentNode", currentNode.hexagonGridCoords, currentNode);
    console.log(
      "queue",
      queue.map((el) => el.hexagonGridCoords),
    );

    if (currentNode === endNode) {
      // Reached the destination
      console.log("reached destination");
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
        console.log(neighbor.hexagonGridCoords);
        const newCost =
          currentNode.tempPathCalc!.cost + (neighbor.tempPathCalc!.cost ?? 1);
        if (!neighbor.tempPathCalc!.visited) {
          console.log("pushing", neighbor.hexagonGridCoords);
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

const movementAnimationOnPath = (
  sprite: CharacterAnimatedSprite,
  path: Hexagon[],
) => {
  sprite.textures = loadedSpriteSheets[0].animations["walk"];
  sprite.play();

  path.forEach((hexagon, index) => {
    setTimeout(() => {
      alignCharacterSpriteAndHexagonPivots(sprite, hexagon);
    }, 1000 * index);
  });
  setTimeout(() => {
    sprite.textures = loadedSpriteSheets[0].animations["idle"];
    sprite.play();
  }, 1000 * path.length);
};
