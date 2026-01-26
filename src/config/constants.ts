// Hexagon settings
export const HEXAGON_SIZE = 50;
export const HEXAGON_PIVOT = { x: 45, y: 75 };
export const HEXAGON_SPACING_X = 1.8;
export const HEXAGON_SPACING_Y = 1.6;
export const HEXAGON_OFFSET_X = 0.9;

// Character settings
export const CHARACTER_TEXTURE_PIVOT = { x: 45, y: 130 };
export const CHARACTER_ANIMATION_SPEED = 0.4;

// Movement settings
export const MOVEMENT_TIME_MS = 500;
export const MOVEMENT_FRAMES = 25;
export const MOVEMENT_FRAME_TIME = MOVEMENT_TIME_MS / MOVEMENT_FRAMES;

export enum TileType {
  BLOCKED = 0,
  WALKABLE = 1,
  PLAYER_SPAWN = 2,
  ENEMY_SPAWN = 3,
}

export const COLORS = {
  HEXAGON_DEFAULT: 0xff0000,
  HEXAGON_HOVER: 0x00ff00,
  HEXAGON_SELECTED: 0x000000,
  HEXAGON_BORDER: 0x000000,
} as const;

export enum AnimationType {
  IDLE = "idle",
  WALK = "walk",
}

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}
