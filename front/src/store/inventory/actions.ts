import { InventoryDefault, Inventory } from "app/../commons/Interface/Inventory";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { InventoryActionTypes } from "./action-types";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const actions: ActionTree<InventoryStateInterface, StateInterface> = {
  [InventoryActionTypes.RESET_INVENTORY]({ commit }) {
    commit(InventoryMutationTypes.RESET_INVENTORY)
  },
  [InventoryActionTypes.SET_INVENTORIES]({ commit }, inventories: Inventory[]) {
    commit(InventoryMutationTypes.SET_INVENTORIES, inventories)
  },
  [InventoryActionTypes.ADD_INVENTORY]({ commit }, inventory: InventoryDefault[]) {
    commit(InventoryMutationTypes.ADD_INVENTORY, inventory)
  },
  [InventoryActionTypes.UPDATE_INVENTORY]({ commit }, inventory: Inventory) {
    commit(InventoryMutationTypes.UPDATE_INVENTORY, inventory)
  },
  [InventoryActionTypes.REMOVE_INVENTORY]({ commit }, inventoryId: string) {
    commit(InventoryMutationTypes.REMOVE_INVENTORY, inventoryId)
  },
};

export default actions;
