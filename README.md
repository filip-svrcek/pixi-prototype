# Board Game

A hexagonal grid-based game built with PixiJS. Proof of concept.

## Project Structure

```
src/
├── config/
│   └── constants.ts         # Game constants and configuration
├── core/
│   ├── interfaces.ts        # TypeScript interfaces and types
│   ├── Game.ts              # Main game controller
│   ├── HexBoard.ts          # Hexagonal board management
│   └── Character.ts         # Character entity class
├── services/
│   ├── AssetLoader.ts       # Asset loading service
│   └── PathfindingService.ts # Dijkstra pathfinding algorithm
├── utils/
│   ├── devTools.ts          # Development debugging tools
│   └── general.ts           # General utility functions
├── assets/                  # Game assets (sprites, etc.)
└── main.ts                 # Application entry point
```

## Architecture Overview

### Core Classes

- **Game**: Main game controller that manages initialization, characters, and interactions
- **HexBoard**: Manages the hexagonal grid, rendering, and neighbor relationships
- **Character**: Represents player and NPC entities with movement and animations
- **PathfindingService**: Implements Dijkstra's algorithm for optimal pathfinding
- **AssetLoader**: Handles asynchronous loading of spritesheets and assets

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Seed Map Format

The seed map defines the game board layout:

```typescript
const seedMap = [
  [1, 1, 1, 1, 1],     // Row 0
  [1, 0, 1, 0, 1, 1],  // Row 1 (offset)
  [2, 1, 0, 1, 3],     // Row 2
  // ...
];
```

**Tile Types:**
- `0` - Blocked/Empty (not rendered)
- `1` - Walkable terrain
- `2` - Player spawn point
- `3` - Enemy spawn point

## Configuration

Edit `src/config/constants.ts` to customize:
- Hexagon size and spacing
- Movement speed and animation frames
- Character settings
- Colors and visual effects

## Development Tools

When running in development mode, hexagon coordinates are displayed for debugging. Additional dev tools are available in `src/utils/devTools.ts`.
