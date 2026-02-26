import { BuildingType } from "../config/constants";
import { BuildingDefinition } from "../core/interfaces";

export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  [BuildingType.TOWN_CENTER]: {
    type: BuildingType.TOWN_CENTER,
    name: "Town Center",
    cost: { gold: 0, lumber: 0 },
    production: { gold: 2 },
    iconPath: "/assets/buildings/town-hall.png",
    sizeRatio: 0.13,
    centerOffset: { x: 0, y: -10 },
  },
  [BuildingType.FARM]: {
    type: BuildingType.FARM,
    name: "Farm",
    cost: { gold: 20, lumber: 10 },
    production: { food: 6 },
    iconPath: "/assets/buildings/farm.png",
    sizeRatio: 0.8,
    centerOffset: { x: 0, y: -10 },
  },
  [BuildingType.MANA_WELL]: {
    type: BuildingType.MANA_WELL,
    name: "Mana Well",
    cost: { gold: 25, mana: 5 },
    production: { mana: 5 },
    iconPath: "/assets/buildings/mana-well.png",
    sizeRatio: 0.8,
  },
  [BuildingType.WOODCUTTER]: {
    type: BuildingType.WOODCUTTER,
    name: "Woodcutter",
    cost: { gold: 30, food: 5 },
    production: { lumber: 4, gold: 1 },
    iconPath: "/assets/buildings/woodcutter.png",
    sizeRatio: 0.8,
    centerOffset: { x: 0, y: -10 },
  },
  [BuildingType.BLACKSMITH]: {
    type: BuildingType.BLACKSMITH,
    name: "Blacksmith",
    cost: { gold: 40, lumber: 20 },
    iconPath: "/assets/buildings/blacksmith.png",
    sizeRatio: 0.8,
    centerOffset: { x: 0, y: -10 },
  },
  [BuildingType.NEIGHBORHOOD]: {
    type: BuildingType.NEIGHBORHOOD,
    name: "Neighborhood",
    cost: { gold: 20, lumber: 10 },
    grant: { housing: 4 },
    iconPath: "/assets/buildings/neighborhood.png",
    sizeRatio: 0.18,
    centerOffset: { x: 0, y: -10 },
  },
  [BuildingType.QUARRY]: {
    type: BuildingType.QUARRY,
    name: "Quarry",
    cost: { gold: 30, food: 5 },
    production: { gold: 3 },
    iconPath: "/assets/buildings/quarry.png",
    sizeRatio: 0.15,
    centerOffset: { x: 0, y: -10 },
  },
};

export const BUILDING_ORDER: BuildingType[] = [
  BuildingType.TOWN_CENTER,
  BuildingType.FARM,
  BuildingType.MANA_WELL,
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
