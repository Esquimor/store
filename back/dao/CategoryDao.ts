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

  async getFirstCategoryOfAnOrganization(organization): Promise<Category|null> {
    const item = await getConnection().getRepository(this.entity).findOne({
      organization,
      parentId: IsNull()
    });
    if (!item) return null;
    return (item as unknown as Category);
  }
  
  async getByCategoryIdAndOrganization(idCategory: string|number, organization: Organization): Promise<Category|null> {
    const item = await getConnection().getRepository(this.entity).findOne({
      id: idCategory,
      organization,
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
    const items = await getConnection().getRepository(this.entity).find({organization});
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
  
  async getChildrenUsingCategory(parentCategory: Category) {
    const descendants = await getConnection().getRepository(this.entity).find({
      parent: parentCategory
    })
    if (!descendants) return null;
    return (descendants as unknown as Category[]);
  }

  async getDescendantsUsingCategory(parentCategory: Category, options: {filterCurrentCategory: boolean} = {filterCurrentCategory: false}): Promise<Category[]|null> {
    const descendants = await getConnection().getTreeRepository(this.entity).findDescendants(parentCategory) as unknown as Category[]
    if (!descendants) return null;
    if (options.filterCurrentCategory) {
      return descendants.filter(d => d.id !== parentCategory.id);
    }
    return descendants;
  }

  async getAncestorsUsingCategory(category: Category) {
    let ancestors:Category[] = [];
    let currentCategory = category;
    while(currentCategory.parentId !== null) {
      const categoryParent = await getConnection().getRepository(this.entity).findOne(currentCategory.parentId) as unknown as Category;
      ancestors = [...ancestors, categoryParent];
      currentCategory = categoryParent
    }
    return ancestors;
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