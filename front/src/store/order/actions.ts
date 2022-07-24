import { OrderWithFurnitures } from "app/../commons/Interface/Order";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { OrderActionTypes } from "./action-types";
import { OrderMutationTypes } from "./mutation-types";
import { OrderStateInterface } from "./state";

const actions: ActionTree<OrderStateInterface, StateInterface> = {
  [OrderActionTypes.SET_ORDERS]({ commit }, furnitures: OrderWithFurnitures[]) {
    commit(OrderMutationTypes.SET_ORDERS, furnitures)
  },
  [OrderActionTypes.ADD_ORDER]({ commit }, furniture: OrderWithFurnitures) {
    commit(OrderMutationTypes.ADD_ORDER, furniture)
  },
};

export default actions;
