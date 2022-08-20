import { Inventory } from "../../../../commons/Interface/Inventory";
import { MutationTree } from "vuex";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const mutation: MutationTree<InventoryStateInterface> = {
  [InventoryMutationTypes.RESET_INVENTORY] (state: InventoryStateInterface) {
    state.inventories = []
  },
  [InventoryMutationTypes.SET_INVENTORIES] (state: InventoryStateInterface, payload: Inventory[]) {
    state.inventories = payload;
  },
  [InventoryMutationTypes.ADD_INVENTORY] (state: InventoryStateInterface, payload: Inventory) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.inventories = [...state.inventories, payload];
  },
  [InventoryMutationTypes.UPDATE_INVENTORY] (state: InventoryStateInterface, payload: Inventory) {
    state.inventories = state.inventories.map((inventory) => {
      if (inventory.id !== payload.id) return inventory;
      return payload
    });
  },
  [InventoryMutationTypes.REMOVE_INVENTORY] (state: InventoryStateInterface, payload: string) {
    state.inventories = state.inventories.filter((inventory) => inventory.id !== payload)
  },
};

export default mutation;
