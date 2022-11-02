import { Media } from '../entity/Media';
import Dao from './Dao';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';

export default class MediaDao extends Dao<Media> {

  constructor() {
    super(Media)
  }

  async getByOrganization(organization: Organization):Promise<Media[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as Media[]);
  }
  
  async getAllByIdFurnitureVersion(idFurnitureVersion: number|string):Promise<Media[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      furnitureVersionId: idFurnitureVersion
    });
    if (!items) return null;
    return (items as unknown as Media[]);
  }
}