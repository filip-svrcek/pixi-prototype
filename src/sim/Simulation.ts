import { CITY_TICK_MS } from "../config/constants";
import { CityState } from "./CityState";
import { ResourceLedger } from "../core/interfaces";
import { BUILDINGS } from "./BuildingCatalog";

export class Simulation {
  private elapsedMs = 0;

  constructor(private city: CityState) {}

  update(deltaMs: number): void {
    this.elapsedMs += deltaMs;

    while (this.elapsedMs >= CITY_TICK_MS) {
      this.elapsedMs -= CITY_TICK_MS;
      this.step();
    }
  }

  private step(): void {
    const production = this.calculateProduction();
    this.city.tick(production);
  }

  private calculateProduction(): Partial<ResourceLedger> {
    const totals: Partial<ResourceLedger> = {
      gold: 0,
      food: 0,
      mana: 0,
      lumber: 0,
      housing: 0,
    };

    this.city.getDistricts().forEach((district) => {
      if (!district.building) {
        return;
      }

      const definition = BUILDINGS[district.building.type];
      Object.entries(definition.production).forEach(([key, value]) => {
        const resourceKey = key as keyof ResourceLedger;
        const multiplier = this.city.getProductionMultiplier(resourceKey);
        totals[resourceKey] = (totals[resourceKey] ?? 0) + (value ?? 0) * multiplier;
      });
    });

    return totals;
  }
}
