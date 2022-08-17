import { Address } from "app/../commons/Interface/Address";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { AddressActionTypes } from "./action-types";
import { AddressMutationTypes } from "./mutation-types";
import { AddressStateInterface } from "./state";

const actions: ActionTree<AddressStateInterface, StateInterface> = {
  [AddressActionTypes.RESET_ADDRESS]({ commit }) {
    commit(AddressMutationTypes.RESET_ADDRESS)
  },
  [AddressActionTypes.ADD_ADDRESS]({ commit }, article: Address) {
    commit(AddressMutationTypes.ADD_ADDRESS, article)
  },
};

export default actions;
