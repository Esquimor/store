import { Address } from "app/../commons/Interface/Address";
import { MutationTree } from "vuex";
import { AddressMutationTypes } from "./mutation-types";
import { AddressStateInterface } from "./state";

const mutation: MutationTree<AddressStateInterface> = {
  [AddressMutationTypes.ADD_ADDRESS] (state: AddressStateInterface, payload: Address) {
    state.addresses = [...state.addresses, payload];
  },
  [AddressMutationTypes.RESET_ADDRESS] (state: AddressStateInterface) {
    state.addresses = []
  },
};

export default mutation;
