# City Simulator

A hexagonal grid-based city management simulator with a fantasy RPG twist.

## Project Structure

```
src/
├── config/
│   └── constants.ts         # Game constants and configuration
├── core/
│   ├── interfaces.ts        # TypeScript interfaces and types
│   ├── Game.ts              # Main game controller
│   ├── HexBoard.ts          # Hexagonal board management
├── sim/
│   ├── BuildingCatalog.ts   # Building definitions
│   ├── CityState.ts         # City resources and districts
│   └── Simulation.ts        # Resource tick logic
├── ui/
│   └── Hud.ts               # HUD display
├── utils/
│   ├── devTools.ts          # Development debugging tools
│   └── general.ts           # General utility functions
├── assets/                  # Game assets (sprites, etc.)
└── main.ts                 # Application entry point
```

## Architecture Overview

### Core Classes

- **Game**: Main game controller that manages initialization and interactions
- **HexBoard**: Manages the hexagonal grid, rendering, and neighbor relationships
- **CityState**: Stores resources, districts, and hero bonuses
- **Simulation**: Applies production ticks over time
- **Hud**: Displays resources and selected building

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

The seed map defines the city layout:

```typescript
const seedMap = [
  [1, 1, 1, 1, 1],     // Row 0
  [1, 0, 1, 0, 1, 1],  // Row 1 (offset)
  [1, 1, 0, 1, 1],     // Row 2
  // ...
];
```

**Tile Types:**
- `0` - Blocked/Empty (not rendered)
- `1` - Buildable district

## Configuration

Edit `src/config/constants.ts` to customize:
- Hexagon size and spacing
- Resource tick speed
- Starting resources
- District colors and building types

## Development Tools

When running in development mode, hexagon coordinates are displayed for debugging. Additional dev tools are available in `src/utils/devTools.ts`.
