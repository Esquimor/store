import { FurnitureVersion } from "../entity/FurnitureVersion";
import ItemDao from "../dao/ItemDao";
import FurnitureDao from "../dao/FurnitureDao";
import UserDao from "../dao/UserDao";
import TagDao from "../dao/TagDao";
import CategoryDao from "../dao/CategoryDao";
import AttributDao from "../dao/AttributDao";
import VariationDao from "../dao/VariationDao";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import { GraphQLError } from "graphql";

const itemDao: ItemDao = new ItemDao();
const furnitureDao: FurnitureDao = new FurnitureDao();
const userDao: UserDao = new UserDao();
const tagDao: TagDao = new TagDao();
const categoryDao: CategoryDao = new CategoryDao();
const attributDao: AttributDao = new AttributDao();
const variationDao: VariationDao = new VariationDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();

export default  {
  FurnitureVersion: {
    id: (parent: FurnitureVersion) => parent.id,
    name: (parent: FurnitureVersion) => parent.name,
    description: (parent: FurnitureVersion) => parent.description,
    items: async (parent: FurnitureVersion) => {
      const item = await itemDao.getAllByIdFurnitureVersion(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    furniture: async (parent: FurnitureVersion) => {
      if (!parent.furnitureId) return null
      const item = await furnitureDao.getById(parent.furnitureId);
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    user: async (parent: FurnitureVersion) => {
      if (!parent.userId) return null
      const item = await userDao.getById(parent.userId);
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    tags: async (parent: FurnitureVersion) => {
      const item = await tagDao.getAllByIdFurnitureVersion(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    category: async (parent: FurnitureVersion) => {
      if (!parent.categoryId) return null
      const item = await categoryDao.getById(parent.categoryId);
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    attributs: async (parent: FurnitureVersion) => {
      const item = await attributDao.getAllByIdFurnitureVersion(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    variations: async (parent: FurnitureVersion) => {
      const item = await variationDao.getAllByIdFurnitureVersion(parent.id)
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
    furnitureVersions: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await furnitureVersionDao.getInOrganization(user.organization)
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