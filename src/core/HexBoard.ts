import { Container, Graphics, Point } from "pixi.js";
import { IHexagon, GridCoords } from "../core/interfaces";
import {
  HEXAGON_SIZE,
  HEXAGON_PIVOT,
  HEXAGON_SPACING_X,
  HEXAGON_SPACING_Y,
  HEXAGON_OFFSET_X,
  COLORS,
  TileTerrainType,
  TILE_TERRAIN_COLORS,
} from "../config/constants";

/**
 * HexBoard manages the hexagonal grid game board
 */
export class HexBoard {
  private container: Container<IHexagon>;
  private hexagons: IHexagon[] = [];

  constructor(private seedMap: number[][]) {
    this.container = new Container<IHexagon>();
    this.buildBoard();
    this.assignNeighbors();
    this.centerBoard();
  }

  /**
   * Build the hexagonal board from the seed map
   */
  private buildBoard(): void {
    const size = HEXAGON_SIZE;
    let x = HEXAGON_OFFSET_X * size;
    let y = 0;

    for (let row = 0; row < this.seedMap.length; row++) {
      for (let col = 0; col < this.seedMap[row].length; col++) {
        const tileType = this.seedMap[row][col];
        
        if (tileType !== TileType.BLOCKED) {
          const hexagon = this.createHexagon({ x, y }, size, tileType, { x: col, y: row });
          this.container.addChild(hexagon);
          this.hexagons.push(hexagon);
        }

        x += HEXAGON_SPACING_X * size;
      }

      // Offset every other row
      x = row % 2 === 0 ? 0 : HEXAGON_OFFSET_X * size;
      y += HEXAGON_SPACING_Y * size;
    }
  }

  /**
   * Create a single hexagon
   */
  private createHexagon(
    position: { x: number; y: number },
    size: number,
    variant: number,
    gridCoords: GridCoords,
  ): IHexagon {
    const hexagon = Object.assign(new Graphics(), {
      variant,
      hexagonPivot: { ...HEXAGON_PIVOT },
      hexagonGridCoords: gridCoords,
      neighbors: [] as IHexagon[],
      baseTint: TILE_TERRAIN_COLORS[variant as TileTerrainType],
    }) as IHexagon;

    // Set fill and line style
    hexagon.beginFill(COLORS.HEXAGON_DEFAULT);
    hexagon.lineStyle(3, COLORS.HEXAGON_BORDER, 0, 0, true);
    hexagon.alpha = 1;
    hexagon.tint = hexagon.baseTint ?? COLORS.DISTRICT_EMPTY;

    // Calculate hexagon points
    const points: Point[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 2;
      const x = size * Math.cos(angle);
      const y = size * Math.sin(angle);
      points.push(new Point(x, y));
    }

    // Draw hexagon
    hexagon.moveTo(points[0].x + position.x, points[0].y + position.y);
    for (let i = 1; i < 6; i++) {
      hexagon.lineTo(points[i].x + position.x, points[i].y + position.y);
    }
    hexagon.lineTo(points[0].x + position.x, points[0].y + position.y);
    hexagon.endFill();

    // Make interactive
    hexagon.interactive = true;
    this.setupHexagonInteraction(hexagon);

    return hexagon;
  }

  /**
   * Setup hover effects for hexagons
   */
  private setupHexagonInteraction(hexagon: IHexagon): void {
    hexagon.on("mouseover", () => {
      if (hexagon.tint !== COLORS.HEXAGON_SELECTED) {
        hexagon.tint = COLORS.HEXAGON_HOVER;
      }
    });

    hexagon.on("mouseout", () => {
      if (hexagon.tint !== COLORS.HEXAGON_SELECTED) {
        hexagon.tint = hexagon.baseTint ?? COLORS.DISTRICT_EMPTY;
      }
    });
  }

  /**
   * Assign neighboring hexagons to each hexagon
   */
  private assignNeighbors(): void {
    this.hexagons.forEach((hexagon) => {
      const { x, y } = hexagon.hexagonGridCoords;

      hexagon.neighbors = this.hexagons.filter((other) => {
        const { x: nx, y: ny } = other.hexagonGridCoords;

        // Check all 6 possible neighbor positions
        return (
          (x === nx && y - 1 === ny) || // Top
          (x === nx && y + 1 === ny) || // Bottom
          (x + 1 === nx && y === ny) || // Right
          (x - 1 === nx && y === ny) || // Left
          // Diagonal neighbors depend on row parity
          (y % 2 === 0
            ? (x + 1 === nx && y + 1 === ny) || (x + 1 === nx && y - 1 === ny)
            : (x - 1 === nx && y + 1 === ny) || (x - 1 === nx && y - 1 === ny))
        );
      });
    });
  }

  /**
   * Center the board on the screen
   */
  private centerBoard(): void {
    this.container.x = 0.5 * window.innerWidth - this.container.width / 2;
    this.container.y = 0.5 * window.innerHeight - this.container.height / 2;
  }

  /**
   * Get the container to add to the stage
   */
  getContainer(): Container<IHexagon> {
    return this.container;
  }

  /**
   * Get all hexagons
   */
  getHexagons(): IHexagon[] {
    return this.hexagons;
  }

  /**
   * Get hexagon at grid coordinates
   */
  getHexagonAt(coords: GridCoords): IHexagon | undefined {
    return this.hexagons.find(
      (h) =>
        h.hexagonGridCoords.x === coords.x &&
        h.hexagonGridCoords.y === coords.y,
    );
  }

  /**
   * Enable/disable board interactivity
   */
  setInteractive(interactive: boolean): void {
    this.container.interactiveChildren = interactive;
  }

  /**
   * Set the base tint for a hexagon (used for district visuals)
   */
  setHexagonBaseTint(hexagon: IHexagon, tint: number): void {
    hexagon.baseTint = tint;
    if (hexagon.tint !== COLORS.HEXAGON_HOVER) {
      hexagon.tint = tint;
    }
  }
}
