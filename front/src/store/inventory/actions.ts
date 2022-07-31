import { Inventory } from "app/../commons/Interface/Inventory";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { InventoryActionTypes } from "./action-types";
import { InventoryMutationTypes } from "./mutation-types";
import { InventoryStateInterface } from "./state";

const actions: ActionTree<InventoryStateInterface, StateInterface> = {
  [InventoryActionTypes.SET_INVENTORIES]({ commit }, orders: Inventory[]) {
    commit(InventoryMutationTypes.SET_INVENTORIES, orders)
  },
};

export default actions;
