import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import OrganizationDao from '../dao/OrganizationDao';
import AddressDao from '../dao/AddressDao';
import PlacementDao from '../dao/PlacementDao';
import OrderDao from '../dao/OrderDao';
import FurnitureVersionDao from '../dao/FurnitureVersionDao';
import InventoryDao from '../dao/InventoryDao';
import { User } from '../entity/User';
import FormAuth from "../form/Auth/FormAuth";
import FormRegister from "../form/Auth/FormRegister";
import FormPasswordForgotten from "../form/Auth/FormPasswordForgotten";
import FormResetPassword from "../form/Auth/FormResetPassword";
import FormRegisterValidated from "../form/Auth/FormRegisterValidated";
import { comparePassword, generatePassword } from "../technical/password";
import { generateToken } from "../technical/token";
import { RequestAuth } from "../middleware/auth";
import { Organization } from '../entity/Organization';
import { createCustomer, createSubscription } from "../technical/stripe";
import { USER_STATUS } from '../../commons/Interface/User';
import { GraphQLError } from 'graphql';

const userDao: UserDao = new UserDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const addressDao: AddressDao = new AddressDao();
const placementDao: PlacementDao = new PlacementDao();
const orderDao: OrderDao = new OrderDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const inventoryDao: InventoryDao = new InventoryDao();

export default  {
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    firstname: (parent: User) => parent.firstname,
    lastname: (parent: User) => parent.lastname,
    phone: (parent: User) => parent.phone,
    role: (parent: User) => parent.role,
    status: (parent: User) => parent.status,
    organization: async (parent: User) => {
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
    address: async (parent: User) => {
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
    placement: async (parent: User) => {
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
    orders: async (parent: User) => {
      const items = await orderDao.getAllByIdUser(parent.id)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    furnitureVersions: async (parent: User) => {
      const items = await furnitureVersionDao.getAllByIdUser(parent.id)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    inventories: async (parent: User) => {
      const items = await inventoryDao.getAllByIdUser(parent.id)
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
    users: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const users = await userDao.getUsersInOrganization(user.organization)
      if (!users) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return users
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const query = (args as unknown as { email?: string, password?: string});
      const form = new FormAuth(query);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      const { email, password } = form.getData();
      const user = await userDao.getUserRegisteredWithOrganizationByEmail(email);
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      const matchPassword = comparePassword(password, (user as unknown as User).password)
      if (!matchPassword) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return {
        token: generateToken((user as unknown as User).id),
        user: (user as unknown as User).userForResponse(),
        organization: user.organization.organizationForResponse(),
      }
    },
    signup: async (parent, args, context, info) => {
      const query = (args as unknown as { email?: string, password?: string, tokenId: string});
      const form = new FormRegister(query);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      const { email, password, organization, tokenId } = form.getData();
      const existingUser = await userDao.getByEmail(email);
      if (existingUser) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      // Create Organization
      const userOrganization = new Organization();
      userOrganization.name = organization

      /*
      const customer = await createCustomer({token: tokenId, email});
      const subscription = await createSubscription({customerId: customer.id, price: 500, quantity: 1})

      userOrganization.stripe = subscription.id
      userOrganization.strip_end = dayjs(subscription.current_period_end * 1_000 + 3600*24*3)
  */
      const organizationCreated = await organizationDao.create(userOrganization);


      // Create User
      const generatedPassword = await generatePassword(password);
      const user = new User();
      user.initializeNewUser({ email, password: generatedPassword, organization: organizationCreated });
      const userCreated = await userDao.create(user);

      if (!userCreated) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }

      return {
        token:  generateToken(userCreated.id),
        user: userCreated.userForResponse(),
        organization: organizationCreated.organizationForResponse(),
      }
    }
  }
}