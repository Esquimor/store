import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormCreateFurniture from "../form/Furniture/FormCreateFurniture"
import FurnitureDao from "../dao/FurnitureDao"
import { Furniture } from '../entity/Furniture';
import OrderDao from '../dao/OrderDao';
import { Order } from '../entity/Order';

export default class FurnitureController {

  private static furnitureDao: FurnitureDao = new FurnitureDao();
  private static orderDao: OrderDao = new OrderDao();

  public async create(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { name?: string, description?: string, orderId: string});
    const form = new FormCreateFurniture(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const order = await FurnitureController.orderDao.getById(query.orderId) as Order;
    if (!order) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    const furniture = new Furniture();
    furniture.name = query.name;
    furniture.description = query.description;
    furniture.order = order;
    const userPatchSaved = await FurnitureController.furnitureDao.create(furniture);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ furniture })
  }
}