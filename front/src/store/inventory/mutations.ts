import { Inventory } from "../../../../commons/Interface/Inventory";
import { MutationTree } from "vuex";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const mutation: MutationTree<InventoryStateInterface> = {
  [InventoryMutationTypes.SET_INVENTORIES] (state: InventoryStateInterface, payload: Inventory[]) {
    state.inventories = payload;
  },
  [InventoryMutationTypes.ADD_INVENTORY] (state: InventoryStateInterface, payload: Inventory) {
    state.inventories = [...state.inventories, payload];
  },
};

export default mutation;
