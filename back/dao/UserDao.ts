import { User } from '../entity/User';
import {getConnection} from 'typeorm';
import Dao from './Dao';

export default class UserDao extends Dao {

  constructor() {
    super(User)
  }

  async getByEmail(email: string):Promise<User>|null {
    const item = await getConnection().getRepository(this.entity).findOne({ email });
    if (!item) return null;
    return (item as unknown as User);
  }

  async createUser(user: User) {
    const newUser = getConnection().getRepository(this.entity).save(user);
    if (!newUser) return null;
    return newUser;
  }
}