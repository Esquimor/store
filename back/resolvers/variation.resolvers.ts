import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import AttributDao from "../dao/AttributDao";
import ItemDao from "../dao/ItemDao";
import VariationDao from "../dao/VariationDao";
import { Variation } from "../entity/Variation";
import { GraphQLError } from "graphql";

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
}