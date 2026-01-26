import { AnimatedSprite, Spritesheet } from "pixi.js";
import { ICharacter, IHexagon, Point2D } from "../core/interfaces";
import {
  CHARACTER_TEXTURE_PIVOT,
  CHARACTER_ANIMATION_SPEED,
  Direction,
  AnimationType,
  MOVEMENT_TIME_MS,
  MOVEMENT_FRAMES,
  MOVEMENT_FRAME_TIME,
} from "../config/constants";
import { PathfindingService } from "../services/PathfindingService";

/**
 * Character represents a game character (player or NPC)
 */
export class Character {
  private sprite: ICharacter;
  private spritesheet: Spritesheet;

  constructor(
    spritesheet: Spritesheet,
    gridIndexPosition: number,
    facingDirection: Direction = Direction.RIGHT
  ) {
    this.spritesheet = spritesheet;
    
    this.sprite = Object.assign(
      new AnimatedSprite(spritesheet.animations[AnimationType.IDLE]),
      {
        gridIndexPosition,
        texturePivot: { ...CHARACTER_TEXTURE_PIVOT },
        currentHexagon: null as IHexagon | null,
        facingDirection,
      }
    ) as ICharacter;

    this.sprite.animationSpeed = CHARACTER_ANIMATION_SPEED;
    this.sprite.play();

    if (facingDirection === Direction.LEFT) {
      this.faceLeft();
    }
  }

  /**
   * Get the sprite for rendering
   */
  getSprite(): ICharacter {
    return this.sprite;
  }

  /**
   * Get current hexagon
   */
  getCurrentHexagon(): IHexagon | null {
    return this.sprite.currentHexagon;
  }

  /**
   * Set current hexagon
   */
  setCurrentHexagon(hexagon: IHexagon): void {
    this.sprite.currentHexagon = hexagon;
  }

  /**
   * Position the character on a hexagon
   */
  positionOnHexagon(hexagon: IHexagon): void {
    const position = this.calculatePositionOnHexagon(hexagon);
    this.sprite.position.set(position.x, position.y);
    this.sprite.currentHexagon = hexagon;
  }

  /**
   * Calculate position to align character pivot with hexagon pivot
   */
  private calculatePositionOnHexagon(hexagon: IHexagon): Point2D {
    const correctionX = hexagon.hexagonPivot.x - this.sprite.texturePivot.x;
    const correctionY = hexagon.hexagonPivot.y - this.sprite.texturePivot.y;
    
    return {
      x: hexagon._bounds.minX + correctionX,
      y: hexagon._bounds.minY + correctionY,
    };
  }

  /**
   * Make character face left
   */
  faceLeft(): void {
    if (this.sprite.facingDirection === Direction.RIGHT) {
      this.sprite.scale.x = -1;
      this.sprite.anchor.x = this.sprite.anchor.x + 1;
      this.sprite.texturePivot.x = this.sprite.width - this.sprite.texturePivot.x;
      this.sprite.facingDirection = Direction.LEFT;
      
      if (this.sprite.currentHexagon) {
        this.positionOnHexagon(this.sprite.currentHexagon);
      }
    }
  }

  /**
   * Make character face right
   */
  faceRight(): void {
    if (this.sprite.facingDirection === Direction.LEFT) {
      this.sprite.scale.x = 1;
      this.sprite.anchor.x = 0;
      this.sprite.texturePivot.x = this.sprite.width - this.sprite.texturePivot.x;
      this.sprite.facingDirection = Direction.RIGHT;
      
      if (this.sprite.currentHexagon) {
        this.positionOnHexagon(this.sprite.currentHexagon);
      }
    }
  }

  /**
   * Face the correct direction based on movement
   */
  private faceDirection(from: IHexagon, to: IHexagon): void {
    if (to.hexagonGridCoords.x > from.hexagonGridCoords.x) {
      this.faceRight();
    } else if (to.hexagonGridCoords.x < from.hexagonGridCoords.x) {
      this.faceLeft();
    }
  }

  /**
   * Move character to target hexagon with animation
   */
  async moveTo(targetHexagon: IHexagon, onComplete?: () => void): Promise<void> {
    if (!this.sprite.currentHexagon) {
      return;
    }

    const path = PathfindingService.findPath(this.sprite.currentHexagon, targetHexagon);
    
    if (path.length <= 1) {
      return;
    }

    await this.animateAlongPath(path);
    
    if (onComplete) {
      onComplete();
    }
  }

  /**
   * Animate character movement along a path
   */
  private async animateAlongPath(path: IHexagon[]): Promise<void> {
    // Start walk animation
    this.sprite.textures = this.spritesheet.animations[AnimationType.WALK];
    this.sprite.play();

    for (let i = 0; i < path.length - 1; i++) {
      const currentHex = path[i];
      const nextHex = path[i + 1];

      this.faceDirection(currentHex, nextHex);

      await this.animateToHexagon(nextHex);
    }

    // Return to idle animation facing right
    this.faceRight();
    this.sprite.textures = this.spritesheet.animations[AnimationType.IDLE];
    this.sprite.play();
  }

  /**
   * Animate movement to a single hexagon
   */
  private animateToHexagon(hexagon: IHexagon): Promise<void> {
    return new Promise((resolve) => {
      const startPos = this.sprite.position;
      const endPos = this.calculatePositionOnHexagon(hexagon);
      
      const xStep = (endPos.x - startPos.x) / MOVEMENT_FRAMES;
      const yStep = (endPos.y - startPos.y) / MOVEMENT_FRAMES;

      const interval = setInterval(() => {
        this.sprite.position.set(
          this.sprite.position.x + xStep,
          this.sprite.position.y + yStep
        );
      }, MOVEMENT_FRAME_TIME);

      setTimeout(() => {
        clearInterval(interval);
        this.sprite.position.set(endPos.x, endPos.y);
        this.sprite.currentHexagon = hexagon;
        resolve();
      }, MOVEMENT_TIME_MS);
    });
  }
}
