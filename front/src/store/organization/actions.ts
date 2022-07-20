import { Organization } from "app/../commons/Interface/Organization";
import { User } from "app/../commons/Interface/User";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { OrganizationActionTypes } from "./action-types";
import { OrganizationMutationTypes } from "./mutation-types";
import { OrganizationStateInterface } from "./state";

const actions: ActionTree<OrganizationStateInterface, StateInterface> = {
  [OrganizationActionTypes.SET_ORGANIZATION]({ commit }, organization: Organization) {
    commit(OrganizationMutationTypes.SET_ORGANIZATION, organization)
  },
  [OrganizationActionTypes.ADD_USER_IN_ORGANIZATION]({ commit }, user: User) {
    commit(OrganizationMutationTypes.ADD_USER_IN_ORGANIZATION, user)
  },
  [OrganizationActionTypes.SET_USERS_IN_ORGANIZATION]({ commit }, users: User[]) {
    commit(OrganizationMutationTypes.SET_USERS_IN_ORGANIZATION, users)
  },
  [OrganizationActionTypes.UPDATE_USER_IN_ORGANIZATION]({ commit }, user: User) {
    commit(OrganizationMutationTypes.UPDATE_USER_IN_ORGANIZATION, user)
  },
  [OrganizationActionTypes.DELETE_USER_IN_ORGANIZATION]({ commit }, userId: string|number) {
    commit(OrganizationMutationTypes.DELETE_USER_IN_ORGANIZATION, userId)
  },
};

export default actions;
