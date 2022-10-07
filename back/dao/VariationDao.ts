import { Variation } from '../entity/Variation';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import Dao from './Dao';
import { Item } from '../entity/Item';

export default class VariationDao extends Dao<Variation> {

  constructor() {
    super(Variation)
  }

  async getVariationsInOrganization(organization: Organization): Promise<Variation[] | null> {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("variation")
      .leftJoinAndSelect("variation.attribut", "attribut")
      .andWhere("(attribut.organization = :organization)")
      .setParameters({ organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Variation[]);
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

  async getAllByIdFurnitureVersion(idFurnitureVersion: number|string):Promise<Variation[]|null> {
    // @ts-ignore Doesn't recognise right type
    const items = await getConnection().getRepository(FurnitureVersion).findOne({
      id: idFurnitureVersion,
      relations: ["variations"],
    });
    if (!items) return null;
    return (items.variations as unknown as Variation[]);
  }

  async getAllByIdItem(idItem: number|string):Promise<Variation[]|null> {
    // @ts-ignore Doesn't recognise right type
    const items = await getConnection().getRepository(Item).findOne({
      id: idItem,
      relations: ["variations"],
    });
    if (!items) return null;
    return (items.variations as unknown as Variation[]);
  }
}