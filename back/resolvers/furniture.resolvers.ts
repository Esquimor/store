import { Furniture } from "../entity/Furniture";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import FurnitureDao from "../dao/FurnitureDao";
import { GraphQLError } from "graphql";

const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const furnitureDao: FurnitureDao = new FurnitureDao();

export default {
  Furniture: {
    id: (parent: Furniture) => parent.id,
    furnitureVersions: async (parent: Furniture) => {
      const item = await furnitureVersionDao.getAllByIdFurniture(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    organization: async (parent: Furniture) => {
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
    furnitures: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await furnitureDao.getByOrganization(user.organization)
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