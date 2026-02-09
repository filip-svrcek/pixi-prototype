import { BuildingType, STARTING_RESOURCES } from "../config/constants";
import {
  BuildingDefinition,
  BuildingInstance,
  District,
  HeroProfile,
  IHexagon,
  ResourceLedger,
} from "../core/interfaces";
import { getBuildingDefinition } from "./BuildingCatalog";

export class CityState {
  private resources: ResourceLedger = { ...STARTING_RESOURCES };
  private districts: Map<string, District> = new Map();
  private heroes: HeroProfile[] = [
    {
      id: "hero-arcanist",
      name: "Arcanist of the Vale",
      bonus: { resource: "mana", multiplier: 1.1 },
    },
  ];

  constructor(hexagons: IHexagon[]) {
    hexagons.forEach((hexagon) => {
      const id = `${hexagon.hexagonGridCoords.x},${hexagon.hexagonGridCoords.y}`;
      const district: District = {
        id,
        coords: hexagon.hexagonGridCoords,
        building: null,
      };
      this.districts.set(id, district);
      hexagon.district = district;
    });
  }

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

  placeBuilding(hexagon: IHexagon, type: BuildingType): BuildingDefinition | null {
    if (!hexagon.district) {
      return null;
    }

    if (hexagon.district.building) {
      return null;
    }

    const definition = getBuildingDefinition(type);
    if (!this.canAfford(definition.cost)) {
      return null;
    }

    this.applyCost(definition.cost);

    const building: BuildingInstance = {
      type,
      level: 1,
    };

    hexagon.district.building = building;

    return definition;
  }

  tick(production: Partial<ResourceLedger>): void {
    Object.entries(production).forEach(([key, value]) => {
      const resourceKey = key as keyof ResourceLedger;
      this.resources[resourceKey] += value ?? 0;
    });
  }

  getDistricts(): District[] {
    return Array.from(this.districts.values());
  }

  getBuildingDefinition(type: BuildingType): BuildingDefinition {
    return getBuildingDefinition(type);
  }

  getProductionMultiplier(resource: keyof ResourceLedger): number {
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
