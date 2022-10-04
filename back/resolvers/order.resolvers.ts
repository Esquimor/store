import { GraphQLError } from 'graphql';
import { Order } from "../entity/Order";
import OrderDao from '../dao/OrderDao';
import OrganizationDao from '../dao/OrganizationDao';
import UserDao from '../dao/UserDao';
import ItemDao from '../dao/ItemDao';
import AddressDao from '../dao/AddressDao';
import PlacementDao from '../dao/PlacementDao';

const orderDao: OrderDao = new OrderDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const userDao: UserDao = new UserDao();
const itemDao: ItemDao = new ItemDao();
const addressDao: AddressDao = new AddressDao();
const placementDao: PlacementDao = new PlacementDao();

export default  {
  Order: {
    id: (parent: Order) => parent.id,
    name: (parent: Order) => parent.name,
    organization: async (parent: Order) => {
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
    creator: async (parent: Order) => {
      if (!parent.creatorId) return null
      const user = await userDao.getById(parent.creatorId)
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return user
    },
    items: async (parent: Order) => {
      const items = await itemDao.getAllByIdOrder(parent.id)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    address: async (parent: Order) => {
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
    placement: async (parent: Order) => {
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
  },
  Query: {
    orders: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const orders = await orderDao.getByOrganization(user.organization)
      if (!orders) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return orders
    },
    ordersCount: async(parent, args, {user}, info) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const orders = await orderDao.getByOrganizationWithItemsWithFurnitureVersionWithFurniture(user.organization)
      if (!orders) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return orders[1]
    },
  },
}