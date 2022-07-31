import { FurnitureWithLatestFurnitureVersion } from "app/../commons/Interface/Furniture";
import { MutationTree } from "vuex";
import { FurnitureMutationTypes } from "./mutation-types";
import { FurnitureStateInterface } from "./state";

const mutation: MutationTree<FurnitureStateInterface> = {
  [FurnitureMutationTypes.SET_FURNITURES_WITH_LATEST_FURNITURE_VERSION] (state: FurnitureStateInterface, payload: FurnitureWithLatestFurnitureVersion[]) {
    state.furnituresWithLastestFurnitureVersion = payload;
  },
  [FurnitureMutationTypes.ADD_FURNITURE_WITH_LATEST_FURNITURE_VERSION] (state: FurnitureStateInterface, payload: FurnitureWithLatestFurnitureVersion) {
    state.furnituresWithLastestFurnitureVersion = [...state.furnituresWithLastestFurnitureVersion, payload];
  }
};

export default mutation;
