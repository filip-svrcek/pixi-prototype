import { Container, Graphics, Text } from "pixi.js";
import { IHexagon } from "../core/interfaces";

/**
 * Development tools for debugging and visualization
 */
export class DevTools {
  /**
   * Draw boundaries of an object based on its coordinates
   */
  static drawBoundariesFromCoords(
    object: { x: number; y: number; width: number; height: number; parent: Container },
    color = "white"
  ): void {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const { x, y, width, height, parent } = object;
    const graphics = new Graphics();
    graphics.lineStyle(2, color, 1);
    graphics.drawRect(x, y, width, height);
    parent.addChild(graphics);
  }

  /**
   * Draw boundaries of an object based on its bounds
   */
  static drawBoundariesFromBounds(
    object: { _bounds: { minX: number; minY: number; maxX: number; maxY: number }; parent: Container },
    color = "white"
  ): void {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const { _bounds, parent } = object;
    const { minX: x, minY: y } = _bounds;
    const width = _bounds.maxX - _bounds.minX;
    const height = _bounds.maxY - _bounds.minY;

    const graphics = new Graphics();
    graphics.lineStyle(2, color, 1);
    graphics.drawRect(x, y, width, height);
    parent.addChild(graphics);
  }

  /**
   * Draw a point for debugging positions
   */
  static drawPoint(x: number, y: number, parent: Container, color = "white"): void {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const graphics = new Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(x, y, 5);
    graphics.endFill();
    parent.addChild(graphics);
  }

  /**
   * Draw hexagon grid coordinates as text
   */
  static drawHexagonCoords(hexagon: IHexagon): void {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const { x, y } = hexagon.hexagonGridCoords;
    const text = new Text(`${x},${y}`, {
      fontSize: 15,
      fill: "white",
    });
    
    text.x = hexagon._bounds.minX + 20;
    text.y = hexagon._bounds.minY + 20;
    hexagon.addChild(text);
  }

  /**
   * Add coordinate labels to all hexagons on the board
   */
  static labelAllHexagons(hexagons: IHexagon[]): void {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    hexagons.forEach((hexagon) => {
      this.drawHexagonCoords(hexagon);
    });
  }
}

// Legacy exports for backwards compatibility (can be removed if not needed)
export const devDrawBoundariesFromCoords = DevTools.drawBoundariesFromCoords;
export const devDrawBoundariesFromBounds = DevTools.drawBoundariesFromBounds;
export const devDrawPoint = DevTools.drawPoint;
export const devDrawHexagonCoordsText = DevTools.drawHexagonCoords;
