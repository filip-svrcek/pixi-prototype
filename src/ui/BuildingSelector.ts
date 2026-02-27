import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";
import { BuildingType } from "../config/constants";
import { BUILDINGS, BUILDING_ORDER } from "../sim/BuildingCatalog";
import { BuildingDefinition } from "../core/interfaces";

interface BuildingButton {
  container: Container;
  building: BuildingDefinition;
  background: Graphics;
  label: Text;
  iconSprite: Sprite;
  isSelected: boolean;
}

export class BuildingSelector {
  private container: Container = new Container();
  private buttons: Map<BuildingType, BuildingButton> = new Map();
  private onSelectionChange: (building: BuildingType) => void = () => {};
  private selectedBuilding: BuildingType = BuildingType.FARM;

  private readonly BUTTON_SIZE = 80;
  private readonly BUTTON_SPACING = 10;
  private readonly PADDING = 10;
  private readonly BORDER_COLOR = 0x16c784;
  private readonly SELECTED_COLOR = 0xff6b6b;
  private readonly UNSELECTED_COLOR = 0x444444;

  constructor() {
    this.createButtons();
    this.updateLayout();
  }

  private createButtons(): void {
    let xPosition = this.PADDING;

    BUILDING_ORDER.forEach((buildingType) => {
      const building = BUILDINGS[buildingType];
      
      // Container for the button
      const buttonContainer = new Container();
      buttonContainer.position.set(xPosition, this.PADDING);
      buttonContainer.eventMode = "static";
      buttonContainer.cursor = "pointer";

      // Background rectangle
      const background = new Graphics();
      background.lineStyle(2, this.BORDER_COLOR, 1);
      background.beginFill(this.UNSELECTED_COLOR);
      background.drawRect(0, 0, this.BUTTON_SIZE, this.BUTTON_SIZE);
      background.endFill();

      // Building icon
      const texture = Texture.from(building.graphics.iconPath);
      const iconSprite = new Sprite(texture);
      iconSprite.width = iconSprite.width * (this.BUTTON_SIZE - 8) / iconSprite.width;
      iconSprite.height = iconSprite.height * (this.BUTTON_SIZE - 8) / iconSprite.height;
      iconSprite.position.set(4, 4);

      // Label
      const label = new Text(building.name, {
        fontSize: 10,
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: this.BUTTON_SIZE - 4,
        align: "center",
      });
      label.anchor.set(0.5, 0);
      label.position.set(this.BUTTON_SIZE / 2, this.BUTTON_SIZE + 4);

      // Add children
      buttonContainer.addChild(background);
      buttonContainer.addChild(iconSprite);

      // Click handler
      buttonContainer.on("click", () => {
        this.selectBuilding(buildingType);
        this.onSelectionChange(buildingType);
      });

      buttonContainer.on("tap", () => {
        this.selectBuilding(buildingType);
        this.onSelectionChange(buildingType);
      });

      this.container.addChild(buttonContainer);
      this.container.addChild(label);

      const button: BuildingButton = {
        container: buttonContainer,
        building,
        background,
        label,
        iconSprite,
        isSelected: buildingType === this.selectedBuilding,
      };

      this.buttons.set(buildingType, button);
      xPosition += this.BUTTON_SIZE + this.BUTTON_SPACING;
    });

    // Select the first building by default (TOWN_CENTER)
    this.selectBuilding(BuildingType.TOWN_CENTER);
  }

  private selectBuilding(buildingType: BuildingType): void {
    // Deselect previous
    const previousButton = this.buttons.get(this.selectedBuilding);
    if (previousButton) {
      previousButton.background.clear();
      previousButton.background.lineStyle(2, this.BORDER_COLOR, 1);
      previousButton.background.beginFill(this.UNSELECTED_COLOR);
      previousButton.background.drawRect(0, 0, this.BUTTON_SIZE, this.BUTTON_SIZE);
      previousButton.background.endFill();
      previousButton.isSelected = false;
    }

    // Select new
    this.selectedBuilding = buildingType;
    const newButton = this.buttons.get(buildingType);
    if (newButton) {
      newButton.background.clear();
      newButton.background.lineStyle(3, this.SELECTED_COLOR, 1);
      newButton.background.beginFill(this.SELECTED_COLOR);
      newButton.background.drawRect(0, 0, this.BUTTON_SIZE, this.BUTTON_SIZE);
      newButton.background.endFill();
      newButton.isSelected = true;
    }
  }

  private updateLayout(): void {
    // Position the selector at the top of the screen
    this.container.position.set(0, 100);
  }

  getContainer(): Container {
    return this.container;
  }

  setOnSelectionChange(callback: (building: BuildingType) => void): void {
    this.onSelectionChange = callback;
  }

  getSelectedBuilding(): BuildingType {
    return this.selectedBuilding;
  }

  setSelectedBuilding(building: BuildingType): void {
    this.selectBuilding(building);
  }
}
