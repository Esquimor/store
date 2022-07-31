import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Order } from '../entity/Order';
import { Organization } from '../entity/Organization';

export default class OrderDao extends Dao<Order> {

  constructor() {
    super(Order)
  }

  async getByOrganizationWithItemsWithFurnitureVersionWithFurniture(organization: Organization):Promise<Order[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization, relations: ["items", "items.furnitureVersion", "items.furnitureVersion.furniture"] });
    if (!items) return null;
    return (items as unknown as Order[]);
  }
  
  async getByIdWithOrganizationAndCreatorAndItemsWithFurnitureVersionWithFurniture(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["items", "items.furnitureVersion", "items.furnitureVersion.furniture", "creator", "organization"]});
    if (!item) return null;
    return item;
  }
}