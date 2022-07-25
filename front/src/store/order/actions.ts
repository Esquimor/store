import { OrderWithFurnitures, OrderWithFurnituresAndCreator } from "app/../commons/Interface/Order";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { OrderActionTypes } from "./action-types";
import { OrderMutationTypes } from "./mutation-types";
import { OrderStateInterface } from "./state";

const actions: ActionTree<OrderStateInterface, StateInterface> = {
  [OrderActionTypes.SET_ORDERS]({ commit }, orders: OrderWithFurnitures[]) {
    commit(OrderMutationTypes.SET_ORDERS, orders)
  },
  [OrderActionTypes.SET_ORDER]({ commit }, order: OrderWithFurnituresAndCreator[]) {
    commit(OrderMutationTypes.SET_ORDER, order)
  },
  [OrderActionTypes.ADD_ORDER]({ commit }, order: OrderWithFurnitures) {
    commit(OrderMutationTypes.ADD_ORDER, order)
  },
};

export default actions;
