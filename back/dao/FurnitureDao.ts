import { Furniture } from '../entity/Furniture';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import { isNotEmpty } from "../../commons/Technical/Empty"

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

  async getByOrganizationId(idOrganization: string|number):Promise<Furniture[] | null> {
    const items = await getConnection().getRepository(this.entity).find({
      where: {
        organizationId: idOrganization,
      }
    });
    if (!items) return null;
    return (items as unknown as Furniture[]);
  }

  async getFurnituresByOrganizationWithLastestVersion(
    organization: Organization,
    { start, quantity, search, categories }: {start?: number; quantity?: number; search?: string; categories?: number[] } = {start: 0, quantity: 50, search: ""}
  ):Promise<[Furniture[], number] | null> {
    const [items, itemsCount] = await getConnection().getRepository(this.entity)
      .createQueryBuilder("furniture")
      .leftJoinAndSelect("furniture.furnitureVersions", "furnitureVersion")
      .where("furniture.organization = :organizationId")
      .andWhere((qb) => {
        let subQuery = qb
          .subQuery()
          .select("furVersion.id as id")
          .from(FurnitureVersion, "furVersion")
          .where("furVersion.furnitureId = furniture.id")
          .take(1)
          .orderBy("furVersion.created_at", "DESC")
        
        if (isNotEmpty(search)) {
          subQuery = subQuery.andWhere("LOWER(furVersion.name) LIKE LOWER(:search)", { search: `%${ search.toLowerCase() }%` })
        }

        if (isNotEmpty(categories)) {
          subQuery = subQuery.andWhere("furVersion.category IN (:...categories)", { categories })
        }
        
        return "furnitureVersion.id = " + subQuery.getQuery()
      })
      .skip(start)
      .take(quantity)
      .setParameters({ organizationId: organization.id })
      .getManyAndCount()

    if (!items) return null;
    return ([items, itemsCount] as unknown as [Furniture[], number]);
  }
}