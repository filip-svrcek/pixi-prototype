import { Container, Text } from "pixi.js";
import { BuildingType } from "../config/constants";
import { CityState } from "../sim/CityState";
import { BuildingSelector } from "./BuildingSelector";
import { FlexBox } from "../utils/Flexbox";

export class Hud {
  private container: Container = new Container();
  private resourceDisplay: FlexBox;
  private heroText: Text;
  private buildingSelector: BuildingSelector;

  constructor() {
    this.resourceDisplay = new FlexBox([
      new Text(`Gold: ${100}`, { fontSize: 16, fill: "#ffd700" }),
      new Text(`Food: ${100}`, { fontSize: 16, fill: "#32cd32" }),
      new Text(`Mana: ${100}`, { fontSize: 16, fill: "#1e90ff" }),
      new Text(`Lumber: ${100}`, { fontSize: 16, fill: "#8b4513" }),
      new Text(`Housing: ${100}`, { fontSize: 16, fill: "#ff69b4" }),
    ]);
    this.heroText = new Text("", {
      fontSize: 12,
      fill: "#a1c9ff",
    });

    this.resourceDisplay.position.set(16, 12);
    this.heroText.position.set(16, 36);

    this.buildingSelector = new BuildingSelector();

    this.container.addChild(this.resourceDisplay);
    this.container.addChild(this.heroText);
    this.container.addChild(this.buildingSelector.getContainer());
  }

  getContainer(): Container {
    return this.container;
  }

  update(city: CityState, selectedBuilding: BuildingType): void {
    const resources = city.getResources();
    this.resourceDisplay.children.forEach((child) => {
      if (child instanceof Text) {
        if (child.text.startsWith("Gold:")) {
          child.text = `Gold: ${Math.floor(resources.gold)}`;
        } else if (child.text.startsWith("Food:")) {
          child.text = `Food: ${Math.floor(resources.food)}`;
        } else if (child.text.startsWith("Mana:")) {
          child.text = `Mana: ${Math.floor(resources.mana)}`;
        } else if (child.text.startsWith("Lumber:")) {
          child.text = `Lumber: ${Math.floor(resources.lumber)}`;
        } else if (child.text.startsWith("Housing:")) {
          child.text = `Housing: ${Math.floor(resources.housing)}`;
        }
      }});

    const heroes = city.getHeroes();
    this.heroText.text = `Hero: ${heroes[0].name} (+${Math.round((heroes[0].bonus.multiplier - 1) * 100)}% ${heroes[0].bonus.resource})`;
    
    this.buildingSelector.setSelectedBuilding(selectedBuilding);
  }

  setOnBuildingSelected(callback: (building: BuildingType) => void): void {
    this.buildingSelector.setOnSelectionChange(callback);
  }
}
