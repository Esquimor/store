import { GraphQLError } from "graphql"
import ItemDao from '../dao/ItemDao';

const itemDao: ItemDao = new ItemDao();

export default  {
  Query: {
    items: async(parent, args, {user}, info) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const items = await itemDao.getAll()
      if (!items) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return items
    }
  },
}