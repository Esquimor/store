import { GraphQLError } from "graphql"
import OrderDao from '../dao/OrderDao';
import InventoryDao from '../dao/InventoryDao';
import FurnitureVersionDao from '../dao/FurnitureVersionDao';
import VariationDao from '../dao/VariationDao';
import FurnitureDao from '../dao/FurnitureDao';
import ItemDao from '../dao/ItemDao';
import { Item } from "../entity/Item";
import { ERROR } from "../../commons/Const/Error";
import { ORDER_STATUS } from "../../commons/Interface/Order";
import { ITEM_STATUS } from "../../commons/Interface/Item";

const orderDao: OrderDao = new OrderDao();
const inventoryDao: InventoryDao = new InventoryDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const variationDao: VariationDao = new VariationDao();
const furnitureDao: FurnitureDao = new FurnitureDao();
const itemDao: ItemDao = new ItemDao();

export default  {
  Item: {
    id: (parent: Item) => parent.id,
    status: (parent: Item) => parent.status,
    order: async (parent: Item) => {
      if (!parent.orderId) return null
      const order = await orderDao.getById(parent.orderId)
      if (!order) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return order
    },
    inventory: async (parent: Item) => {
      if (!parent.inventoryId) return null
      const inventory = await inventoryDao.getById(parent.inventoryId)
      if (!inventory) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return inventory
    },
    furnitureVersion: async (parent: Item) => {
      if (!parent.furnitureVersionId) return null
      const furnitureVersion = await furnitureVersionDao.getById(parent.furnitureVersionId)
      if (!furnitureVersion) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return furnitureVersion
    },
    variations: async (parent: Item) => {
      const item = await variationDao.getAllByIdItem(parent.id)
      return item
    },
  },
  Mutation: {
    addItemInOrder: async (
      _,
      args: {
        furnitureId: string;
        orderId: string | number;
      },
      {
        user
      }
    ) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const order = await orderDao.getById(args.orderId);
      if (!order) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (order.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (order.status !== ORDER_STATUS.CREATED) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furniture = await furnitureDao.getById(args.furnitureId);
      if (!furniture) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (furniture.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furnitureVersion = await furnitureVersionDao.getLastFurnitureVersionByIdFurniture(args.furnitureId);
      if (!furnitureVersion) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }

      const item = new Item();
      item.furnitureVersionId = furnitureVersion.id;
      item.orderId = args.orderId as number;
      
      const itemSaved = await itemDao.create(item)
      if (!itemSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return itemSaved;
    },
    addItemInInventory: async (
      _,
      args: {
        furnitureId: string;
        inventoryId: string | number;
      },
      {
        user
      }
    ) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const inventory = await inventoryDao.getById(args.inventoryId);
      if (!inventory) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (inventory.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furniture = await furnitureDao.getById(args.furnitureId);
      if (!furniture) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (furniture.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furnitureVersion = await furnitureVersionDao.getLastFurnitureVersionByIdFurniture(args.furnitureId);
      if (!furnitureVersion) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }

      const item = new Item();
      item.furnitureVersionId = furnitureVersion.id;
      item.inventoryId = args.inventoryId as number;
      item.status = ITEM_STATUS.VALIDATED;
      
      const itemSaved = await itemDao.create(item)
      if (!itemSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return itemSaved;
    }
  }
}