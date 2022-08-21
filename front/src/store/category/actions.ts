import { Category, CategoryTree } from "app/../commons/Interface/Category";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { CategoryActionTypes } from "./action-types";
import { CategoryMutationTypes } from "./mutation-types";
import { CategoryStateInterface } from "./state";

const actions: ActionTree<CategoryStateInterface, StateInterface> = {
  [CategoryActionTypes.RESET_CATEGORY]({ commit }) {
    commit(CategoryMutationTypes.RESET_CATEGORY)
  },
  [CategoryActionTypes.ADD_CATEGORY]({ commit }, category: Category) {
    commit(CategoryMutationTypes.ADD_CATEGORY, category)
  },
  [CategoryActionTypes.SET_CATEGORIES]({ commit }, categories: Category[]) {
    commit(CategoryMutationTypes.SET_CATEGORIES, categories)
  },
  [CategoryActionTypes.REMOVE_CATEGORY]({ commit }, categoryId: string) {
    commit(CategoryMutationTypes.REMOVE_CATEGORY, categoryId)
  },
  [CategoryActionTypes.UPDATE_CATEGORY]({ commit }, category: Category) {
    commit(CategoryMutationTypes.UPDATE_CATEGORY, category)
  },
  [CategoryActionTypes.SET_CATEGORIES_TREE]({ commit }, category: CategoryTree) {
    commit(CategoryMutationTypes.SET_CATEGORIES_TREE, category)
  }
};

export default actions;
