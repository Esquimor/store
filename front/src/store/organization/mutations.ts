import { Organization } from "app/../commons/Interface/Organization";
import { User } from "app/../commons/Interface/User";
import { MutationTree } from "vuex";
import { OrganizationMutationTypes } from "./mutation-types";
import { OrganizationStateInterface } from "./state";

const mutation: MutationTree<OrganizationStateInterface> = {
  [OrganizationMutationTypes.SET_ORGANIZATION] (state: OrganizationStateInterface, payload: Organization) {
    state.organization = payload;
  },
  [OrganizationMutationTypes.ADD_USER_IN_ORGANIZATION] (state: OrganizationStateInterface, payload: User) {
    state.users = [...state.users, payload];
  },
  [OrganizationMutationTypes.SET_USERS_IN_ORGANIZATION] (state: OrganizationStateInterface, payload: User[]) {
    state.users = payload;
  },
  [OrganizationMutationTypes.UPDATE_USER_IN_ORGANIZATION] (state: OrganizationStateInterface, payload: User) {
    state.users = state.users.map(user => {
      if (user.id !== payload.id) return user;
      return {...user, ...payload}
    });
  },
  [OrganizationMutationTypes.DELETE_USER_IN_ORGANIZATION] (state: OrganizationStateInterface, payload: string|number) {
    state.users = state.users.filter(user => user.id !== payload)
  },
};

export default mutation;
