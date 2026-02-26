import { Application, Sprite, Texture } from "pixi.js";
import {
  IGameConfig,
  SeedMap,
  IHexagon,
  BuildingDefinition,
} from "../core/interfaces";
import { HexBoard } from "../core/HexBoard";
import { BuildingType, COLORS } from "../config/constants";
import { CityState } from "../sim/CityState";
import { Simulation } from "../sim/Simulation";
import { Hud } from "../ui/Hud";

/**
 * Game is the main game controller that manages the game state and entities
 */
export class Game {
  private app: Application;
  private board: HexBoard;
  private seedMap: SeedMap;
  private city: CityState | null = null;
  private simulation: Simulation | null = null;
  private hud: Hud | null = null;
  private selectedBuilding: BuildingType = BuildingType.FARM;

  constructor(config: IGameConfig) {
    this.seedMap = config.seedMap;
    
    this.app = new Application({
      background: COLORS.BACKGROUND_DEFAULT,
      resizeTo: config.resizeTo,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
    });

    this.board = new HexBoard(this.seedMap);
  }

  /**
   * Initialize the game
   */
  async init(): Promise<void> {
    // Add canvas to DOM
    document.body.appendChild(this.app.view as unknown as Node);

    // Setup board
    this.app.stage.addChild(this.board.getContainer());

    // Initialize city state and simulation
    this.city = new CityState(this.board.getHexagons());
    this.simulation = new Simulation(this.city);

    // Initialize HUD
    this.hud = new Hud();
    this.app.stage.addChild(this.hud.getContainer());

    // Setup building selection callback
    this.hud.setOnBuildingSelected((building: BuildingType) => {
      this.selectedBuilding = building;
    });

    // Setup interactions
    this.setupInteractions();

    // Start simulation loop
    this.app.ticker.add((delta) => {
      if (!this.city || !this.simulation || !this.hud) {
        return;
      }

      const deltaMs = (delta * 1000) / 60;
      this.simulation.update(deltaMs);
      this.hud.update(this.city, this.selectedBuilding);
    });
  }

  /**
   * Create player and enemy characters from seed map
   */
  /**
   * Setup click/tap interactions on hexagons
   */
  private setupInteractions(): void {
    if (!this.city) {
      return;
    }

    const hexagons = this.board.getHexagons();

    hexagons.forEach((hexagon) => {
      const handleClick = () => {
        if (!this.city) {
          return;
        }

        const placed = this.city.placeBuilding(hexagon, this.selectedBuilding);
        if (placed) {
          this.placeBuildingIcon(hexagon, placed);
        }
      };

      hexagon.on("click", handleClick);
      hexagon.on("tap", handleClick);
    });
  }

  private placeBuildingIcon(
    hexagon: IHexagon,
    building: BuildingDefinition,
  ): void {
    if (hexagon.buildingSprite) {
      return;
    }

    const texture = Texture.from(building.iconPath);
    const sprite = new Sprite(texture);
    const centerX =
      hexagon._bounds.minX +
      (hexagon._bounds.maxX - hexagon._bounds.minX) / 2 +
      (building.centerOffset?.x ?? 0);
    const centerY =
      hexagon._bounds.minY +
      (hexagon._bounds.maxY - hexagon._bounds.minY) / 2 +
      (building.centerOffset?.y ?? 0);

    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(centerX, centerY);
    sprite.width = building.sizeRatio ? sprite.width * building.sizeRatio : sprite.width;
    sprite.height = building.sizeRatio ? sprite.height * building.sizeRatio : sprite.height;

    this.board.getContainer().addChild(sprite as any);
    hexagon.buildingSprite = sprite;
  }

  /**
   * Get the PIXI application instance
   */
  getApp(): Application {
    return this.app;
  }

  /**
   * Get the game board
   */
  getBoard(): HexBoard {
    return this.board;
  }

  getCity(): CityState | null {
    return this.city;
  }
}
