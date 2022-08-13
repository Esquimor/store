import { Inventory } from '../entity/Inventory';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { User } from '../entity/User';

export default class InventoryDao extends Dao<Inventory> {

  constructor() {
    super(Inventory)
  }
  
  async getByIdWithOrganization(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization"]});
    if (!item) return null;
    return (item as unknown as Inventory);
  }

  async getByUserWithItemsWithFurnitureVersion(user: User):Promise<Inventory[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ user, relations: ["items", "items.furnitureVersion"] });
    if (!items) return null;
    return (items as unknown as Inventory[]);
  }

  async getByIdAndByUser(furnitureVersionId: string|number, user: User): Promise<Inventory|null> {
    const item = await getConnection().getRepository(this.entity).findOne({ user, furnitureVersionId });
    if (!item) return null;
    return (item as unknown as Inventory);
  }
}