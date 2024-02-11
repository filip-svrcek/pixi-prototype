import { Container } from "pixi.js";
import { Hexagon } from "../types";

export const assignHexagonNeighbors = (hexagons: Hexagon[]) => {
  hexagons.forEach((hexagon) => {
    const { x, y } = hexagon.hexagonGridCoords;
    const neighbors = hexagons.filter((el) => {
      const { x: neighborX, y: neighborY } = el.hexagonGridCoords;
      return (
        (x === neighborX && y - 1 === neighborY) ||
        (x === neighborX && y + 1 === neighborY) ||
        (x + 1 === neighborX && y === neighborY) ||
        (x - 1 === neighborX && y === neighborY) ||
        (y % 2 === 0
          ? (x + 1 === neighborX && y + 1 === neighborY) ||
            (x + 1 === neighborX && y - 1 === neighborY)
          : (x - 1 === neighborX && y + 1 === neighborY) ||
            (x - 1 === neighborX && y - 1 === neighborY))
      );
    });
    hexagon.neighbors = neighbors;
  });
};

export const getHexagonsFromBoard = (board: Container) => {
  const hexagons: Hexagon[] = [];
  board.children.forEach((el: any) => {
    if (Object.hasOwnProperty.call(el, "hexagonGridCoords")) {
      hexagons.push(el);
    }
  });
  return hexagons;
};
