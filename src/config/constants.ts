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

// City simulation settings
export const CITY_TICK_MS = 1000;
export const STARTING_RESOURCES = {
  gold: 120,
  food: 60,
  mana: 40,
  lumber: 80,
  housing: 5,
};


export enum TileTerrainType {
  GRASSLANDS = 0,
  FOREST = 1,
  MOUNTAIN = 2,
  WATER = 3,
  DESERT = 4,
}

export const COLORS = {
  HEXAGON_DEFAULT: 0xff0000,
  HEXAGON_HOVER: 0x00ff00,
  HEXAGON_SELECTED: 0x000000,
  HEXAGON_BORDER: 0x000000,
  DISTRICT_EMPTY: 0x3b2d4a,
  DISTRICT_TOWN_CENTER: 0x7a4b20,
  DISTRICT_FARM: 0x5c8f3a,
  DISTRICT_MANA_WELL: 0x3b6ea8,
  DISTRICT_WORKSHOP: 0x8c6a3c,
} as const;

export enum AnimationType {
  IDLE = "idle",
  WALK = "walk",
}

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

export enum ResourceType {
  GOLD = "gold",
  FOOD = "food",
  MANA = "mana",
  LUMBER = "lumber",
  HOUSING = "housing",
}

export enum BuildingType {
  TOWN_CENTER = "town_center",
  FARM = "farm",
  MANA_WELL = "mana_well",
  WOODCUTTER = "woodcutter",
  BLACKSMITH = "blacksmith",
  QUARRY = "quarry",
  NEIGHBORHOOD = "neighborhood",
}
