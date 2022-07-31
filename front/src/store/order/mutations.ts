import { OrderWithItemWithFurnitureVersionWithFurniture, OrderWithItemWithFurnitureVersionWithFurnitureAndCreator } from "../../../../commons/Interface/Order";
import { MutationTree } from "vuex";
import { OrderMutationTypes } from "./mutation-types";
import { OrderStateInterface } from "./state";

const mutation: MutationTree<OrderStateInterface> = {
  [OrderMutationTypes.SET_ORDERS] (state: OrderStateInterface, payload: OrderWithItemWithFurnitureVersionWithFurniture[]) {
    state.orders = payload;
  },
  [OrderMutationTypes.SET_ORDER] (state: OrderStateInterface, payload: OrderWithItemWithFurnitureVersionWithFurnitureAndCreator) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.order = payload;
  },
  [OrderMutationTypes.ADD_ORDER] (state: OrderStateInterface, payload: OrderWithItemWithFurnitureVersionWithFurniture) {
    state.orders = [...state.orders, payload];
  }
};

export default mutation;
