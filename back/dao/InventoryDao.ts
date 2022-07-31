import { Inventory } from '../entity/Inventory';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { User } from '../entity/User';

export default class InventoryDao extends Dao<Inventory> {

  constructor() {
    super(Inventory)
  }

  async getByUser(user: User):Promise<Inventory[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ user });
    if (!items) return null;
    return (items as unknown as Inventory[]);
  }
}