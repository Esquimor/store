import { GraphQLError } from 'graphql';
import { Order } from "../entity/Order";
import OrderDao from '../dao/OrderDao';
import OrganizationDao from '../dao/OrganizationDao';
import UserDao from '../dao/UserDao';
import ItemDao from '../dao/ItemDao';
import AddressDao from '../dao/AddressDao';
import PlacementDao from '../dao/PlacementDao';
import FormCreateOrderWithFurnitures from "../form/Order/FormCreateOrderWithFurnitures";
import { Item } from '../entity/Item';

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
    status: (parent: Order) => parent.status,
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
    countItems: async (parent: Order) => {
      const items = await itemDao.countAllByIdOrder(parent.id)
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
      const orders = await orderDao.getByOrganization(user.organization, {
        start: args.skip,
        quantity: args.take,
        status: args.status
      })
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
      const orders = await orderDao.countByOrganization(user.organization, {
        status: args.status
      })
      return orders
    },
    order: async(parent, args, {user}, info) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const order = await orderDao.getById(args.id);
      if (!order) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (order.organizationId !== user.organization.id) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return order
    },
  },
  Mutation: {
    addOrder: async(parent, args, {user}) => {
      const query = (args as unknown as {
        name: string;
        items: {
          furnitureVersionId: string;
          quantity: number;
        }[]
      });
      const form = new FormCreateOrderWithFurnitures(query);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
  
      // Create Furnitures
      const items = query.items.reduce<Item[]>((acc, ite) => {
        let ites:Item[] = [];
        for(let i =0; i < ite.quantity; i++) {
          const item = new Item();
          item.furnitureVersionId = ite.furnitureVersionId as unknown as number;
          ites = [...ites, item]
        }
        return [...acc, ...ites];
      }, []);
  
      // Create Order;
      const order = new Order();
      order.setItems(items);
      order.name = query.name;
      
      order.creator = user;
      order.organization = user.organization;
      
      const orderSaved = await orderDao.create(order);
      if (!orderSaved) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return orderSaved
    }
  }
}