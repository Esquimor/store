import { Tag } from "app/../commons/Interface/Tag";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { TagActionTypes } from "./action-types";
import { TagMutationTypes } from "./mutation-types";
import { TagStateInterface } from "./state";

const actions: ActionTree<TagStateInterface, StateInterface> = {
  [TagActionTypes.RESET_TAG]({ commit }) {
    commit(TagMutationTypes.RESET_TAG)
  },
  [TagActionTypes.ADD_TAG]({ commit }, tag: Tag) {
    commit(TagMutationTypes.ADD_TAG, tag)
  },
  [TagActionTypes.SET_TAGS]({ commit }, tags: Tag[]) {
    commit(TagMutationTypes.SET_TAGS, tags)
  },
  [TagActionTypes.REMOVE_TAG]({ commit }, tagId: string) {
    commit(TagMutationTypes.REMOVE_TAG, tagId)
  },
  [TagActionTypes.UPDATE_TAG]({ commit }, tag: Tag) {
    commit(TagMutationTypes.UPDATE_TAG, tag)
  }
};

export default actions;
