import "./style.css";
import * as PIXI from "pixi.js";

import { drawHexagonBoard } from "./graphics";
import { moveSpriteToHexagon } from "./actions";
import { Hexagon } from "./types";
import { loadSpriteSheets } from "./loader";
import { createNonPlayerCharacters, createPlayerCharacter } from "./spawn";
import { drawBoundaries } from "./devTools";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render.
const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

// The application will create a canvas element to insert into the DOM
document.body.appendChild(app.view as unknown as Node);

const seedMap = [
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1],
  [2, 1, 0, 1, 3],
  [1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 3],
];

export const loadedSpriteSheets = await loadSpriteSheets(seedMap);
const playerCharacter = createPlayerCharacter(seedMap);
const nonPlayerCharacters = createNonPlayerCharacters(seedMap);

const boardGrid = drawHexagonBoard(seedMap, playerCharacter);

// Populate the stage
app.stage.addChild(boardGrid);
boardGrid.addChild(playerCharacter);

if (playerCharacter.gridIndexPosition) {
  moveSpriteToHexagon(
    playerCharacter,
    boardGrid.children[playerCharacter.gridIndexPosition] as Hexagon,
  );
  process.env.NODE_ENV === "development" && drawBoundaries(playerCharacter);
}

nonPlayerCharacters.forEach((npc) => {
  boardGrid.addChild(npc);
  if (npc.gridIndexPosition) {
    moveSpriteToHexagon(
      npc,
      boardGrid.children[npc.gridIndexPosition] as Hexagon,
    );
    process.env.NODE_ENV === "development" && drawBoundaries(npc);
  }
});
