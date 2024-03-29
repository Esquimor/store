import UserDao from '../dao/UserDao';
import OrganizationDao from '../dao/OrganizationDao';
import AddressDao from '../dao/AddressDao';
import PlacementDao from '../dao/PlacementDao';
import OrderDao from '../dao/OrderDao';
import FurnitureVersionDao from '../dao/FurnitureVersionDao';
import InventoryDao from '../dao/InventoryDao';
import { User } from '../entity/User';
import { comparePassword, generatePassword } from "../technical/password";
import { generateToken } from "../technical/token";
import { Organization } from '../entity/Organization';
import { GraphQLError } from 'graphql';
import { ROLE } from '../../commons/Interface/Role';
import { ERROR } from '../../commons/Const/Error';

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
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
    address: async (parent: User) => {
      if (!parent.addressId) return null
      const address = await addressDao.getById(parent.addressId)
      if (!address) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return address
    },
    placement: async (parent: User) => {
      if (!parent.placementId) return null
      const placement = await placementDao.getById(parent.placementId)
      if (!placement) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return placement
    },
    orders: async (parent: User) => {
      const items = await orderDao.getAllByIdUser(parent.id)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    furnitureVersions: async (parent: User) => {
      const items = await furnitureVersionDao.getAllByIdUser(parent.id)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    inventories: async (parent: User) => {
      const items = await inventoryDao.getAllByIdUser(parent.id)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
  },
  Query: {
    users: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const users = await userDao.getUsersInOrganization(user.organization)
      if (!users) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return users
    },
    me: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return user
    }
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const query = (args as unknown as { email: string, password: string});

      const { email, password } = query;
      const user = await userDao.getUserRegisteredWithOrganizationByEmail(email);
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }

      const matchPassword = comparePassword(password, (user as unknown as User).password)
      if (!matchPassword) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return {
        token: generateToken((user as unknown as User).id),
        user: (user as unknown as User).userForResponse(),
        organization: user.organization.organizationForResponse(),
      }
    },
    signup: async (parent, args, context, info) => {
      const query = (args as unknown as { email: string, password: string, tokenId: string, organization: string;});

      const { email, password, organization, tokenId } = query;
      const existingUser = await userDao.getByEmail(email);
      if (existingUser) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
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
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }

      return {
        token:  generateToken(userCreated.id),
        user: userCreated.userForResponse(),
        organization: organizationCreated.organizationForResponse(),
      }
    },
    me: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return {
        user: user,
        organization: user.organization,
      }
    },
    updateMe: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const query = (args as unknown as { firstname?: string, lastname?: string});
      const userPatched = user;
      userPatched.firstname = query.firstname;
      userPatched.lastname = query.lastname;
      const userPatchSaved = await userDao.update(userPatched);
      if (!userPatchSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return userPatchSaved;
    },
    deleteUser: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (user.role !== ROLE.ADMIN) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const userToDelete = await userDao.getById(args.id);
      if (userToDelete?.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const isDeleted = await userDao.deleteById(args.id);
      if (!isDeleted) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return true
    },
    createUser: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (user.role !== ROLE.ADMIN) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const query = (args as unknown as { email: string, firstname: string; lastname: string; role: ROLE});
      
      const existingUser = await userDao.getByEmail(query.email);
      if (existingUser) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      const newUser = new User();
      newUser.email = query.email;
      newUser.firstname = query.firstname;
      newUser.lastname = query.lastname;
      newUser.role = query.role;
      newUser.organization = user.organization;
      newUser.setTimer()

      const userCreated = await userDao.create(newUser);
      if (!userCreated) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return userCreated;
    },
    updateUser: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      if (user.role !== ROLE.ADMIN) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const query = (args as unknown as { role: ROLE; id: string; });
      const userToPatch = await userDao.getWithOrganizationById(query.id) as User;
      if (!userToPatch) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }

      if (user.organization.id !== userToPatch.organization.id) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }

      userToPatch.role = query.role;

      const userPatchSaved = await userDao.update(userToPatch);
      if (!userPatchSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return userPatchSaved
    }
  }
}