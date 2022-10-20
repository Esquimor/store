import { Furniture } from "../entity/Furniture";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import FurnitureDao from "../dao/FurnitureDao";
import { GraphQLError } from "graphql";
import FormCreateFurniture from "../form/Furniture/FormCreateFurniture"
import { FurnitureVersion } from "../entity/FurnitureVersion";

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
    lastFurnitureVersion: async (parent: Furniture) => {
      const item = await furnitureVersionDao.getLastFurnitureVersionByIdFurniture(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (!item.id) {
        return null
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
      const items = await furnitureDao.getFurnituresByOrganizationWithLastestVersion(user.organization, args)
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
    createFurniture: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { name: string, description?: string});
      const form = new FormCreateFurniture(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const furniture = new Furniture();
      furniture.organization = user.organization;

      const furnitureVersion = new FurnitureVersion()
      furnitureVersion.name = body.name;
      furnitureVersion.description = body.description || null;
      furnitureVersion.user = user;

      furniture.addFurnitureVersion(furnitureVersion)

      const userPatchSaved = await furnitureDao.create(furniture);
      if (!userPatchSaved) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return furniture;
    },
  }
}