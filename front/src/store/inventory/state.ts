import { Inventory } from "../../../../commons/Interface/Inventory";

export interface InventoryStateInterface {
  inventories: Inventory[];
}

function state(): InventoryStateInterface {
  return {
    inventories: [],
  }
};

export default state;
