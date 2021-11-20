import { User } from "../entity/User";
import {getConnection} from "typeorm";
import Dao from "./Dao";

export default class UserDao extends Dao {

  constructor() {
    super(User)
  }
}