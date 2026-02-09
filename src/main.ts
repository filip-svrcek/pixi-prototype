import { TileType } from "./config/constants";
import { Game } from "./core/Game";
import { DevTools } from "./utils/devTools";

// Define the city map
// 0 = blocked/empty, 1 = buildable district
const seedMap: TileType[][] = [
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

// Create and initialize the game
const game = new Game({
  seedMap,
  backgroundColor: 0x1099bb,
  resizeTo: window,
});

await game.init();

// Add debug coordinate labels in development mode
if (process.env.NODE_ENV === "development") {
  DevTools.labelAllHexagons(game.getBoard().getHexagons());
}

