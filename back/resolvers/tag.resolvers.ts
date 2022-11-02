import { GraphQLError } from "graphql";
import OrganizationDao from "../dao/OrganizationDao";
import TagDao from "../dao/TagDao";
import { Tag } from "../entity/Tag";
import { replaceObjectValueFromToObject } from "../../commons/Technical/Object";
import { ERROR } from "../../commons/Const/Error";

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
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
  },
  Query: {
    tags: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const palcements = await tagDao.getAllByOrganization(user.organization)
      if (!palcements) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return palcements
    },
  },
  Mutation: {
    deleteTag: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const tag = await tagDao.getById(args.id)
      if (!tag) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (tag.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const isTagDeleted = await tagDao.deleteById(tag.id);
      if (!isTagDeleted) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return isTagDeleted
    },
    createTag: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as { 
        name: string;
      });
  
      const tag = new Tag();
      tag.name = body.name;
      tag.organization = user.organization;
  
      const tagSaved = await tagDao.create(tag);
      if (!tagSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return tagSaved;
    },
    updateTag: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as {
        id: number;
        name: string;
      });
      const tag = await tagDao.getById(body.id);

      if (!tag) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }

      if (tag.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }

      const tagReplaced = replaceObjectValueFromToObject(body, tag) as Tag;

      const tagSaved = await tagDao.update(tagReplaced);
      if (!tagSaved) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }

      return tagSaved
    }
  }
}
