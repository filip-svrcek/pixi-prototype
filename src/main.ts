import "./style.css";
import * as PIXI from "pixi.js";

import cartmanFront from "./assets/front.png";
import { handleMovement } from "./movement";

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
const texture = await PIXI.Assets.load(cartmanFront);

// This creates a texture from a 'cartman.png' image
const cartman = new PIXI.Sprite(texture);

// Setup the position of the cartman
cartman.x = app.renderer.width / 2;
cartman.y = app.renderer.height / 2;

// Rotate around the center
cartman.anchor.x = 0.5;
cartman.anchor.y = 0.5;

// Add the cartman to the scene we are building
app.stage.addChild(cartman);

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

// // Listen for frame updates
app.ticker.add(() => {
  handleMovement(cartman, pressedKeys);
});
