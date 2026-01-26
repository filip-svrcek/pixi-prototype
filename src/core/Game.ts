import { Application, Spritesheet } from "pixi.js";
import { IGameConfig, SeedMap } from "../core/interfaces";
import { HexBoard } from "../core/HexBoard";
import { Character } from "../core/Character";
import { AssetLoader } from "../services/AssetLoader";
import { TileType, Direction } from "../config/constants";

/**
 * Game is the main game controller that manages the game state and entities
 */
export class Game {
  private app: Application;
  private board: HexBoard;
  private player: Character | null = null;
  private enemies: Character[] = [];
  private spritesheets: Spritesheet[] = [];
  private seedMap: SeedMap;

  constructor(config: IGameConfig) {
    this.seedMap = config.seedMap;
    
    this.app = new Application({
      background: config.backgroundColor,
      resizeTo: config.resizeTo,
    });

    this.board = new HexBoard(this.seedMap);
  }

  /**
   * Initialize the game
   */
  async init(): Promise<void> {
    // Add canvas to DOM
    document.body.appendChild(this.app.view as unknown as Node);

    // Load assets
    this.spritesheets = await AssetLoader.loadSpritesheets(this.seedMap);

    // Create characters
    this.createCharacters();

    // Setup board
    this.app.stage.addChild(this.board.getContainer());

    // Spawn characters on board
    this.spawnCharacters();

    // Setup interactions
    this.setupInteractions();
  }

  /**
   * Create player and enemy characters from seed map
   */
  private createCharacters(): void {
    const flatMap = this.seedMap.flat().filter((tile) => tile !== TileType.BLOCKED);
    
    flatMap.forEach((tile, index) => {
      if (tile === TileType.PLAYER_SPAWN) {
        this.player = new Character(this.spritesheets[0], index, Direction.RIGHT);
      } else if (tile === TileType.ENEMY_SPAWN) {
        const enemy = new Character(this.spritesheets[0], index, Direction.LEFT);
        this.enemies.push(enemy);
      }
    });
  }

  /**
   * Spawn characters on the board
   */
  private spawnCharacters(): void {
    const hexagons = this.board.getHexagons();
    const allCharacters = [this.player, ...this.enemies].filter(Boolean) as Character[];

    allCharacters.forEach((character) => {
      const sprite = character.getSprite();
      const hexagon = hexagons[sprite.gridIndexPosition];
      
      if (hexagon) {
        this.board.getContainer().addChild(sprite as any);
        character.positionOnHexagon(hexagon);
      }
    });
  }

  /**
   * Setup click/tap interactions on hexagons
   */
  private setupInteractions(): void {
    if (!this.player) {
      return;
    }

    const hexagons = this.board.getHexagons();
    
    hexagons.forEach((hexagon) => {
      const handleClick = () => {
        if (this.player) {
          this.board.setInteractive(false);
          
          this.player.moveTo(hexagon, () => {
            this.board.setInteractive(true);
          });
        }
      };

      hexagon.on("click", handleClick);
      hexagon.on("tap", handleClick);
    });
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

  /**
   * Get the player character
   */
  getPlayer(): Character | null {
    return this.player;
  }

  /**
   * Get all enemy characters
   */
  getEnemies(): Character[] {
    return this.enemies;
  }
}
