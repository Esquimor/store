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

  async getWithOrganizationId(
    idOrganization: string|number
  ):Promise<Order[] | null> {

    const items = await getConnection().getRepository(this.entity)
      .find({
        where: {
          organizationId: idOrganization,
        }
      });
    return (items as unknown as Order[]);
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
        relations: [
          "items",
          "items.furnitureVersion",
          "items.furnitureVersion.furniture",
        ],
        where,
        take: defaultQuantity,
        skip: (defaultQuantity * defaultStart)
      });
    return ([items, count] as unknown as [Order[], number]);
  }

  async getByOrganization(
    organization: Organization,
    {
      search,
      status,
      start,
      quantity,
      created_by
    }: {
      search?: string; 
      status?: ORDER_STATUS | "all"; 
      start?: number; 
      quantity?: number;
      created_by?: string;
    } = {
      start: 0,
      quantity: 50
    }
  ):Promise<Order[] | null> {
    let where = {}

    if (isNotEmpty(search)) {
      where = {...where, name: Like(`%${search}%`)}
    }

    if (isNotEmpty(status) && status !== "all") {
      where = {...where, status}
    }

    if (isNotEmpty(created_by)) {
      where = {...where, creator: created_by}
    }

    const defaultQuantity = quantity || 50;
    const defaultStart = start || 0;

    const items = await getConnection().getRepository(this.entity)
      .find({
        organization,
        where,
        take: defaultQuantity,
        skip: (defaultQuantity * defaultStart)
      });
    return (items as unknown as Order[]);
  }

  async countByOrganization(
    organization: Organization,
    {
      status,
    }: {
      status?: ORDER_STATUS | "all"; 
    } = {
      status: "all"
    }
  ):Promise<number | null> {
    let where = {}
    if (isNotEmpty(status) && status !== "all") {
      where = {...where, status}
    }
    const items = await getConnection().getRepository(this.entity)
      .count({
        organization,
        where,
      });
    return (items as unknown as number);
  }

  async countByOrganizationId(
    organizationId: string | number,
    {
      status,
    }: {
      status?: ORDER_STATUS | "all"; 
    } = {
      status: "all"
    }
  ):Promise<number | null> {
    let where = {}
    if (isNotEmpty(status) && status !== "all") {
      where = {...where, status}
    }

    const items = await getConnection().getRepository(this.entity)
      .count({
        organizationId,
        where,
      });
    return (items as unknown as number);
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

  async getAllByIdAddress(idAddress: number|string):Promise<Order[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      addressId: idAddress
    });
    if (!items) return null;
    return (items as unknown as Order[]);
  }

  async getAllByIdPlacement(idPlacement: number|string):Promise<Order[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      placementId: idPlacement
    });
    if (!items) return null;
    return (items as unknown as Order[]);
  }

  async getAllByIdUser(idUser: number|string):Promise<Order[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      creatorId: idUser
    });
    if (!items) return null;
    return (items as unknown as Order[]);
  }
}