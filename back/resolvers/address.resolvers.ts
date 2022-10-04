import { GraphQLError } from "graphql";
import OrganizationDao from "../dao/OrganizationDao";
import PlacementDao from "../dao/PlacementDao";
import { Address } from "../entity/Address";
import InventoryDao from "../dao/InventoryDao";
import OrderDao from "../dao/OrderDao";
import AddressDao from "../dao/AddressDao";

const placementDao: PlacementDao = new PlacementDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const inventoryDao: InventoryDao = new InventoryDao();
const orderDao: OrderDao = new OrderDao();
const addressDao: AddressDao = new AddressDao();

export default  {
  Address: {
    id: (parent: Address) => parent.id,
    name: (parent: Address) => parent.name,
    number: (parent: Address) => parent.number,
    ligne1: (parent: Address) => parent.ligne1,
    ligne2: (parent: Address) => parent.ligne2,
    city: (parent: Address) => parent.city,
    zipCode: (parent: Address) => parent.zipCode,
    country: (parent: Address) => parent.country,
    comment: (parent: Address) => parent.comment,
    placements: async (parent: Address) => {
      const placement = await placementDao.getAllByIdAddress(parent.id)
      if (!placement) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return placement
    },
    organization: async (parent: Address) => {
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
    inventories: async (parent: Address) => {
      const items = await inventoryDao.getAllByIdAddress(parent.id)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    orders: async (parent: Address) => {
      const items = await orderDao.getAllByIdAddress(parent.id)
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
  Query: {
    addresses: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const addresses = await addressDao.getAddressesByOrganization(user.organization)
      if (!addresses) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return addresses
    },
  },
}