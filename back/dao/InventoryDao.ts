import { Inventory } from '../entity/Inventory';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { User } from '../entity/User';
import { Organization } from '../entity/Organization';
import { isNotEmpty } from '../../commons/Technical/Empty';

export default class InventoryDao extends Dao<Inventory> {

  constructor() {
    super(Inventory)
  }
  
  async getByOrganization(organization: Organization) {
    const item = await getConnection().getRepository(this.entity).find({organization});
    if (!item) return null;
    return (item as unknown as Inventory);
  }
  
  async getByOrganizationId(idOrganization: string|number): Promise<Inventory|null> {
    const item = await getConnection().getRepository(this.entity).find({
      where: {
        organizationId: idOrganization,
      }
    });
    if (!item) return null;
    return (item as unknown as Inventory);
  }
  
  async getByIdWithOrganization(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization"]});
    if (!item) return null;
    return (item as unknown as Inventory);
  }

  async getByUserWithItemsWithFurnitureVersion(user: User):Promise<Inventory[] | null> {
    const items = await getConnection().getRepository(this.entity).find({
      user,
      relations: ["items", "items.furnitureVersion"]
    });
    if (!items) return null;
    return (items as unknown as Inventory[]);
  }

  async getByOrganizationWithItemsWithFurnitureVersion(
    organization: Organization,
    {
      userId,
      placementId,
      addressId
    } : {
      userId?: string,
      placementId?: string;
      addressId?: string;
    } = {}
  ):Promise<Inventory[] | null> {
    let where = {};

    if (isNotEmpty(userId)) {
      where = {...where, user: userId}
    }

    if (isNotEmpty(placementId)) {
      where = {...where, placement: placementId}
    }

    if (isNotEmpty(addressId)) {
      where = {...where, address: addressId}
    }

    try {
      const items = await getConnection().getRepository(this.entity).find({
        organization,
        relations: ["items", "items.furnitureVersion", 'address', 'placement', 'user'],
        where
      });
      if (!items) return null;
      return (items as unknown as Inventory[]);
    } catch {
      return null
    }
  }

  async countByOrganization(
    organization: Organization,
    {
      userId,
      placementId,
      addressId
    } : {
      userId?: string|number,
      placementId?: string|number;
      addressId?: string|number;
    } = {}
  ):Promise<number | null> {
    let where = {};

    if (isNotEmpty(userId)) {
      where = {...where, user: userId}
    }

    if (isNotEmpty(placementId)) {
      where = {...where, placement: placementId}
    }

    if (isNotEmpty(addressId)) {
      where = {...where, address: addressId}
    }

    try {
      const items = await getConnection().getRepository(this.entity).count({
        organization,
        where
      });
      return (items as unknown as number);
    } catch {
      return 0
    }
  }

  async getByIdAndByUser(furnitureVersionId: string|number, user: User): Promise<Inventory|null> {
    const item = await getConnection().getRepository(this.entity).findOne({ user, furnitureVersionId });
    if (!item) return null;
    return (item as unknown as Inventory);
  }

  async getAllByIdAddress(idAddress: number|string):Promise<Inventory[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      address: idAddress
    });
    if (!items) return null;
    return (items as unknown as Inventory[]);
  }
}