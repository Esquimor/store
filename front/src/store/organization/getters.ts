import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { OrganizationStateInterface } from "./state";

const getters: GetterTree<OrganizationStateInterface, StateInterface> = {
  organization: (state) => state.organization,
  users: (state) => state.users,
};

export default getters;
