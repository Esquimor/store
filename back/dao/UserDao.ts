import { User } from '../entity/User';
import {getConnection} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';
import { USER_STATUS } from '../../commons/Interface/User';

export default class UserDao extends Dao<User> {

  constructor() {
    super(User)
  }

  async getByEmail(email: string):Promise<User>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ email });
    if (!item) return null;
    return (item as unknown as User);
  }

  async getByEmailAndCode(email: string, code: string):Promise<User>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ email, code });
    if (!item) return null;
    return (item as unknown as User);
  }

  async getUserRegisteredWithOrganizationByEmail(email: string):Promise<User>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ email, status: USER_STATUS.REGISTERED }, { relations: ["organization"] });
    if (!item) return null;
    return (item as unknown as User);
  }

  async getWithOrganizationByEmail(email: string):Promise<User>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ email }, { relations: ["organization"] });
    if (!item) return null;
    return (item as unknown as User);
  }
  
  async getWithOrganizationById(id: string|number) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization"] });
    if (!item) return null;
    return item;
  }

  async getUsersInOrganization(organization: Organization) {
    const items = await getConnection().getRepository(this.entity).find({ organization });
    if (!items) return null;
    return (items as unknown as User);
  }

  async getUsersInOrganizationByOrganizationId(idOrganization: string|number) {
    const items = await getConnection().getRepository(this.entity).find({ organization: idOrganization });
    if (!items) return null;
    return (items as unknown as User);
  }
}