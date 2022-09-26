import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import { RequestInventory } from "../middleware/inventory";
import InventoryDao from "../dao/InventoryDao"
import FormCreateInventory from "../form/Inventory/FormCreateInventory";
import FormUpdateInventory from "../form/Inventory/FormUpdateInventory";
import FormGetInventories from "../form/Inventory/FormGetInventories";
import { Inventory } from '../entity/Inventory';
import { Tag } from '../entity/Tag';
import { Item } from '../entity/Item';
import { Address } from '../entity/Address';
import { Placement } from '../entity/Placement';
import { User } from '../entity/User';

export default class InventoryController {

  private static inventoryDao: InventoryDao = new InventoryDao();

  public async get(req: RequestAuth, res: Response) {
    interface Query {
      userId?: string;
      placementId?: string;
      addressId?: string
    }

    const query = (req.query as unknown as Query);
    const form = new FormGetInventories(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const inventories = await InventoryController.inventoryDao.
      getByOrganizationWithItemsWithFurnitureVersion(
        user.organization,
        query
      )
    if (!inventories) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      inventories: inventories.map(inventory => inventory.inventoryForResponse()),
    })
  }

  public async getMe(req: RequestAuth, res: Response) {
    interface Query {
      user?: boolean;
      placement?: boolean;
      address?: boolean
    }

    const query = req.query as unknown as Query;
    const form = new FormGetInventories(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    let options = {};
  
    if (query.user) {
      options = {
        ...options,
        userId: user.id
      }
    }
  
    if (query.placement) {
      options = {
        ...options,
        placementId: user?.placement?.id || ""
      }
    }
  
    if (query.address) {
      options = {
        ...options,
        addressId: user?.address?.id || ""
      }
    }

    const inventories = await InventoryController.inventoryDao.
      getByOrganizationWithItemsWithFurnitureVersion(
        user.organization,
        options
      )
    if (!inventories) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      inventories: inventories.map(inventory => inventory.inventoryForResponse()),
    })
  }

  public async getInventoriesCounted(req: RequestAuth, res: Response) {
    const user = req.user;

    const countOrganization = await InventoryController.inventoryDao.countByOrganization(user.organization)
    if (countOrganization === null) {
      res.status(400).json({ message: "error org"})
      return;
    }

    const countAddress = await InventoryController.inventoryDao.countByOrganization(user.organization, {
      addressId: user.address?.id || "-1"
    })
    if (countAddress === null) {
      res.status(400).json({ message: "error address"})
      return;
    }

    const countPlacement = await InventoryController.inventoryDao.countByOrganization(user.organization, {
      placementId: user.placement?.id || "-1"
    })
    if (countPlacement === null) {
      res.status(400).json({ message: "error placement"})
      return;
    }

    const countUser = await InventoryController.inventoryDao.countByOrganization(user.organization, {
      userId: user.id
    })
    if (countUser === null) {
      res.status(400).json({ message: "error user"})
      return;
    }

    res.json({
      count: {
        organization: countOrganization,
        address: countAddress,
        placement: countPlacement,
        user: countUser
      },
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { 
      name: string;
      userId? :number;
      tagsId?: (number)[];
      itemsId?: (number)[];
      addressId?: number;
      placementId?: number;
    });
    const form = new FormCreateInventory(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const inventory = new Inventory()
    inventory.organization = user.organization;
    inventory.name = body.name;
    
    if (body.userId) {
      const user = new User();
      user.id = body.userId;
      inventory.user = user;
    }

    if (body.tagsId) {
      body.tagsId.forEach((tagId) => {
        const tag = new Tag();
        tag.id = tagId;
        inventory.addTag(tag)
      })
    }

    if (body.itemsId) {
      body.itemsId.forEach((itemId) => {
        const item = new Item();
        item.id = itemId;
        inventory.addItem(item)
      })
    }

    if (body.addressId) {
      const address = new Address();
      address.id = body.addressId;
      inventory.address = address;
    }

    if (body.placementId) {
      const placement = new Placement();
      placement.id = body.placementId;
      inventory.placement = placement;
    }

    const createdInventory = await InventoryController.inventoryDao.create(inventory);
    if (!createdInventory) {
      res.status(400).json({ message: "error"})
      return;
    }
    res.json({
      inventory: createdInventory.inventoryForResponse(),
    })
  }

  public async update(req: RequestInventory, res: Response) {
    const body = (req.body as unknown as { 
      name: string;
      userId? :number;
      tagsId?: (number)[];
      itemsId?: (number)[];
      addressId?: number;
      placementId?: number;
    });

    const form = new FormUpdateInventory(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const inventory = req.inventory;

    if (body.name) {
      inventory.name = body.name;
    }
    
    if (body.userId) {
      const user = new User();
      user.id = body.userId;
      inventory.user = user;
    }

    if (body.tagsId) {
      body.tagsId.forEach((tagId) => {
        const tag = new Tag();
        tag.id = tagId;
        inventory.addTag(tag)
      })
    }

    if (body.itemsId) {
      body.itemsId.forEach((itemId) => {
        const item = new Item();
        item.id = itemId;
        inventory.addItem(item)
      })
    }

    if (body.addressId) {
      const address = new Address();
      address.id = body.addressId;
      inventory.address = address;
    }

    if (body.placementId) {
      const placement = new Placement();
      placement.id = body.placementId;
      inventory.placement = placement;
    }

    const savedInventory = await InventoryController.inventoryDao.update(inventory);
    if (!savedInventory) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      inventory: savedInventory.inventoryForResponse(),
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