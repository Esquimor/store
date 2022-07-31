import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { InventoryStateInterface } from "./state";

const getters: GetterTree<InventoryStateInterface, StateInterface> = {
  inventories: (state) => state.inventories,
};

export default getters;
