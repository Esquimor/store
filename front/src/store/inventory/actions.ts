import { InventoryWithFurnitureVersion } from "app/../commons/Interface/Inventory";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { InventoryActionTypes } from "./action-types";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const actions: ActionTree<InventoryStateInterface, StateInterface> = {
  [InventoryActionTypes.RESET_INVENTORY]({ commit }) {
    commit(InventoryMutationTypes.RESET_INVENTORY)
  },
  [InventoryActionTypes.SET_INVENTORIES]({ commit }, orders: InventoryWithFurnitureVersion[]) {
    commit(InventoryMutationTypes.SET_INVENTORIES, orders)
  },
};

export default actions;
