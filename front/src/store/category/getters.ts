import { Category, CategoryWithParent } from "app/../commons/Interface/Category";
import {
  getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel,
  getCategoryByUsingNameWithAncestorsAndChildrenFirstlevel,
  getFirstCategory,
} from "app/../commons/Technical/Category";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { CategoryStateInterface } from "./state";

const getters: GetterTree<CategoryStateInterface, StateInterface> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  categories: (state) => state.categories as unknown as CategoryWithParent[],
  categoriesTree: (state) => state.categoriesTree,
  // eslint-disable-next-line
  getFirstCategory: (_, getters: any) => getFirstCategory(getters.categories),
  // eslint-disable-next-line
  getCategoryById: (_, getters: any) => (id: string) => getters.categories.find((category: Category) => category.id === id),
  // eslint-disable-next-line
  getCategoryByName: (_, getters: any) => (name: string) => getters.categories.find((category: Category) => category.name === name),
  // eslint-disable-next-line
  getCategoryWithAncestorsAndChildrenUsingId: (_, getters: any) => (id: string) => 
    // eslint-disable-next-line
    getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel(id, getters.categories),
  // eslint-disable-next-line
  getCategoryWithAncestorsAndChildrenUsingName: (_, getters: any) => (name: string) => 
    // eslint-disable-next-line
    getCategoryByUsingNameWithAncestorsAndChildrenFirstlevel(name, getters.categories),
    // eslint-disable-next-line
  getCategoryWithAncestorsAndChildrenForSidebarFurnitureByUsingId: (_, getters: any) => (id: string) => {
    // eslint-disable-next-line
    const defaultCategory = getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel(id, getters.categories)

    if (!defaultCategory.category) {
      // eslint-disable-next-line
      return getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel(getters.getFirstCategory?.id, getters.categories)
    }
    return defaultCategory
  },
  // eslint-disable-next-line
  getCategoryWithAncestorsAndChildrenForSidebarFurnitureByUsingName: (_, getters: any) => (name: string) => {
    // eslint-disable-next-line
    const defaultCategory = getCategoryByUsingNameWithAncestorsAndChildrenFirstlevel(name, getters.categories)

    if (!defaultCategory.category) {
      // eslint-disable-next-line
      return getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel(getters.getFirstCategory?.id, getters.categories)
    }
    return defaultCategory
  }
};

export default getters;
