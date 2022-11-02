import { GraphQLError } from "graphql";
import { Inventory } from "../entity/Inventory";
import OrganizationDao from "../dao/OrganizationDao";
import UserDao from "../dao/UserDao";
import PlacementDao from "../dao/PlacementDao";
import AddressDao from "../dao/AddressDao";
import TagDao from "../dao/TagDao";
import ItemDao from "../dao/ItemDao";
import InventoryDao from "../dao/InventoryDao";
import { User } from "../entity/User";
import { ERROR } from "../../commons/Const/Error";

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
    created_at: (parent: Inventory) => parent.created_at,
    name: (parent: Inventory) => parent.name,
    organization: async (parent: Inventory) => {
      if (!parent.organizationId) return null
      const organization = await organizationDao.getById(parent.organizationId)
      if (!organization) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
    user: async (parent: Inventory) => {
      if (!parent.userId) return null
      const user = await userDao.getById(parent.userId)
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return user
    },
    address: async (parent: Inventory) => {
      if (!parent.addressId) return null
      const address = await addressDao.getById(parent.addressId)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return address
    },
    placement: async (parent: Inventory) => {
      if (!parent.placementId) return null
      const placement = await placementDao.getById(parent.placementId)
      if (!placement) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return placement
    },
    tags: async (parent: Inventory) => {
      const item = await tagDao.getAllByIdInventory(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    items: async (parent: Inventory) => {
      const item = await itemDao.getAllByIdInventory(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
  },
  Query: {
    inventories: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      let params = {};

      switch (args.type) {
        case "ME":
          params = {
            userId: user.id
          };
          break;
        case "ADDRESS":
          params = {
            addressId: user.addressId
          };
          break;
        case "PLACEMENT":
          params = {
            placementId: user.placementId
          };
          break;
      }

      const items = await inventoryDao.getByOrganization(user.organization, params)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    inventoriesCount: async(parent, args, {user}: {user: User}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      let params = {};

      switch (args.type) {
        case "ME":
          params = {
            userId: user.id
          };
          break;
        case "ADDRESS":
          params = {
            addressId: user.addressId
          };
          break;
        case "PLACEMENT":
          params = {
            placementId: user.placementId
          };
          break;
      }

      const inventory = await inventoryDao.countByOrganization(user.organization, params)
      return inventory
    },
    inventory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const inventory = await inventoryDao.getById(args.id)
      if (!inventory) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (inventory.organizationId !== user.organization.id) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return inventory
    },
  },
  Mutation: {
    deleteInventory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const inventory = await inventoryDao.getById(args.id)
      if (!inventory) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (inventory.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const isDeletedInventory = await inventoryDao.deleteById(inventory.id);
      return isDeletedInventory
    },
    createInventory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name: string;
      });
      const inventory = new Inventory()
      inventory.organization = user.organization;
      inventory.name = body.name;

      const createdInventory = await inventoryDao.create(inventory);
      if (!createdInventory) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return createdInventory
    },
    updateInventory: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name: string;
        id: number
      });
      const inventory = await inventoryDao.getById(body.id);
      if (!inventory) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (inventory.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      inventory.name = body.name;
      const savedInventory = await inventoryDao.update(inventory);
      if (!savedInventory) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return savedInventory
    },
  }
}