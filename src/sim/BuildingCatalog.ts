import { BuildingType, TileTerrainType } from "../config/constants";
import { BuildingDefinition } from "../core/interfaces";

export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  [BuildingType.TOWN_CENTER]: {
    type: BuildingType.TOWN_CENTER,
    name: "Town Center",
    gameSettings: {
      cost: { gold: 0, lumber: 0 },
      production: { gold: 2 },
      limit: 1,
    },
    graphics: {
      iconPath: "/assets/buildings/town-hall.png",
      sizeRatio: 0.4,
      centerOffset: { x: 0, y: -10 },
    },
  },
  [BuildingType.FARM]: {
    type: BuildingType.FARM,
    name: "Farm",
    gameSettings: { cost: { gold: 20, lumber: 10 }, production: { food: 6 } },
    graphics: {
      iconPath: "/assets/buildings/farm.png",
      sizeRatio: 0.4,
      centerOffset: { x: 0, y: -10 },
    },
  },
  [BuildingType.WOODCUTTER]: {
    type: BuildingType.WOODCUTTER,
    name: "Woodcutter",
    gameSettings: {
      cost: { gold: 30 },
      production: { lumber: 4 },
      tiles: {
        allowed: [TileTerrainType.FOREST],
      },
    },
    graphics: {
      iconPath: "/assets/buildings/woodcutter.png",
      sizeRatio: 0.35,
      centerOffset: { x: 0, y: -10 },
    },
  },
  [BuildingType.BLACKSMITH]: {
    type: BuildingType.BLACKSMITH,
    name: "Blacksmith",
    gameSettings: { cost: { gold: 40, lumber: 20, stone: 20 }, production: { iron: 5 } },
    graphics: {
      iconPath: "/assets/buildings/blacksmith.png",
      sizeRatio: 0.3,
      centerOffset: { x: 0, y: -10 },
    },
  },
  [BuildingType.NEIGHBORHOOD]: {
    type: BuildingType.NEIGHBORHOOD,
    name: "Neighborhood",
    gameSettings: { cost: { gold: 20, lumber: 10 }, grant: { housing: 4 } },
    graphics: {
      iconPath: "/assets/buildings/neighborhood.png",
      sizeRatio: 0.35,
      centerOffset: { x: 0, y: -10 },
    },
  },
  [BuildingType.QUARRY]: {
    type: BuildingType.QUARRY,
    name: "Quarry",
    gameSettings: {
      cost: { gold: 30, lumber: 10 },
      production: { ironOre: 3, stone: 3 },
      tiles: { allowed: [TileTerrainType.MOUNTAIN] },
    },
    graphics: {
      iconPath: "/assets/buildings/quarry.png",
      sizeRatio: 0.4,
      centerOffset: { x: 0, y: -10 },
    },
  },
};

export const BUILDING_ORDER: BuildingType[] = [
  BuildingType.TOWN_CENTER,
  BuildingType.FARM,
  BuildingType.WOODCUTTER,
  BuildingType.BLACKSMITH,
  BuildingType.NEIGHBORHOOD,
  BuildingType.QUARRY,
];

export const getBuildingDefinition = (
  type: BuildingType,
): BuildingDefinition => {
  return BUILDINGS[type];
};
