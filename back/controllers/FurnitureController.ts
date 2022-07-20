import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormCreateFurniture from "../form/Furniture/FormCreateFurniture"
import FurnitureDao from "../dao/FurnitureDao"
import { Furniture } from '../entity/Furniture';

export default class FurnitureController {

  private static furnitureDao: FurnitureDao = new FurnitureDao();

  public async create(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { name?: string, description?: string});
    const form = new FormCreateFurniture(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const user = req.user;
    const furniture = new Furniture();
    furniture.name = query.name;
    furniture.description = query.description;
    furniture.user = user;
    furniture.organization = user.organization
    const userPatchSaved = await FurnitureController.furnitureDao.create(furniture);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ furniture })
  }

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;
    const furnitures = await FurnitureController.furnitureDao.getByOrganization(user.organization);
    if (!furnitures) {
      res.status(400).json({message: 'furnitures not found'});
      return;
    }
    res.json({furnitures})
  }
}