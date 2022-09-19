import { CategoryWithParent, CategoryTree } from "app/../commons/Interface/Category";
import { MutationTree } from "vuex";
import { CategoryMutationTypes } from "./mutation-types";
import { CategoryStateInterface } from "./state";

const mutation: MutationTree<CategoryStateInterface> = {
  [CategoryMutationTypes.ADD_CATEGORY] (state: CategoryStateInterface, payload: CategoryWithParent) {
    state.categories = [...state.categories, payload];
  },
  [CategoryMutationTypes.RESET_CATEGORY] (state: CategoryStateInterface) {
    state.categories = []
    state.categoriesTree = null
  },
  [CategoryMutationTypes.SET_CATEGORIES] (state: CategoryStateInterface, payload: CategoryWithParent[]) {
    state.categories = payload
  },
  [CategoryMutationTypes.REMOVE_CATEGORY] (state: CategoryStateInterface, payload: string) {
    state.categories = state.categories.filter((category: CategoryWithParent) => category.id !== payload)
  },
  [CategoryMutationTypes.UPDATE_CATEGORY] (state: CategoryStateInterface, payload: CategoryWithParent) {
    state.categories = state.categories.map((category: CategoryWithParent) => {
      if (category.id !== payload.id) return category;
      return payload
    })
  },
  [CategoryMutationTypes.SET_CATEGORIES_TREE] (state: CategoryStateInterface, payload: CategoryTree) {
    state.categoriesTree = payload
  },
};

export default mutation;
