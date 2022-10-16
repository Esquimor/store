import { GraphQLError } from "graphql";
import { Attribut } from "../entity/Attribut";
import CategoryDao from "../dao/CategoryDao";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import AttributDao from "../dao/AttributDao";
import VariationDao from "../dao/VariationDao";
import FormCreateAttribut from "../form/Attribut/FormCreateAttribut";
import FormUpdateAttribut from "../form/Attribut/FormUpdateAttribut";

const categoryDao: CategoryDao = new CategoryDao();
const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const attributDao: AttributDao = new AttributDao();
const variationDao: VariationDao = new VariationDao();

export default  {
  Attribut: {
    id: (parent: Attribut) => parent.id,
    name: (parent: Attribut) => parent.name,
    categories: async (parent: Attribut) => {
      const item = await categoryDao.getAllByIdAttribut(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    furnitureVersions: async (parent: Attribut) => {
      const item = await furnitureVersionDao.getAllByIdAttribut(parent.id)
      if (!item) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return item
    },
    organization: async (parent: Attribut) => {
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
    variations: async (parent: Attribut) => {
      const item = await variationDao.getAllByIdAttribut(parent.id)
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
    attributs: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await attributDao.getAttributsByOrganization(user.organization)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    attribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (!args.id){
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = await attributDao.getById(args.id)
      if (!attribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (attribut.organizationId !== user.organizationId) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return attribut
    },
  },
  Mutation: {
    deleteAttribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (!args.id) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = await attributDao.getById(args.id);
      if (!attribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      if (attribut.organizationId !== user.organizationId) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const isDeletedAttribut = await attributDao.deleteById(attribut.id);
      if (!isDeletedAttribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return isDeletedAttribut
    },
    createAttribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { 
        name: string;
      });
      const form = new FormCreateAttribut(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = new Attribut()
      attribut.organization = user.organization;
      attribut.name = body.name;

      const createdAttribut = await attributDao.create(attribut);
      if (!createdAttribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return createdAttribut
    },
    updateAttribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { 
        id: number;
        name: string;
      });
      const form = new FormUpdateAttribut(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = await attributDao.getById(body.id)
      if (!attribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      attribut.name = body.name;
      const updateAttribut = await attributDao.update(attribut);
      if (!updateAttribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return updateAttribut
    }, 
  }
}