import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import { RequestInventory } from "../middleware/inventory";
import InventoryDao from "../dao/InventoryDao"
import FormCreateInventory from "../form/Inventory/FormCreateInventory";
import FormUpdateInventory from "../form/Inventory/FormUpdateInventory";
import { Inventory } from '../entity/Inventory';

export default class InventoryController {

  private static inventoryDao: InventoryDao = new InventoryDao();

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;

    const inventories = await InventoryController.inventoryDao.getByUserWithFurnitureVersion(user)
    if (!inventories) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      inventories: inventories.map(inventory => inventory.inventoryForResponseWithFurnitureVersion()),
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { furnitureVersionId: string|number, quantity: number;});
    const form = new FormCreateInventory(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const inventory = new Inventory()
    inventory.user = user;

    const createdInventory = await InventoryController.inventoryDao.create(inventory);
    if (!createdInventory) {
      res.status(400).json({ message: "error"})
      return;
    }
    res.json({
      inventory: createdInventory.inventoryForResponseWithFurnitureVersion(),
    })
  }

  public async update(req: RequestInventory, res: Response) {
    const body = (req.body as unknown as { quantity: number });

    const form = new FormUpdateInventory(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const inventory = req.inventory;

    const savedInventory = await InventoryController.inventoryDao.update(inventory);
    if (!savedInventory) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      inventory: savedInventory.inventoryForResponseWithFurnitureVersion(),
    })
  }

  public async delete(req: RequestInventory, res: Response) {
    const inventory = req.inventory;
    const isDeletedInventory = await InventoryController.inventoryDao.deleteById(inventory.id);
    if (!isDeletedInventory) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
}