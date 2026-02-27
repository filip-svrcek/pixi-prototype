import { BuildingType, STARTING_RESOURCES } from "../config/constants";
import {
  BuildingDefinition,
  BuildingInstance,
  FullResourceLedger,
  HeroProfile,
  IHexagon,
  ResourceLedger,
} from "../core/interfaces";
import { getBuildingDefinition } from "./BuildingCatalog";

export class CityState {
  private resources: ResourceLedger = { ...STARTING_RESOURCES };
  private buildings:  Map<string, BuildingInstance> = new Map();
  private heroes: HeroProfile[] = [
    {
      id: "hero-arcanist",
      name: "Arcanist of the Vale",
      bonus: { resource: "mana", multiplier: 1.1 },
    },
  ];


  getResources(): ResourceLedger {
    return { ...this.resources };
  }

  getHeroes(): HeroProfile[] {
    return [...this.heroes];
  }

  canAfford(cost: Partial<ResourceLedger>): boolean {
    return Object.entries(cost).every(([key, value]) => {
      const resourceKey = key as keyof ResourceLedger;
      return (this.resources[resourceKey] ?? 0) >= (value ?? 0);
    });
  }

  isBuildingAllowedOnTile(hexagon: IHexagon, type: BuildingType): boolean {
    const definition = getBuildingDefinition(type);
    const allowedTiles = definition.gameSettings.tiles?.allowed;
    console.log("Allowed tiles for building:", allowedTiles);
    console.log("Hexagon terrain type:", hexagon.tileTerrain);
    if (allowedTiles && !allowedTiles.includes(hexagon.tileTerrain)) {
      return false;
    }

    return true;
  }

  placeBuilding(hexagon: IHexagon, type: BuildingType): BuildingDefinition | null {
    if (hexagon.building) {
      return null;
    }
    if (!this.isBuildingAllowedOnTile(hexagon, type)) {
      return null;
    }

    const definition = getBuildingDefinition(type);
    if (!this.canAfford(definition.gameSettings.cost)) {
      return null;
    }

    this.applyCost(definition.gameSettings.cost);

    const building: BuildingInstance = {
      type,
      level: 1,
    };

    hexagon.building = building;
    const id = `${hexagon.hexagonGridCoords.x},${hexagon.hexagonGridCoords.y}`;
    this.buildings.set(id, building);
    return definition;
  }

  tick(production: Partial<ResourceLedger>): void {
    Object.entries(production).forEach(([key, value]) => {
      const resourceKey = key as keyof ResourceLedger;
      this.resources[resourceKey] += value ?? 0;
    });
  }

  getBuildings(): BuildingInstance[] {
    return Array.from(this.buildings.values());
  }

  getBuildingDefinition(type: BuildingType): BuildingDefinition {
    return getBuildingDefinition(type);
  }

  getProductionMultiplier(resource: keyof FullResourceLedger): number {
    const multiplier = this.heroes
      .filter((hero) => hero.bonus.resource === resource)
      .reduce((acc, hero) => acc * hero.bonus.multiplier, 1);

    return multiplier;
  }

  private applyCost(cost: Partial<ResourceLedger>): void {
    Object.entries(cost).forEach(([key, value]) => {
      const resourceKey = key as keyof ResourceLedger;
      this.resources[resourceKey] -= value ?? 0;
    });
  }
}
