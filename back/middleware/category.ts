import CategoryDao from "../dao/CategoryDao";
import { Category } from "../entity/Category";
import { RequestAuth } from "./auth"

export interface RequestCategory extends RequestAuth {
  category: Category;
}

export const categoryAccessById = async (req: RequestCategory, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const categoryDao: CategoryDao = new CategoryDao();
  

  const category = await categoryDao.getByIdWithOrganizationAndWithChildren(params.id) as Category;
  if (!category) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (category.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.category = category;
  next();
  return
}