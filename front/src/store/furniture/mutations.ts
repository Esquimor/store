import { Furniture } from "app/../commons/Interface/Furniture";
import { MutationTree } from "vuex";
import { FurnitureMutationTypes } from "./mutation-types";
import { FurnitureStateInterface } from "./state";

const mutation: MutationTree<FurnitureStateInterface> = {
  [FurnitureMutationTypes.SET_FURNITURES] (state: FurnitureStateInterface, payload: Furniture[]) {
    state.furnitures = payload;
  },
  [FurnitureMutationTypes.ADD_FURNITURE] (state: FurnitureStateInterface, payload: Furniture) {
    state.furnitures = [...state.furnitures, payload];
  }
};

export default mutation;
