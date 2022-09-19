import { CategoryWithParent, CategoryTree } from "../../../../commons/Interface/Category";

export interface CategoryStateInterface {
  categories: CategoryWithParent[],
  categoriesTree: CategoryTree | null,
}

function state(): CategoryStateInterface {
  return {
    categories: [],
    categoriesTree: null,
  }
};

export default state;
