import { FurnitureVersion } from "./FurnitureVersion";

export type InventoriesCounted = {
  organization: number;
  address: number;
  placement: number;
  user: number;
}

export interface InventoryWithFurnitureVersion extends Inventory {
  furnitureVersion: FurnitureVersion;
}

export interface Inventory extends InventoryDefault {
  id: string;
}

export interface InventoryDefaultWithFurnitureVersionId extends InventoryDefault {
  furnitureVersionId: string;
}

export interface InventoryDefault {
  quantity: number;
}