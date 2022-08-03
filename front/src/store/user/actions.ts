import { User } from "app/../commons/Interface/User";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";
import { UserStateInterface } from "./state";

const actions: ActionTree<UserStateInterface, StateInterface> = {
  [UserActionTypes.RESET_USER]({ commit}) {
    commit(UserMutationTypes.RESET_USER)
  },
  [UserActionTypes.SET_USER]({ commit }, user: User) {
    commit(UserMutationTypes.SET_USER, user)
  },
};

export default actions;
