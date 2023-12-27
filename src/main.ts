import "./style.css";
import * as PIXI from "pixi.js";

import { drawHexagonBoard } from "./graphics";
import { loadSpriteSheets } from "./loader";
import {
  createNonPlayerCharacters,
  createPlayerCharacter,
  spawnCharacters,
} from "./spawn";
import { moveSpriteToHexagon } from "./movement";

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
const boardGrid = drawHexagonBoard(seedMap);

// Populate the stage
app.stage.addChild(boardGrid);
spawnCharacters([playerCharacter, ...nonPlayerCharacters], boardGrid);

// Add interaction
boardGrid.children.forEach((hexagon) => {
  hexagon.on("click", () => {
    moveSpriteToHexagon(playerCharacter, hexagon);
  });
  hexagon.on("tap", () => {
    moveSpriteToHexagon(playerCharacter, hexagon);
  });
});
