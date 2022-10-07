import { GraphQLError } from "graphql";
import OrganizationDao from "../dao/OrganizationDao";
import TagDao from "../dao/TagDao";
import { Tag } from "../entity/Tag";

const organizationDao: OrganizationDao = new OrganizationDao();
const tagDao: TagDao = new TagDao();

export default  {
  Tag: {
    id: (parent: Tag) => parent.id,
    name: (parent: Tag) => parent.name,
    organization: async (parent: Tag) => {
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
  },
  Query: {
    tags: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      const palcements = await tagDao.getAllByOrganization(user.organization)
      if (!palcements) {
        return Promise.reject(
          new GraphQLError(
            "error",
          ),
        )
      }
      return palcements
    },
  },
}