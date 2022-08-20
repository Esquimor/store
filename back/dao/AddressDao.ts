import { Address } from '../entity/Address';
import {getConnection} from 'typeorm';
import { Organization } from '../entity/Organization';
import Dao from './Dao';

export default class AddressDao extends Dao<Address> {

  constructor() {
    super(Address)
  }

  async getAddressesByOrganization(organization: Organization): Promise<Address[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as Address[]);
  }

  async getAddressesByOrganizationWithPlacements(organization: Organization): Promise<Address[] | null> {
    const items = await getConnection().getRepository(this.entity).find({ organization, relations: ["placements"] });
    if (!items) return null;
    return (items as unknown as Address[]);
  }
  
  async getByIdWithOrganization(id: string): Promise<Address|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, {relations: ["organization"]});
    if (!item) return null;
    return (item as unknown as Address);
  }
}