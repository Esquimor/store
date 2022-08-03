import { FurnitureWithLatestFurnitureVersion } from "app/../commons/Interface/Furniture";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { FurnitureActionTypes } from "./action-types";
import { FurnitureMutationTypes } from "./mutation-types";
import { FurnitureStateInterface } from "./state";

const actions: ActionTree<FurnitureStateInterface, StateInterface> = {
  [FurnitureActionTypes.RESET_FURNITURE]({ commit }) {
    commit(FurnitureMutationTypes.RESET_FURNITURE)
  },
  [FurnitureActionTypes.SET_FURNITURES_WITH_LATEST_FURNITURE_VERSION]({ commit }, furnitures: FurnitureWithLatestFurnitureVersion[]) {
    commit(FurnitureMutationTypes.SET_FURNITURES_WITH_LATEST_FURNITURE_VERSION, furnitures)
  },
  [FurnitureActionTypes.ADD_FURNITURE_WITH_LATEST_FURNITURE_VERSION]({ commit }, furniture: FurnitureWithLatestFurnitureVersion) {
    commit(FurnitureMutationTypes.ADD_FURNITURE_WITH_LATEST_FURNITURE_VERSION, furniture)
  },
};

export default actions;
