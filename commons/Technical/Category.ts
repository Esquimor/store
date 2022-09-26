import { CategoryWithParent } from "../Interface/Category";

export const getFirstCategory = (categories: CategoryWithParent[]) => {
  return categories.find(c => !c.parent)
}

const getCategoryFromCategoriesByUsingName = (categoryName: string, categories: CategoryWithParent[]) => {
  return categories.find(cat => cat.name === categoryName)
}

const getCategoryFromCategoriesById = (categoryId: string, categories: CategoryWithParent[]) => {
  return categories.find(cat => cat.id === categoryId)
}

const getCategoryChildrenFirstLevelByUsingCategoryId = (categoryId: string, categories: CategoryWithParent[]) => {
  return categories.filter(cat => cat.parent?.id === categoryId)
}
const getCategoryAncestors = (category: CategoryWithParent, categories: CategoryWithParent[]) => {
  let ancestors: CategoryWithParent[] = [];
  let currentAncestor: CategoryWithParent | null = category;

  while(currentAncestor?.parent) {
    currentAncestor = getCategoryFromCategoriesById(currentAncestor.parent?.id, categories) || null;
    if (currentAncestor) {
      ancestors = [...ancestors, currentAncestor];
    }
  }
  return ancestors;
}

export const getCategoryByUsingIdWithAncestorsAndChildrenFirstlevel = (categoryId: string, categories: CategoryWithParent[]) => {
  const category = getCategoryFromCategoriesById(categoryId, categories);

  return {
    category: category ? category : null,
    ancestors: category ? getCategoryAncestors(category, categories).reverse() : [],
    children: getCategoryChildrenFirstLevelByUsingCategoryId(categoryId, categories)
  }
}

export const getCategoryByUsingNameWithAncestorsAndChildrenFirstlevel = (categoryName: string, categories: CategoryWithParent[]) => {
  const category = getCategoryFromCategoriesByUsingName(categoryName, categories);

  return {
    category: category ? category : null,
    ancestors: category ? getCategoryAncestors(category, categories) : [],
    children: category ? getCategoryChildrenFirstLevelByUsingCategoryId(category?.id, categories) : []
  }
}