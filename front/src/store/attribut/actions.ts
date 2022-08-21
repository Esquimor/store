import { AttributDefault, Attribut } from "app/../commons/Interface/Attribut";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { AttributActionTypes } from "./action-types";
import { AttributMutationTypes } from "./mutation-types";
import { AttributStateInterface } from "./state";

const actions: ActionTree<AttributStateInterface, StateInterface> = {
  [AttributActionTypes.RESET_ATTRIBUT]({ commit }) {
    commit(AttributMutationTypes.RESET_ATTRIBUT)
  },
  [AttributActionTypes.SET_ATTRIBUTS]({ commit }, inventories: Attribut[]) {
    commit(AttributMutationTypes.SET_ATTRIBUTS, inventories)
  },
  [AttributActionTypes.ADD_ATTRIBUT]({ commit }, inventory: AttributDefault[]) {
    commit(AttributMutationTypes.ADD_ATTRIBUT, inventory)
  },
  [AttributActionTypes.UPDATE_ATTRIBUT]({ commit }, inventory: Attribut) {
    commit(AttributMutationTypes.UPDATE_ATTRIBUT, inventory)
  },
  [AttributActionTypes.REMOVE_ATTRIBUT]({ commit }, inventoryId: string) {
    commit(AttributMutationTypes.REMOVE_ATTRIBUT, inventoryId)
  },
};

export default actions;
