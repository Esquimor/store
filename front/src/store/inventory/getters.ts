import { Inventory } from "app/../commons/Interface/Inventory";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { InventoryStateInterface } from "./state";

const getters: GetterTree<InventoryStateInterface, StateInterface> = {
  inventories: (state) => state.inventories,
  // eslint-disable-next-line
  getInventoryById: (_, getters: any) => (id: string) => getters.inventories.find((inventory: Inventory) => inventory.id === id),
};

export default getters;
