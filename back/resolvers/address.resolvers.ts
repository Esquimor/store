import { GraphQLError } from "graphql";
import OrganizationDao from "../dao/OrganizationDao";
import PlacementDao from "../dao/PlacementDao";
import { Address } from "../entity/Address";
import InventoryDao from "../dao/InventoryDao";
import OrderDao from "../dao/OrderDao";
import AddressDao from "../dao/AddressDao";
import { ERROR } from "../../commons/Const/Error";

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
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return placement
    },
    organization: async (parent: Address) => {
      if (!parent.organizationId) return null
      const organization = await organizationDao.getById(parent.organizationId)
      if (!organization) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
    inventories: async (parent: Address) => {
      const items = await inventoryDao.getAllByIdAddress(parent.id)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    orders: async (parent: Address) => {
      const items = await orderDao.getAllByIdAddress(parent.id)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
  },
  Query: {
    addresses: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const addresses = await addressDao.getAddressesByOrganization(user.organization)
      if (!addresses) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return addresses
    },
    address: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const address = await addressDao.getById(args.id)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (address.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return address
    },
  },
  Mutation: {
    createAddress: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name: string;
        number: string|null;
        ligne1: string|null;
        ligne2: string|null;
        city: string|null;
        zipCode: string|null;
        country: string|null;
        comment: string|null;
      });
      const address = new Address();
      address.name = body.name;
      address.number = body.number
      address.ligne1 = body.ligne1
      address.ligne2 = body.ligne2
      address.city = body.city
      address.zipCode = body.zipCode
      address.country = body.country
      address.comment = body.comment
      address.organization = user.organization;
  
      const addressSaved = await addressDao.create(address);
      if (!addressSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return addressSaved
    },
    updateAddress: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name?: string|null;
        number?: string|null;
        ligne1?: string|null;
        ligne2?: string|null;
        city?: string|null;
        zipCode?: string|null;
        country?: string|null;
        comment?: string|null;
        placements?: {name: string; id?: number}[]|null;
      });
      const address = await addressDao.getById(args.id)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (address.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (body.name) {
        address.name = body.name;
      }
      if (body.number) {
        address.number = body.number;
      }
      if (body.ligne1) {
        address.ligne1 = body.ligne1;
      }
      if (body.ligne2) {
        address.ligne2 = body.ligne2;
      }
      if (body.city) {
        address.city = body.city;
      }
      if (body.zipCode) {
        address.zipCode = body.zipCode;
      }
      if (body.country) {
        address.country = body.country;
      }
      if (body.comment) {
        address.comment = body.comment;
      }
      const savedAddress = await addressDao.update(address);
      if (!savedAddress) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return savedAddress
    },
    deleteAddress: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const address = await addressDao.getById(args.id)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (address.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const isDeletedAddress = await addressDao.deleteById(address.id);
      return isDeletedAddress
    }
  }
}