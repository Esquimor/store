import { Tag } from "app/../commons/Interface/Tag";
import { MutationTree } from "vuex";
import { TagMutationTypes } from "./mutation-types";
import { TagStateInterface } from "./state";

const mutation: MutationTree<TagStateInterface> = {
  [TagMutationTypes.ADD_TAG] (state: TagStateInterface, payload: Tag) {
    state.tags = [...state.tags, payload];
  },
  [TagMutationTypes.RESET_TAG] (state: TagStateInterface) {
    state.tags = []
  },
  [TagMutationTypes.SET_TAGS] (state: TagStateInterface, payload: Tag[]) {
    state.tags = payload
  },
  [TagMutationTypes.REMOVE_TAG] (state: TagStateInterface, payload: string) {
    state.tags = state.tags.filter((tag) => tag.id !== payload)
  },
  [TagMutationTypes.UPDATE_TAG] (state: TagStateInterface, payload: Tag) {
    state.tags = state.tags.map(tag => {
      if (tag.id !== payload.id) return tag;
      return payload
    })
  }
};

export default mutation;
