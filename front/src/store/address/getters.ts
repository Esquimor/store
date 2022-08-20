import { Address } from "app/../commons/Interface/Address";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { AddressStateInterface } from "./state";

const getters: GetterTree<AddressStateInterface, StateInterface> = {
  addresses: (state) => state.addresses,
  // eslint-disable-next-line
  getAddressById: (_, getters: any) => (id: string) => getters.addresses.find((address: Address) => address.id === id),
};

export default getters;
