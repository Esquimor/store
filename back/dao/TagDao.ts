import { Tag } from '../entity/Tag';
import Dao from './Dao';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';
import { FurnitureVersion } from '../entity/FurnitureVersion';

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

  async getAllByIdFurnitureVersion(idFurnitureVersion: number|string):Promise<Tag[]|null> {
    // @ts-ignore Doesn't recognise right type
    const items = await getConnection().getRepository(FurnitureVersion).findOne({
      id: idFurnitureVersion,
      relations: ["tags"],
    });
    if (!items) return null;
    return (items.tags as unknown as Tag[]);
  }
}