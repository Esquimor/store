import { Attribut } from '../entity/Attribut';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { FurnitureVersion } from '../entity/FurnitureVersion';
import { Variation } from '../entity/Variation';
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

  async getLastFurnitureVersionByIdFurniture(
    furnitureId: string | number
  ): Promise<FurnitureVersion|null> {
    const item = await getConnection().getRepository(this.entity)
      .createQueryBuilder("furnitureVersion")
      .where("furnitureVersion.furnitureId = :furnitureId")
      .orderBy("furnitureVersion.created_at", "DESC")
      .setParameters({ furnitureId })
      .getOne();
    if (!item) return null;
    return (item as unknown as FurnitureVersion);
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
      furnitureId: idFurniture
    });
    if (!items) return null;
    return (items as unknown as FurnitureVersion[]);
  }
  
  async getAllByIdUser(idUser: number|string):Promise<FurnitureVersion[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      user: idUser
    });
    if (!items) return null;
    return (items as unknown as FurnitureVersion[]);
  }
  
  async getAllByIdVariation(idVariation: number|string):Promise<FurnitureVersion[]|null> {
    // @ts-ignore Doesn't recognise right type
    const items = await getConnection().getRepository(Variation).findOne({
      id: idVariation,
      relations: ["furnitureVersions"],
    });
    if (!items) return null;
    return (items.furnitureVersions as unknown as FurnitureVersion[]);
  }
}