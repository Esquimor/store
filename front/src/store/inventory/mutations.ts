import { InventoryWithFurnitureVersion } from "../../../../commons/Interface/Inventory";
import { MutationTree } from "vuex";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const mutation: MutationTree<InventoryStateInterface> = {
  [InventoryMutationTypes.RESET_INVENTORY] (state: InventoryStateInterface) {
    state.inventories = []
  },
  [InventoryMutationTypes.SET_INVENTORIES] (state: InventoryStateInterface, payload: InventoryWithFurnitureVersion[]) {
    state.inventories = payload;
  },
  [InventoryMutationTypes.ADD_INVENTORY] (state: InventoryStateInterface, payload: InventoryWithFurnitureVersion) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.inventories = [...state.inventories, payload];
  },
};

export default mutation;
