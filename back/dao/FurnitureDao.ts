import { Furniture } from '../entity/Furniture';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';
import { FurnitureVersion } from '../entity/FurnitureVersion';

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

  async getFurnituresByOrganizationWithLastestVersion(organization: Organization,{ start, quantity} = {start: 0, quantity: 50}):Promise<Furniture[] | null> {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("furniture")
      .leftJoinAndSelect("furniture.furnitureVersions", "furnitureVersion")
      .where("furniture.organization = :organizationId")
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("furVersion.id as id")
          .from(FurnitureVersion, "furVersion")
          .where("furVersion.furnitureId = furniture.id")
          .take(1)
          .orderBy("furVersion.created_at", "DESC")
          .getQuery()
        
        return "furnitureVersion.id = " + subQuery
      })
      .skip(start)
      .take(quantity)
      .setParameters({ organizationId: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Furniture[]);
  }
}