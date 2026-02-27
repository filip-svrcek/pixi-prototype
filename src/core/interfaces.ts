import { AnimatedSprite, Graphics } from "pixi.js";
import { Direction, BuildingType, TileTerrainType } from "../config/constants";

/**
 * Core game interfaces and types
 */

export interface GridCoords {
  x: number;
  y: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface PathNode {
  cost: number;
  previous: IHexagon | null;
  visited: boolean;
}

export interface ResourceLedger {
  gold: number;
  food: number;
  mana: number;
  lumber: number;
  housing: number;
}

export interface BuildingDefinition {
  type: BuildingType;
  name: string;
  cost: Partial<ResourceLedger>;
  tiles?: {
    production?: Partial<Record<TileTerrainType, Partial<ResourceLedger>>>;
    allowed?: TileTerrainType[];
  };
  grant?: Partial<ResourceLedger>;
  production?: Partial<ResourceLedger>;
  upkeep?: Partial<ResourceLedger>;
  iconPath: string;
  sizeRatio?: number;
  centerOffset?: { x: number; y: number };
}

export interface BuildingInstance {
  type: BuildingType;
  level: number;
}

export interface District {
  id: string;
  coords: GridCoords;
  building: BuildingInstance | null;
}

export interface HeroBonus {
  resource: keyof ResourceLedger;
  multiplier: number;
}

export interface HeroProfile {
  id: string;
  name: string;
  bonus: HeroBonus;
}

export interface IHexagon extends Graphics {
  variant: number;
  hexagonPivot: Point2D;
  hexagonGridCoords: GridCoords;
  neighbors: IHexagon[];
  tempPathCalc?: PathNode;
  baseTint?: number;
  district?: District;
  buildingSprite?: import("pixi.js").Sprite | null;
}

export interface ICharacter extends AnimatedSprite {
  gridIndexPosition: number;
  currentHexagon: IHexagon | null;
  texturePivot: Point2D;
  facingDirection: Direction;
}

export type SeedMap = number[][];

export interface IGameConfig {
  seedMap: SeedMap;
  resizeTo: Window;
}

export interface ISpriteSheetData {
  json: any;
  image: string;
}
