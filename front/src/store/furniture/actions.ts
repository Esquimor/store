import { Furniture } from "app/../commons/Interface/Furniture";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { FurnitureActionTypes } from "./action-types";
import { FurnitureMutationTypes } from "./mutation-types";
import { FurnitureStateInterface } from "./state";

const actions: ActionTree<FurnitureStateInterface, StateInterface> = {
  [FurnitureActionTypes.SET_FURNITURES]({ commit }, furnitures: Furniture[]) {
    commit(FurnitureMutationTypes.SET_FURNITURES, furnitures)
  },
  [FurnitureActionTypes.ADD_FURNITURE]({ commit }, furniture: Furniture) {
    commit(FurnitureMutationTypes.ADD_FURNITURE, furniture)
  },
};

export default actions;
