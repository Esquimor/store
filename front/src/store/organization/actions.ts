import { Organization } from "app/../commons/Interface/Organization";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { OrganizationActionTypes } from "./action-types";
import { OrganizationMutationTypes } from "./mutation-types";
import { OrganizationStateInterface } from "./state";

const actions: ActionTree<OrganizationStateInterface, StateInterface> = {
  [OrganizationActionTypes.SET_ORGANIZATION]({ commit }, organization: Organization) {
    commit(OrganizationMutationTypes.SET_ORGANIZATION, organization)
  },
};

export default actions;
