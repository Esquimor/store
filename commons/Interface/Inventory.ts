import { FurnitureVersion } from "./FurnitureVersion";

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