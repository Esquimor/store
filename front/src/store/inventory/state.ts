import { InventoryWithFurnitureVersion } from "../../../../commons/Interface/Inventory";

export interface InventoryStateInterface {
  inventories: InventoryWithFurnitureVersion[];
}

function state(): InventoryStateInterface {
  return {
    inventories: [],
  }
};

export default state;
