export interface CategoryTree extends Category {
  children?: CategoryTree[] // type for a known property.
}

export interface Category extends CategoryDefault {
  id: string;
}

export interface CategoryDefault {
  name: string;
}