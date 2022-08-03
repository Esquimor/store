import { User } from "app/../commons/Interface/User";
import { MutationTree } from "vuex";
import { UserMutationTypes } from "./mutation-types";
import { UserStateInterface } from "./state";

const mutation: MutationTree<UserStateInterface> = {
  [UserMutationTypes.RESET_USER] (state: UserStateInterface) {
    state.user = null;
  },
  [UserMutationTypes.SET_USER] (state: UserStateInterface, payload: User) {
    state.user = payload;
  }
};

export default mutation;
