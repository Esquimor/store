import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { FurnitureStateInterface } from "./state";

const getters: GetterTree<FurnitureStateInterface, StateInterface> = {
  furnituresWithLastestFurnitureVersion: (state) => state.furnituresWithLastestFurnitureVersion,
};

export default getters;
