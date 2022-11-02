import { GraphQLError } from "graphql";
import { ERROR } from "../../commons/Const/Error";
import AttributDao from "../dao/AttributDao";
import CategoryDao from "../dao/CategoryDao";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import { Category } from "../entity/Category";

const categoryDao: CategoryDao = new CategoryDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const attributDao: AttributDao = new AttributDao();

export default  {
  Category: {
    id: (parent: Category) => parent.id,
    name: (parent: Category) => parent.name,
    children: async (parent: Category) => {
      const children = await categoryDao.getChildrenUsingCategory(parent)
      return children
    },
    descendants: async (parent: Category) => {
      const children = await categoryDao.getDescendantsUsingCategory(parent, {filterCurrentCategory: true})
      return children
    },
    ancestors: async (parent: Category) => {
      const ancestors = await categoryDao.getAncestorsUsingCategory(parent)
      return ancestors
    },
    parent: async (parent: Category) => {
      if (!parent.parentId) return null;
      const category = await categoryDao.getById(parent.parentId)
      return category
    },
    organization: async (parent: Category) => {
      if (!parent.organizationId) return null
      const organization = await organizationDao.getById(parent.organizationId)
      if (!organization) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
    furnitureVersions: async (parent: Category) => {
      const item = await furnitureVersionDao.getAllByIdCategory(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    attributs: async (parent: Category) => {
      const item = await attributDao.getAllByIdCategory(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
  },
  Query: {
    categories: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const items = await categoryDao.getByOrganiaztion(user.organization)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    category: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (args.id === "") {
        const category = await categoryDao.getFirstCategoryOfAnOrganization(user.organization)
        if (!category) {
          return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
        }
        return category
      }
      const item = await categoryDao.getByCategoryIdAndOrganization(args.id, user.organization)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    }
  },
  Mutation: {
    deleteCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const category = await categoryDao.getById(args.id)
      if (!category) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (category.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const isCategoryDeleted = await categoryDao.deleteById(category.id);
      if (!isCategoryDeleted) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return isCategoryDeleted
    },
    createCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name: string;
        parentId: number;
      });
  
      const category = new Category();
      category.name = body.name;
      category.parentId = body.parentId;
      category.organization = user.organization;
  
      const categorySaved = await categoryDao.create(category);
      if (!categorySaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return categorySaved;
    },
    updateCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
  
      const body = (args as unknown as { 
        name: string;
        id: string;
      });

      const category = await categoryDao.getById(body.id)
      if (!category) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }

      if (category.organizationId !== user.organizationId){
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
  
      if (body.name) {
        category.name = body.name;
      }
  
      const savedCategory = await categoryDao.update(category);
      if (!savedCategory) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
  
      return savedCategory;
    }
  }
}