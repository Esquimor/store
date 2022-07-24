import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { OrderStateInterface } from "./state";

const getters: GetterTree<OrderStateInterface, StateInterface> = {
  orders: (state) => state.orders,
};

export default getters;
