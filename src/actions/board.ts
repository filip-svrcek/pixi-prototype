import { Container } from "pixi.js";

// export const resetHexagonBoard = (board: PIXI.Container) => {
//   board.children.forEach((el: any) => {
//     if (Object.hasOwnProperty.call(el, "hexagonGridCoords")) {
//       el.tint = 0xffffff;
//     }
//   });
// };

// export const colorHexagonPath = (path: Hexagon[]) => {
//   path.forEach((hexagon) => {
//     hexagon.tint = 0x555555;
//   });
// };

export const disableBoardInteractivity = (board: Container) => {
  board.interactiveChildren = false;
};

export const enableBoardInteractivity = (board: Container) => {
  board.interactiveChildren = true;
};
