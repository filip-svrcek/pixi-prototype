import './style.css'

import { Application, Assets, Sprite } from 'pixi.js';
import cartmanFront from './assets/front.png'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view as unknown as Node);

// load the texture we need
const texture = await Assets.load(cartmanFront);

// This creates a texture from a 'cartman.png' image
const cartman = new Sprite(texture);

// Setup the position of the cartman
cartman.x = app.renderer.width / 2;
cartman.y = app.renderer.height / 2;

// Rotate around the center
cartman.anchor.x = 0.5;
cartman.anchor.y = 0.5;

// Add the cartman to the scene we are building
app.stage.addChild(cartman);

function movement(e:KeyboardEvent){
  switch (e.key) {
    case 'ArrowRight':
      cartman.x +=20;
      break;
    case 'ArrowLeft':
      cartman.x -=20;
      break;
    case 'ArrowUp':
      cartman.y -=20;
      break;
    case 'ArrowDown':
      cartman.y +=20;
      break;
  
    default:
      break;
  }
}

document.addEventListener('keydown', (e)=>movement(e))

// // Listen for frame updates
// app.ticker.add(() => {
//     // each frame we spin the cartman around a bit
//     cartman.rotation += 0.01;
// });
