import { Placement } from "../entity/Placement";
import PlacementDao from "../dao/PlacementDao";
import AddressDao from "../dao/AddressDao";
import { GraphQLError } from "graphql";
import InventoryDao from "../dao/InventoryDao";
import OrderDao from "../dao/OrderDao";

const addressDao: AddressDao = new AddressDao();
const placementDao: PlacementDao = new PlacementDao();
const inventoryDao: InventoryDao = new InventoryDao();
const orderDao: OrderDao = new OrderDao();

export default  {
  Placement: {
    id: (parent: Placement) => parent.id,
    name: (parent: Placement) => parent.name,
    address: async (parent: Placement) => {
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
    inventories: async (parent: Placement) => {
      const item = await inventoryDao.getAllByIdPlacement(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    orders: async (parent: Placement) => {
      const item = await orderDao.getAllByIdPlacement(parent.id)
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
    placements: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const palcements = await placementDao.getPlacementInOrganization(user.organization)
      if (!palcements) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return palcements
    },
  },
}