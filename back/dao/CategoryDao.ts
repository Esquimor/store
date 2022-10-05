import { Category } from '../entity/Category';
import {getConnection, IsNull} from 'typeorm';
import Dao from './Dao';
import { Organization } from '../entity/Organization';
import { Attribut } from '../entity/Attribut';

export default class CategoryDao extends Dao<Category> {

  constructor() {
    super(Category)
  }
  
  async getByOrganizationId(idOrganization: string|number): Promise<Category|null> {
    const item = await getConnection().getRepository(this.entity).find({
      where: {
        organizationId: idOrganization,
      }
    });
    if (!item) return null;
    return (item as unknown as Category);
  }
  
  async getByIdWithOrganizationAndWithChildren(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id, { relations: ["organization", "children"]});
    if (!item) return null;
    return (item as unknown as Category);
  }

  async getByOrganiaztion(organization: Organization) {
    const items = await getConnection().getRepository(this.entity).find({organization, relations: ["parent"]});
    if (!items) return null;
    return (items as unknown as Category[]);
  }

  async getByOrganiaztionInTree(organization: Organization) {
    const ancestor = await getConnection().getRepository(this.entity).findOne({organization,
      where: { 
        parent: IsNull()
      }});
    if (!ancestor) return null;
    const items = await getConnection().getTreeRepository(this.entity).findDescendantsTree(ancestor)
    if (!items) return null;
    // @ts-ignore
    return items
  }

  async getDescendantsUsingParentCategory(parentCategory: Category) {
    const descendants = await getConnection().getTreeRepository(this.entity).findDescendants(parentCategory)
    if (!descendants) return null;
    return (descendants as unknown as Category[]);
  }

  async getDescendantsUsingParentIdy(parentId: number|string) {
    const descendants = await getConnection().getTreeRepository(this.entity).findDescendants(parentId)
    if (!descendants) return null;
    return (descendants as unknown as Category[]);
  }

  async getAllByIdAttribut(idAttribut: number|string):Promise<Category[]|null> {
    // @ts-ignore Doesn't recognise right type
    const items = await getConnection().getRepository(Attribut).findOne({
      id: idAttribut,
      relations: ["categories"],
    });
    if (!items) return null;
    return (items.categories as unknown as Category[]);
  }
}