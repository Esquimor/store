import { GraphQLError } from "graphql"
import OrderDao from '../dao/OrderDao';
import InventoryDao from '../dao/InventoryDao';
import FurnitureVersionDao from '../dao/FurnitureVersionDao';
import VariationDao from '../dao/VariationDao';
import { Item } from "../entity/Item";
import { ERROR } from "../../commons/Const/Error";

const orderDao: OrderDao = new OrderDao();
const inventoryDao: InventoryDao = new InventoryDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const variationDao: VariationDao = new VariationDao();

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
}