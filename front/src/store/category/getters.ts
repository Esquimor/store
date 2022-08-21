import { Category } from "app/../commons/Interface/Category";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { CategoryStateInterface } from "./state";

const getters: GetterTree<CategoryStateInterface, StateInterface> = {
  categories: (state) => state.categories,
  categoriesTree: (state) => state.categoriesTree,
  // eslint-disable-next-line
  getCategoryById: (_, getters: any) => (id: string) => getters.categories.find((address: Category) => address.id === id),
};

export default getters;
