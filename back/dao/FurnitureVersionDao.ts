import { Attribut } from '../entity/Attribut';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import { Organization } from '../entity/Organization';

export default class FurnitureVersionDao extends Dao<FurnitureVersion> {

  constructor() {
    super(FurnitureVersion)
  }

  async getInOrganization(organization: Organization):Promise<FurnitureVersion[]|null>  {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("furnitureVersion")
      .leftJoinAndSelect("furnitureVersion.user", "user")
      .andWhere("(user.organization = :organization)")
      .setParameters({ organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as FurnitureVersion[]);
  }

  async getAllByIdAttribut(idAttribut: number|string):Promise<FurnitureVersion[]|null> {
    // @ts-ignore Doesn't recognise right type
    const item = await getConnection().getRepository(Attribut).findOne({
      id: idAttribut,
      relations: ["furnitureVersions"],
    });
    if (!item) return null;
    return (item.furnitureVersions as unknown as FurnitureVersion[]);
  }
  
  async getAllByIdCategory(idCategory: number|string):Promise<FurnitureVersion[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      categoryId: idCategory
    });
    if (!items) return null;
    return (items as unknown as FurnitureVersion[]);
  }
  
  async getAllByIdFurniture(idFurniture: number|string):Promise<FurnitureVersion[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      furniture: idFurniture
    });
    if (!items) return null;
    return (items as unknown as FurnitureVersion[]);
  }
  
}