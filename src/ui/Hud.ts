import { Container, Text } from "pixi.js";
import { BuildingType } from "../config/constants";
import { CityState } from "../sim/CityState";
import { BUILDINGS } from "../sim/BuildingCatalog";

export class Hud {
  private container: Container = new Container();
  private resourceText: Text;
  private selectionText: Text;
  private heroText: Text;

  constructor() {
    this.resourceText = new Text("", {
      fontSize: 16,
      fill: "#ffffff",
    });
    this.selectionText = new Text("", {
      fontSize: 14,
      fill: "#ffd27d",
    });
    this.heroText = new Text("", {
      fontSize: 12,
      fill: "#a1c9ff",
    });

    this.resourceText.position.set(16, 12);
    this.selectionText.position.set(16, 36);
    this.heroText.position.set(16, 56);

    this.container.addChild(this.resourceText);
    this.container.addChild(this.selectionText);
    this.container.addChild(this.heroText);
  }

  getContainer(): Container {
    return this.container;
  }

  update(city: CityState, selectedBuilding: BuildingType): void {
    const resources = city.getResources();
    this.resourceText.text = `Gold: ${resources.gold}  Food: ${resources.food}  Mana: ${resources.mana}  Lumber: ${resources.lumber}  Housing: ${resources.housing}`;

    const selected = BUILDINGS[selectedBuilding];
    this.selectionText.text = `Selected: ${selected.name} (press 1-4)`;

    const heroes = city.getHeroes();
    this.heroText.text = `Hero: ${heroes[0].name} (+${Math.round((heroes[0].bonus.multiplier - 1) * 100)}% ${heroes[0].bonus.resource})`;
  }
}
