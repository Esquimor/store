import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormCreateFurniture from "../form/Furniture/FormCreateFurniture"
import FurnitureDao from "../dao/FurnitureDao"
import { Furniture } from '../entity/Furniture';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import FormGetFurnitures from "../form/Furniture/FormGetFurnitures";
export default class FurnitureController {

  private static furnitureDao: FurnitureDao = new FurnitureDao();

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
    const query = (req.query as unknown as {
      search?: string; 
      start?: number;
      quantity?: number;
      category?: string;
    });
    const form = new FormGetFurnitures(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const [furnitures, count] = await FurnitureController.furnitureDao.getFurnituresByOrganizationWithLastestVersion(user.organization, query);
    if (!furnitures) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ furnitures, count })
  }
}