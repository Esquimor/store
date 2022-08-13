import InventoryDao from "../dao/InventoryDao";
import { Inventory } from "../entity/Inventory";
import { RequestAuth } from "./auth"

export interface RequestInventory extends RequestAuth {
  inventory: Inventory;
}

export const inventoryAccessById = async (req: RequestInventory, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const inventoryDao: InventoryDao = new InventoryDao();
  

  const inventory = await inventoryDao.getByIdWithOrganization(params.id) as Inventory;
  if (!inventory) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (inventory.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.inventory = inventory;
  next();
  return
}