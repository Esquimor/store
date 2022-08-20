import { AddressWithPlacements } from "app/../commons/Interface/Address";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { AddressActionTypes } from "./action-types";
import { AddressMutationTypes } from "./mutation-types";
import { AddressStateInterface } from "./state";

const actions: ActionTree<AddressStateInterface, StateInterface> = {
  [AddressActionTypes.RESET_ADDRESS]({ commit }) {
    commit(AddressMutationTypes.RESET_ADDRESS)
  },
  [AddressActionTypes.ADD_ADDRESS]({ commit }, address: AddressWithPlacements) {
    commit(AddressMutationTypes.ADD_ADDRESS, address)
  },
  [AddressActionTypes.SET_ADDRESSES]({ commit }, addresses: AddressWithPlacements[]) {
    commit(AddressMutationTypes.SET_ADDRESSES, addresses)
  },
  [AddressActionTypes.REMOVE_ADDRESS]({ commit }, addressId: string) {
    commit(AddressMutationTypes.REMOVE_ADDRESS, addressId)
  },
  [AddressActionTypes.UPDATE_ADDRESS]({ commit }, address: AddressWithPlacements) {
    commit(AddressMutationTypes.UPDATE_ADDRESS, address)
  }
};

export default actions;
