import { TileType } from "./config/constants";
import { Game } from "./core/Game";
import { DevTools } from "./utils/devTools";

// Define the game map
// 0 = blocked, 1 = walkable, 2 = player spawn, 3 = enemy spawn
const seedMap: TileType[][] = [
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1],
  [2, 1, 0, 1, 3],
  [1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 3],
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

