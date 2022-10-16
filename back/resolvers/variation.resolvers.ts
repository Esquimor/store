import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import AttributDao from "../dao/AttributDao";
import ItemDao from "../dao/ItemDao";
import VariationDao from "../dao/VariationDao";
import { Variation } from "../entity/Variation";
import { GraphQLError } from "graphql";
import FormCreateVariations from "../form/Variation/FormCreateVariations";
import FormUpdateVariations from "../form/Variation/FormUpdateVariations"

const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const attributDao: AttributDao = new AttributDao();
const itemDao: ItemDao = new ItemDao();
const variationDao: VariationDao = new VariationDao();

export default  {
  Variation: {
    id: (parent: Variation) => parent.id,
    name: (parent: Variation) => parent.name,
    attribut: async (parent: Variation) => {
      if (!parent.attributId) return null
      const attribut = await attributDao.getById(parent.attributId)
      if (!attribut) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return attribut
    },
    furnitureVersions: async (parent: Variation) => {
      const items = await furnitureVersionDao.getAllByIdVariation(parent.id)
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    },
    items: async (parent: Variation) => {
      const items = await itemDao.getAllByIdVariation(parent.id)
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
    variations: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const variations = await variationDao.getVariationsInOrganization(user.organization)
      if (!variations) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return variations
    },
  },
  Mutation: {
    createVariationsForAttribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { 
        attributId: string;
        variations: {
          name: string
        }[];
      });
      const form = new FormCreateVariations(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = await attributDao.getById(body.attributId)
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
      let promise:Promise<Variation>[] = [];
      body.variations.forEach(({name}) => {
        const variation = new Variation();
        variation.name = name;
        variation.attribut = attribut
        promise = [...promise, variationDao.create(variation)]
      })
      const variations = await Promise.all(promise)
      return variations
    },
    updateVariationsForAttribut: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const body = (args as unknown as { 
        attributId: string;
        variations: {
          id?: number;
          name: string;
        }[];
      });
      const form = new FormUpdateVariations(body);
      if (form.hasError()) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const attribut = await attributDao.getById(body.attributId)
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
      let promise:Promise<Variation|boolean>[] = [];
      body.variations.forEach(({id, name}) => {
        const variation = new Variation();
        if (!!id) {
          variation.id = id
        }
        variation.name = name;
        variation.attribut = attribut
        promise = [...promise, variationDao.create(variation)]
      })

      const variationsOfAttribut = await variationDao.getVariationByAttributIdInOrganization(attribut.id, user.organization);

      if (!!variationsOfAttribut && variationsOfAttribut.length > 0) {
        // Remove deleted variations
        variationsOfAttribut.forEach(({id}) => {
          if (!body.variations.some(variation => variation?.id === id)) {
            promise = [...promise, variationDao.deleteById(id)]
          }
        })
      }
      await Promise.all(promise)
      return await variationDao.getVariationByAttributIdInOrganization(attribut.id, user.organization);
    },
  }
}