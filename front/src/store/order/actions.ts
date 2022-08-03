import { OrderWithItemWithFurnitureVersionWithFurniture, OrderWithItemWithFurnitureVersionWithFurnitureAndCreator } from "app/../commons/Interface/Order";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { OrderActionTypes } from "./action-types";
import { OrderMutationTypes } from "./mutation-types";
import { OrderStateInterface } from "./state";

const actions: ActionTree<OrderStateInterface, StateInterface> = {
  [OrderActionTypes.RESET_ORDER] ({ commit }) {
    commit(OrderMutationTypes.RESET_ORDER)
  },
  [OrderActionTypes.SET_ORDERS]({ commit }, orders: OrderWithItemWithFurnitureVersionWithFurniture[]) {
    commit(OrderMutationTypes.SET_ORDERS, orders)
  },
  [OrderActionTypes.SET_ORDER]({ commit }, order: OrderWithItemWithFurnitureVersionWithFurnitureAndCreator[]) {
    commit(OrderMutationTypes.SET_ORDER, order)
  },
  [OrderActionTypes.ADD_ORDER]({ commit }, order: OrderWithItemWithFurnitureVersionWithFurniture) {
    commit(OrderMutationTypes.ADD_ORDER, order)
  },
};

export default actions;
