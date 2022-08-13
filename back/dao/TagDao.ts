import { Tag } from '../entity/Tag';
import Dao from './Dao';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';

export default class TagDao extends Dao<Tag> {

  constructor() {
    super(Tag)
  }

  async getByIdWithOrganization(id: string): Promise<Tag|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization"]});
    if (!item) return null;
    return (item as unknown as Tag);
  }

  async getAllByOrganization(organization: Organization): Promise<Tag[]|null> {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as Tag[]);
  }
}