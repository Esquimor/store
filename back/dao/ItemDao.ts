import { Item } from '../entity/Item';
import Dao from './Dao';
import {getConnection} from 'typeorm';

export default class ItemDao extends Dao<Item> {

  constructor() {
    super(Item)
  }

  async getAllByIdOrder(idOrder: number|string):Promise<Item[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      order: idOrder
    });
    if (!items) return null;
    return (items as unknown as Item[]);
  }
  
  async getAllByIdFurnitureVersion(idFurnitureVersion: number|string):Promise<Item[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      furnitureVersion: idFurnitureVersion
    });
    if (!items) return null;
    return (items as unknown as Item[]);
  }
  
}