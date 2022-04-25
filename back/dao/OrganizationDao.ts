import { Organization } from '../entity/Organization';
import {getConnection} from 'typeorm';
import Dao from './Dao';

export default class OrganizationDao extends Dao<Organization> {

  constructor() {
    super(Organization)
  }
}