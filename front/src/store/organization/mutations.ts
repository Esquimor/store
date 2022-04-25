import { Organization } from "app/../commons/Interface/Organization";
import { MutationTree } from "vuex";
import { OrganizationMutationTypes } from "./mutation-types";
import { OrganizationStateInterface } from "./state";

const mutation: MutationTree<OrganizationStateInterface> = {
  [OrganizationMutationTypes.SET_ORGANIZATION] (state: OrganizationStateInterface, payload: Organization) {
    state.organization = payload;
  }
};

export default mutation;
