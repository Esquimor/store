import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { FurnitureStateInterface } from "./state";

const getters: GetterTree<FurnitureStateInterface, StateInterface> = {
  furnitures: (state) => state.furnitures,
};

export default getters;
