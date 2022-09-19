export interface CategoryTree extends Category {
  children?: CategoryTree[] // type for a known property.
}

export interface CategoryWithParent extends Category {
  parent: Category | null;
}

export interface Category extends CategoryDefault {
  id: string;
}

export interface CategoryDefault {
  name: string;
}