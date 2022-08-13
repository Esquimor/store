import { Category } from '../entity/Category';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';

export default class CategoryDao extends Dao<Category> {

  constructor() {
    super(Category)
  }
  
  async getByIdWithOrganizationAndWithChildren(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization", "children"]});
    if (!item) return null;
    return (item as unknown as Category);
  }

  async getByOrganiaztion(organization: Organization) {
    const items = await getConnection().getRepository(this.entity).find({organization});
    if (!items) return null;
    return (items as unknown as Category[]);
  }
  
}