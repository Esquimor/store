import { ROLE } from "app/../commons/Interface/Role";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";

const getters: GetterTree<UserStateInterface, StateInterface> = {
  user: (state) => state.user,
  // eslint-disable-next-line
  isAdmin: (_, getters: any) => getters.user?.role === ROLE.ADMIN,
  // eslint-disable-next-line
  isValidator: (_, getters: any) => getters.user?.role === ROLE.VALIDATOR,
  // eslint-disable-next-line
  canChangeOrderStatus: (_, getters: any) => getters.isAdmin || getters.isValidator
};

export default getters;
