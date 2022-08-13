import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import { RequestCategory } from "../middleware/category";
import CategoryDao from "../dao/CategoryDao"
import FormCreateCategory from "../form/Category/FormCreateCategory";
import FormUpdateCategory from "../form/Category/FormUpdateCategory";
import { Category } from '../entity/Category';

export default class CategoryController {

  private static categoryDao: CategoryDao = new CategoryDao();

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;

    const categories = await CategoryController.categoryDao.getByOrganiaztion(user.organization)
    if (!categories) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      categories: categories,
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { 
      name: string;
      parentId? :number;
    });
    const form = new FormCreateCategory(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const category = new Category()
    category.organization = user.organization;
    category.name = body.name;
    
    if (body.parentId) {
      const parent = new Category();
      parent.id = body.parentId;
      category.parent = parent;
    }

    const createdCategory = await CategoryController.categoryDao.create(category);
    if (!createdCategory) {
      res.status(400).json({ message: "error"})
      return;
    }
    res.json({
      category: createdCategory
    })
  }

  public async update(req: RequestCategory, res: Response) {
    const category = req.category;

    const body = (req.body as unknown as { 
      name?: string;
      parentId? :number;
    });

    const form = new FormUpdateCategory(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    if (body.name) {
      category.name = body.name;
    }
    
    if (body.parentId) {
      const parent = new Category();
      parent.id = body.parentId;
      category.parent = parent;
    }

    const savedCategory = await CategoryController.categoryDao.update(category);
    if (!savedCategory) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      category: savedCategory,
    })
  }

  public async delete(req: RequestCategory, res: Response) {
    const category = req.category;
    if (category.hasChildren()) {
      res.status(400).json({message: "has children"})
      return;
    }

    const isDeletedCategory = await CategoryController.categoryDao.deleteById(category.id);
    if (!isDeletedCategory) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
}