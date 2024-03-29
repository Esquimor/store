import { GraphQLError } from "graphql";
import OrderDao from "../dao/OrderDao";
import UserDao from "../dao/UserDao";
import FurnitureDao from "../dao/FurnitureDao";
import AddressDao from "../dao/AddressDao";
import TagDao from "../dao/TagDao";
import InventoryDao from "../dao/InventoryDao";
import CategoryDao from "../dao/CategoryDao";
import AttributDao from "../dao/AttributDao";
import OrganizationDao from "../dao/OrganizationDao";
import { Organization } from "../entity/Organization";
import { ERROR } from "../../commons/Const/Error";

const userDao: UserDao = new UserDao();
const orderDao: OrderDao = new OrderDao();
const furnitureDao: FurnitureDao = new FurnitureDao();
const addressDao: AddressDao = new AddressDao();
const tagDao: TagDao = new TagDao();
const inventoryDao: InventoryDao = new InventoryDao();
const categoryDao: CategoryDao = new CategoryDao();
const attributDao: AttributDao = new AttributDao();
const organizationDao: OrganizationDao = new OrganizationDao();

export default  {
  Organization: {
    id: (parent: Organization) => parent.id,
    name: (parent: Organization) => parent.name,
    users: async (parent: Organization) => {
      const item = await userDao.getUsersInOrganizationByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    orders: async (parent: Organization) => {
      const item = await orderDao.getWithOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    furnitures: async (parent: Organization) => {
      const item = await furnitureDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    addresses: async (parent: Organization) => {
      const item = await addressDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    addressMain: async (parent: Organization) => {
      if (!parent.addressMain) return null;
      const item = await addressDao.getById(parent.addressMainId)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    tags: async (parent: Organization) => {
      const item = await tagDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    inventories: async (parent: Organization) => {
      const item = await inventoryDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    categories: async (parent: Organization) => {
      const item = await categoryDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    attributs: async (parent: Organization) => {
      const item = await attributDao.getByOrganizationId(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
  },
  Query: {
    myOrganization: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return user.organization
    },
  },
  Mutation: {
    updateMyOrganization: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const query = (args as unknown as { name?: string });
      const organizationPatched = user.organization;
      organizationPatched.name = query.name;
      const organizationSaved = await organizationDao.update(organizationPatched);
      if (!organizationSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return organizationSaved
    },
  }
}