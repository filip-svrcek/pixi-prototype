import { AnimatedSprite, Graphics } from "pixi.js";
import { Direction } from "../config/constants";

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

export interface IHexagon extends Graphics {
  variant: number;
  hexagonPivot: Point2D;
  hexagonGridCoords: GridCoords;
  neighbors: IHexagon[];
  tempPathCalc?: PathNode;
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
  backgroundColor: number;
  resizeTo: Window;
}

export interface ISpriteSheetData {
  json: any;
  image: string;
}
