import { OrderWithFurnitures, OrderWithFurnituresAndCreator } from "../../../../commons/Interface/Order";
import { MutationTree } from "vuex";
import { OrderMutationTypes } from "./mutation-types";
import { OrderStateInterface } from "./state";

const mutation: MutationTree<OrderStateInterface> = {
  [OrderMutationTypes.SET_ORDERS] (state: OrderStateInterface, payload: OrderWithFurnitures[]) {
    state.orders = payload;
  },
  [OrderMutationTypes.SET_ORDER] (state: OrderStateInterface, payload: OrderWithFurnituresAndCreator) {
    state.order = payload;
  },
  [OrderMutationTypes.ADD_ORDER] (state: OrderStateInterface, payload: OrderWithFurnitures) {
    state.orders = [...state.orders, payload];
  }
};

export default mutation;
