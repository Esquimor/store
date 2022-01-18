import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";

const getters: GetterTree<UserStateInterface, StateInterface> = {
  user: (state) => state.user,
};

export default getters;
