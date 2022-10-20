import { Furniture } from '../entity/Furniture';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import { isNotEmpty } from "../../commons/Technical/Empty"
import CategoryDao from './CategoryDao';
import { Category } from '../entity/Category';

const categoryDao: CategoryDao = new CategoryDao();
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
    { start, quantity, search, category }: {start?: number; quantity?: number; search?: string; category?: number } = {start: 0, quantity: 50, search: ""}
  ):Promise<Furniture[] | null> {

    let categories:Category[] = [];
    if (category) {
      const categoryObject = await categoryDao.getById(category);
      if (categoryObject) 
        categories = await categoryDao.getDescendantsUsingCategory(categoryObject) || [];
    }

    const items = await getConnection().getRepository(this.entity)
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
          subQuery = subQuery.andWhere("furVersion.categoryId IN (:...categories)", { categories: categories.map(c => c.id) })
        }
        
        return "furnitureVersion.id = " + subQuery.getQuery()
      })
      .skip(start)
      .take(quantity)
      .setParameters({ organizationId: organization.id })
      .getMany()

    if (!items) return null;
    return (items as unknown as Furniture[]);
  }
}