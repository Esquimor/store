import {getConnection, Like} from 'typeorm';
import Dao from './Dao';
import { Order } from '../entity/Order';
import { Organization } from '../entity/Organization';
import { ORDER_STATUS } from '../../commons/Interface/Order';
import { isNotEmpty } from '../../commons/Technical/Empty';

export default class OrderDao extends Dao<Order> {

  constructor() {
    super(Order)
  }

  async getByOrganizationWithItemsWithFurnitureVersionWithFurniture(
    organization: Organization,
    {
      search,
      status,
      start,
      quantity,
      created_by
    }: {
      search?: string; 
      status?: ORDER_STATUS; 
      start?: number; 
      quantity?: number;
      created_by?: string;
    } = {
      start: 0,
      quantity: 50
    }
  ):Promise<[Order[], number] | null> {
    let where = {}

    if (isNotEmpty(search)) {
      where = {...where, name: Like(`%${search}%`)}
    }

    if (isNotEmpty(status)) {
      where = {...where, status}
    }

    if (isNotEmpty(created_by)) {
      where = {...where, creator: created_by}
    }

    const defaultQuantity = quantity || 50;
    const defaultStart = start || 0;

    const [items, count] = await getConnection().getRepository(this.entity)
      .findAndCount({
        organization,
        relations: ["items", "items.furnitureVersion", "items.furnitureVersion.furniture"],
        where,
        take: defaultQuantity,
        skip: (defaultQuantity * defaultStart)
      });
    if (!items) return null;
    return ([items, count] as unknown as [Order[], number]);
  }
  
  async getByIdWithOrganizationAndCreatorAndItemsWithFurnitureVersionWithFurniture(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["items", "items.furnitureVersion", "items.furnitureVersion.furniture", "creator", "organization"]});
    if (!item) return null;
    return item;
  }

  async getCountedOrderByOrganizationAndByStatus(organization: Organization, status: ORDER_STATUS):Promise<number> {
    const count = await getConnection().getRepository(this.entity).count({organization, status });
    return count;
  }
}