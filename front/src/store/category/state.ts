import { Category, CategoryTree } from "../../../../commons/Interface/Category";

export interface CategoryStateInterface {
  categories: Category[],
  categoriesTree: CategoryTree | null,
}

function state(): CategoryStateInterface {
  return {
    categories: [],
    categoriesTree: null
  }
};

export default state;
