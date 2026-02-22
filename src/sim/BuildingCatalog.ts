import { BuildingType } from "../config/constants";
import { BuildingDefinition } from "../core/interfaces";

export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  [BuildingType.TOWN_CENTER]: {
    type: BuildingType.TOWN_CENTER,
    name: "Town Center",
    cost: { gold: 0, lumber: 0 },
    production: { housing: 2, gold: 2 },
    iconPath: "/assets/buildings/town-hall.png",
  },
  [BuildingType.FARM]: {
    type: BuildingType.FARM,
    name: "Farm",
    cost: { gold: 20, lumber: 10 },
    production: { food: 6 },
    iconPath: "/assets/buildings/farm.png",
  },
  [BuildingType.MANA_WELL]: {
    type: BuildingType.MANA_WELL,
    name: "Mana Well",
    cost: { gold: 25, mana: 5 },
    production: { mana: 5 },
    iconPath: "/assets/buildings/mana-well.png",
    size: { width: 80, height: 80 },
  },
  [BuildingType.WOODCUTTER]: {
    type: BuildingType.WOODCUTTER,
    name: "Woodcutter",
    cost: { gold: 30, food: 5 },
    production: { lumber: 4, gold: 1 },
    iconPath: "/assets/buildings/woodcutter.png",
  },
  [BuildingType.BLACKSMITH]: {
    type: BuildingType.BLACKSMITH,
    name: "Blacksmith",
    cost: { gold: 40, lumber: 20 },
    iconPath: "/assets/buildings/blacksmith.png",
  },
};

export const BUILDING_ORDER: BuildingType[] = [
  BuildingType.TOWN_CENTER,
  BuildingType.FARM,
  BuildingType.MANA_WELL,
  BuildingType.WOODCUTTER,
  BuildingType.BLACKSMITH,
];

export const getBuildingDefinition = (
  type: BuildingType,
): BuildingDefinition => {
  return BUILDINGS[type];
};
