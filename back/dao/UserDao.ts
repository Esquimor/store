import { User } from "../entity/User";
import {getConnection} from "typeorm";

export default class UserDao {

  static getAll() {
    const users = getConnection().getRepository(User).find();
    if (!users) return null;
    return users;
  }
}