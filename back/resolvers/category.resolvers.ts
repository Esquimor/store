import { GraphQLError } from "graphql";
import AttributDao from "../dao/AttributDao";
import CategoryDao from "../dao/CategoryDao";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import { Category } from "../entity/Category";
import FormCreateCategory from "../form/Category/FormCreateCategory";
import FormUpdateCategory from "../form/Category/FormUpdateCategory";

const categoryDao: CategoryDao = new CategoryDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const attributDao: AttributDao = new AttributDao();

export default  {
  Category: {
    id: (parent: Category) => parent.id,
    name: (parent: Category) => parent.name,
    children: async (parent: Category) => {
      const children = await categoryDao.getDescendantsUsingParentIdy(parent.id)
      return children
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
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return organization
    },
    furnitureVersions: async (parent: Category) => {
      const item = await furnitureVersionDao.getAllByIdCategory(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    attributs: async (parent: Category) => {
      const item = await attributDao.getAllByIdCategory(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
  },
  Query: {
    categories: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await categoryDao.getByOrganiaztion(user.organization)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
  },
  Mutation: {
    deleteCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (!args.id) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const category = await categoryDao.getById(args.id)
      if (!category) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (category.organizationId !== user.organizationId) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const isCategoryDeleted = await categoryDao.deleteById(category.id);
      if (!isCategoryDeleted) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return isCategoryDeleted
    },
    createCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { 
        name: string;
        parentId: number;
      });
      const form = new FormCreateCategory(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
  
      const category = new Category();
      category.name = body.name;
      category.parentId = body.parentId;
      category.organization = user.organization;
  
      const categorySaved = await categoryDao.create(category);
      if (!categorySaved) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return categorySaved;
    },
    updateCategory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
  
      const body = (args as unknown as { 
        name: string;
        id: string;
      });
  
      const form = new FormUpdateCategory(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      const category = await categoryDao.getById(body.id)
      if (!category) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
  
      if (body.name) {
        category.name = body.name;
      }
  
      const savedCategory = await categoryDao.update(category);
      if (!savedCategory) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
  
      return savedCategory;
    }
  }
}