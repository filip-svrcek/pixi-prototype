import { TileTerrainType } from "./config/constants";
import { Game } from "./core/Game";
import { DevTools } from "./utils/devTools";

// Define the city map
const seedMap: TileTerrainType[][] = [
  [1, 1, 0, 0, 0],
  [1, 1, 1, 0, 3, 3],
  [1, 1, 1, 0, 3],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2],
  [0, 0, 0, 0, 2, 2],
];

// Create and initialize the game
const game = new Game({
  seedMap,
  resizeTo: window,
});

await game.init();

// Add debug coordinate labels in development mode
if (process.env.NODE_ENV === "development") {
  DevTools.labelAllHexagons(game.getBoard().getHexagons());
}

