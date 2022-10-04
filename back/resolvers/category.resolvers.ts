import { GraphQLError } from "graphql";
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
}