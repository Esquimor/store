import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { AddressStateInterface } from "./state";

const getters: GetterTree<AddressStateInterface, StateInterface> = {
  addresses: (state) => state.addresses,
};

export default getters;
