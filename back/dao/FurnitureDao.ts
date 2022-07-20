import { Furniture } from '../entity/Furniture';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';

export default class FurnitureDao extends Dao<Furniture> {

  constructor() {
    super(Furniture)
  }

  async getByName(name: string):Promise<Furniture | null> {
    const item = await getConnection().getRepository(this.entity).findOne({ name });
    if (!item) return null;
    return (item as unknown as Furniture);
  }

  async getByOrganization(organization: Organization):Promise<Furniture[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as Furniture[]);
  }
}