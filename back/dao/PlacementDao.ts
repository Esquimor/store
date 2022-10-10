import { Organization } from '../entity/Organization';
import { Placement } from '../entity/Placement';
import Dao from './Dao';
import {getConnection} from 'typeorm';

export default class PlacementDao extends Dao<Placement> {

  constructor() {
    super(Placement)
  }

  async getPlacementByAddressIdInOrganization(
    addressId: string|number,
    organization: Organization
  ): Promise<Placement[] | null> {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("placement")
      .leftJoinAndSelect("placement.address", "address")
      .where("placement.addressId = :addressId")
      .andWhere("(address.organization = :organization)")
      .setParameters({ addressId, organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Placement[]);
  }

  async getPlacementInOrganization(
    organization: Organization
  ): Promise<Placement[] | null> {
    const items = await getConnection().getRepository(this.entity)
      .createQueryBuilder("placement")
      .leftJoinAndSelect("placement.address", "address")
      .andWhere("(address.organization = :organization)")
      .setParameters({ organization: organization.id })
      .getMany()
    if (!items) return null;
    return (items as unknown as Placement[]);
  }

  async getByIdWithAddressWithOrganization(id): Promise<Placement|null> {
    const item = await getConnection().getRepository(this.entity).findOne(id, {relations: ["address", "address.organization"]});
    if (!item) return null;
    return (item as unknown as Placement);
  }

  async getAllByIdAddress(idAddress: number|string):Promise<Placement[]|null> {
    const items = await getConnection().getRepository(this.entity).find({
      addressId: idAddress
    });
    if (!items) return null;
    return (items as unknown as Placement[]);
  }
}