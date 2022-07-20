import { Organization } from '../entity/Organization';
import {getConnection} from 'typeorm';
import Dao from './Dao';

export default class OrganizationDao extends Dao<Organization> {

  constructor() {
    super(Organization)
  }

  async getByName(name: string):Promise<Organization>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ name });
    if (!item) return null;
    return (item as unknown as Organization);
  }
}