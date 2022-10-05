import { Item } from '../entity/Item';
import Dao from './Dao';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';

export default class ItemDao extends Dao<Item> {

  constructor() {
    super(Item)
  }

  async getInOrganization(organization: Organization):Promise<Item[]|null>  {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.furnitureVersion", "furnitureVersion")
      .andWhere("(furnitureVersion.organization = :organization)")
      .setParameters({ organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Item[]);
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
  
  async getAllByIdInventory(idInventory: number|string):Promise<Item[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      inventory: idInventory
    });
    if (!items) return null;
    return (items as unknown as Item[]);
  }
}