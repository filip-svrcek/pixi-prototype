import { Container, DisplayObject } from "pixi.js";

export class FlexBox extends Container {
  constructor(
    elements: DisplayObject[] = [],
    options?: { gap?: number; direction?: "horizontal" | "vertical"; align?: "start" | "center" }
  ) {
    super();
    this.layout(elements, options);
  }

  layout(
    elements: DisplayObject[],
    options?: { gap?: number; direction?: "horizontal" | "vertical"; align?: "start" | "center" }
  ) {
    this.removeChildren();
    const gap = options?.gap ?? 16;
    const direction = options?.direction ?? "horizontal";
    let pos = 0;
    elements.forEach((el) => {
      if (direction === "horizontal") {
        el.position.set(pos, 0);
        pos += el.getBounds().width + gap;
      } else {
        el.position.set(0, pos);
        pos += el.getBounds().height + gap;
      }
      this.addChild(el);
    });
  }
}