import "./style.css";
import * as PIXI from "pixi.js";

import { drawHexagonBoard } from "./graphics";
import { loadCharacterTextures } from "./loader";
import { createPlayerCharacter } from "./spawn";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view as unknown as Node);

const seedMap = [
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1],
  [2, 1, 0, 1, 3],
  [1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

export const loadedTextures = await loadCharacterTextures(seedMap);
const playerCharacter = createPlayerCharacter(seedMap);

const boardGrid = drawHexagonBoard(seedMap, playerCharacter);

// Populate the stage
app.stage.addChild(boardGrid);
boardGrid.addChild(playerCharacter);
