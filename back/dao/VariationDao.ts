import { Variation } from '../entity/Variation';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';
import Dao from './Dao';

export default class VariationDao extends Dao<Variation> {

  constructor() {
    super(Variation)
  }

  async getVariationsByAttributInOrganization(attributId: number, organization: Organization): Promise<Variation[] | null> {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("variation")
      .leftJoinAndSelect("variation.attribut", "attribut")
      .where("variation.attributId = :attributId")
      .andWhere("(attribut.organization = :organization)")
      .setParameters({ attributId, organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Variation[]);
  }
  
  async getByIdWithAttributWithOrganization(id: string): Promise<Variation|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, {relations: ["attribut", "attribut.organization"]});
    if (!item) return null;
    return (item as unknown as Variation);
  }
}