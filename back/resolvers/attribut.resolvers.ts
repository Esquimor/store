import { GraphQLError } from "graphql";
import { Attribut } from "../entity/Attribut";
import CategoryDao from "../dao/CategoryDao";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import AttributDao from "../dao/AttributDao";

const categoryDao: CategoryDao = new CategoryDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const attributDao: AttributDao = new AttributDao();

export default  {
  Attribut: {
    id: (parent: Attribut) => parent.id,
    name: (parent: Attribut) => parent.name,
    categories: async (parent: Attribut) => {
      const item = await categoryDao.getAllByIdAttribut(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    furnitureVersions: async (parent: Attribut) => {
      const item = await furnitureVersionDao.getAllByIdAttribut(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    organization: async (parent: Attribut) => {
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
  },
  Query: {
    attributs: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await attributDao.getAttributsByOrganization(user.organization)
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