import { CITY_TICK_MS } from "../config/constants";
import { CityState } from "./CityState";
import { FullResourceLedger } from "../core/interfaces";
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

  private calculateProduction(): Partial<FullResourceLedger> {
    const totals: Partial<FullResourceLedger> = {
      gold: 0,
      food: 0,
      mana: 0,
      lumber: 0,
      housing: 0,
      stone: 0,
      ironOre: 0,
      iron: 0,
    };

    this.city.getBuildings().forEach((building) => {

      const definition = BUILDINGS[building.type];
      Object.entries(definition?.gameSettings?.production ?? {}).forEach(([key, value]) => {
        const resourceKey = key as keyof FullResourceLedger;
        const multiplier = this.city.getProductionMultiplier(resourceKey);
        totals[resourceKey] = (totals[resourceKey] ?? 0) + (value ?? 0) * multiplier;
      });
    });

    return totals;
  }
}
