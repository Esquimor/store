import { Placement } from "../entity/Placement";
import PlacementDao from "../dao/PlacementDao";
import AddressDao from "../dao/AddressDao";
import { GraphQLError } from "graphql";
import InventoryDao from "../dao/InventoryDao";
import OrderDao from "../dao/OrderDao";
import { ERROR } from "../../commons/Const/Error";

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
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return address
    },
    inventories: async (parent: Placement) => {
      const item = await inventoryDao.getAllByIdPlacement(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    orders: async (parent: Placement) => {
      const item = await orderDao.getAllByIdPlacement(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
  },
  Query: {
    placements: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const palcements = await  placementDao.getPlacementInOrganization(user.organization)
      if (!palcements) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return palcements
    },
  },
  Mutation: {
    createPlacementsForAddress: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        addressId: string;
        placements: {
          name: string
        }[];
      });
      const address = await addressDao.getById(body.addressId)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (address.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      let promise:Promise<Placement>[] = [];
      body.placements.forEach(({name}) => {
        const placement = new Placement();
        placement.name = name;
        placement.address = address
        promise = [...promise, placementDao.create(placement)]
      })
      const placements = await Promise.all(promise)
      return placements
    },
    updatePlacementsForAddress: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        addressId: string;
        placements: {
          id?: number;
          name: string;
        }[];
      });
      const address = await addressDao.getById(body.addressId)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (address.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      let promise:Promise<Placement|boolean>[] = [];
      body.placements.forEach(({id, name}) => {
        const placement = new Placement();
        if (!!id) {
          placement.id = id
        }
        placement.name = name;
        placement.address = address
        promise = [...promise, placementDao.create(placement)]
      })

      const placementsOfAddress = await placementDao.getPlacementByAddressIdInOrganization(address.id, user.organization);

      if (!!placementsOfAddress && placementsOfAddress.length > 0) {
        // Remove deleted placements
        placementsOfAddress.forEach(({id}) => {
          if (!body.placements.some(placement => placement?.id === id)) {
            promise = [...promise, placementDao.deleteById(id)]
          }
        })
      }
      await Promise.all(promise)
      return await placementDao.getPlacementByAddressIdInOrganization(address.id, user.organization);
    },
  }
}