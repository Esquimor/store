import { GraphQLError } from "graphql";
import { Inventory } from "../entity/Inventory";
import OrganizationDao from "../dao/OrganizationDao";
import UserDao from "../dao/UserDao";
import PlacementDao from "../dao/PlacementDao";
import AddressDao from "../dao/AddressDao";
import TagDao from "../dao/TagDao";
import ItemDao from "../dao/ItemDao";
import InventoryDao from "../dao/InventoryDao";

const organizationDao: OrganizationDao = new OrganizationDao();
const userDao: UserDao = new UserDao();
const addressDao: AddressDao = new AddressDao();
const placementDao: PlacementDao = new PlacementDao();
const tagDao: TagDao = new TagDao();
const itemDao: ItemDao = new ItemDao();
const inventoryDao: InventoryDao = new InventoryDao();

export default  {
  Inventory: {
    id: (parent: Inventory) => parent.id,
    name: (parent: Inventory) => parent.name,
    organization: async (parent: Inventory) => {
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
    user: async (parent: Inventory) => {
      if (!parent.userId) return null
      const user = await userDao.getById(parent.userId)
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return user
    },
    address: async (parent: Inventory) => {
      if (!parent.addressId) return null
      const address = await addressDao.getById(parent.addressId)
      if (!address) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return address
    },
    placement: async (parent: Inventory) => {
      if (!parent.placementId) return null
      const placement = await placementDao.getById(parent.placementId)
      if (!placement) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return placement
    },
    tags: async (parent: Inventory) => {
      const item = await tagDao.getAllByIdInventory(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    items: async (parent: Inventory) => {
      const item = await itemDao.getAllByIdInventory(parent.id)
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
    inventories: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await inventoryDao.getByOrganization(user.organization)
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