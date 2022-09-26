import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormCreateFurniture from "../form/Furniture/FormCreateFurniture"
import FurnitureDao from "../dao/FurnitureDao"
import CategoryDao from "../dao/CategoryDao"
import { Furniture } from '../entity/Furniture';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import FormGetFurnitures from "../form/Furniture/FormGetFurnitures";
import { Search, Pagination } from "../../commons/Interface/Filter";
export default class FurnitureController {

  private static furnitureDao: FurnitureDao = new FurnitureDao();
  private static categoryDao: CategoryDao = new CategoryDao();

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { name?: string, description?: string});
    const form = new FormCreateFurniture(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const user = req.user;

    const furniture = new Furniture();
    furniture.organization = user.organization;

    const furnitureVersion = new FurnitureVersion()
    furnitureVersion.name = body.name;
    furnitureVersion.description = body.description;
    furnitureVersion.user = user;

    furniture.addFurnitureVersion(furnitureVersion)

    const userPatchSaved = await FurnitureController.furnitureDao.create(furniture);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ furniture: furniture.furnitureForResponseWithFurnitureVersion() })
  }

  public async get(req: RequestAuth, res: Response) {
    interface Query extends Search, Pagination {
      category?: string;
    }

    const query = (req.query as unknown as Query);
    const form = new FormGetFurnitures(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    let categoriesDescendantIds:number[] = []

    if (query.category) {
      const category = await FurnitureController.categoryDao.getById(query.category);
      const categoriesDescendants = await FurnitureController.categoryDao.getDescendantsUsingParentCategory(category);
      categoriesDescendantIds = categoriesDescendants.map(({ id }) => id)
    }

    const [furnitures, count] = await FurnitureController.furnitureDao.getFurnituresByOrganizationWithLastestVersion(
      user.organization,
      {
        ...query,
        categories: categoriesDescendantIds
      }
    );
    if (!furnitures) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ furnitures, count })
  }
}