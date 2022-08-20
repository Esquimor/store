import { AddressWithPlacements } from "app/../commons/Interface/Address";
import { MutationTree } from "vuex";
import { AddressMutationTypes } from "./mutation-types";
import { AddressStateInterface } from "./state";

const mutation: MutationTree<AddressStateInterface> = {
  [AddressMutationTypes.ADD_ADDRESS] (state: AddressStateInterface, payload: AddressWithPlacements) {
    state.addresses = [...state.addresses, payload];
  },
  [AddressMutationTypes.RESET_ADDRESS] (state: AddressStateInterface) {
    state.addresses = []
  },
  [AddressMutationTypes.SET_ADDRESSES] (state: AddressStateInterface, payload: AddressWithPlacements[]) {
    state.addresses = payload
  },
  [AddressMutationTypes.REMOVE_ADDRESS] (state: AddressStateInterface, payload: string) {
    state.addresses = state.addresses.filter((address) => address.id !== payload)
  },
  [AddressMutationTypes.UPDATE_ADDRESS] (state: AddressStateInterface, payload: AddressWithPlacements) {
    state.addresses = state.addresses.map(address => {
      if (address.id !== payload.id) return address;
      return payload
    })
  }
};

export default mutation;
