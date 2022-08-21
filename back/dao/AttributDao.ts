import { Attribut } from '../entity/Attribut';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';
import Dao from './Dao';

export default class AttributDao extends Dao<Attribut> {

  constructor() {
    super(Attribut)
  }

  async getAttributsByOrganization(organization: Organization): Promise<Attribut[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as Attribut[]);
  }

  async getAttributsByOrganizationWithVariations(organization: Organization): Promise<Attribut[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization, relations: ["variations"] });
    if (!items) return null;
    return (items as unknown as Attribut[]);
  }
  
  async getByIdWithOrganization(id: string): Promise<Attribut|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, {relations: ["organization"]});
    if (!item) return null;
    return (item as unknown as Attribut);
  }
  
  async getByIdWithOrganizationWithVariations(id: string): Promise<Attribut|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, {relations: ["organization", "variations"]});
    if (!item) return null;
    return (item as unknown as Attribut);
  }
}