import "./style.css";
import * as PIXI from "pixi.js";

import cartmanFront from "./assets/front.png";
import { handleMovement } from "./movement";
import { createCollisionMap } from "./collisionMap";
import { drawHexagonBoard } from "./graphics";

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

// load the texture we need
const texturePlayer = await PIXI.Assets.load(cartmanFront);

const boardGrid = drawHexagonBoard([
  [1, 1, 1],
  [1, 0, 1, 0],
  [1, 1, 0],
  [1, 1, 1, 0],
]);

// This creates a texture
const player = new PIXI.Sprite(texturePlayer);

const collisionMap = createCollisionMap(app);

// Setup the position of the player
player.x = app.renderer.width / 2;
player.y = app.renderer.height / 2;
player.scale.set(0.5, 0.5);


boardGrid.x = app.renderer.width / 2;
boardGrid.y = app.renderer.height / 2;

// Populate the stage
app.stage.addChild(collisionMap);
app.stage.addChild(player);
app.stage.addChild(boardGrid);

// Handle keyboard events
document.addEventListener("keydown", (e) => handlePressedKeys(e));
document.addEventListener("keyup", (e) => handlePressedKeys(e));
let pressedKeys: string[] = [];
function handlePressedKeys(e: KeyboardEvent) {
  if (e.type === "keydown") {
    !pressedKeys.includes(e.key) && pressedKeys.push(e.key);
  } else {
    pressedKeys = pressedKeys.filter((key) => key !== e.key);
  }
}

// Listen for frame updates
app.ticker.add(() => {
  handleMovement(player, pressedKeys);
});
