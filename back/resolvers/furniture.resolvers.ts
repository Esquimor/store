import { Furniture } from "../entity/Furniture";
import FurnitureVersionDao from "../dao/FurnitureVersionDao";
import OrganizationDao from "../dao/OrganizationDao";
import FurnitureDao from "../dao/FurnitureDao";
import { GraphQLError } from "graphql";
import { FurnitureVersion } from "../entity/FurnitureVersion";
import { Attribut } from "../entity/Attribut";
import { Variation } from "../entity/Variation";
import { Media } from "../entity/Media";
import { ERROR } from "../../commons/Const/Error";

const furnitureVersionDao: FurnitureVersionDao = new FurnitureVersionDao();
const organizationDao: OrganizationDao = new OrganizationDao();
const furnitureDao: FurnitureDao = new FurnitureDao();

export default {
  Furniture: {
    id: (parent: Furniture) => parent.id,
    archived: (parent: Furniture) => parent.archived,
    furnitureVersions: async (parent: Furniture) => {
      const item = await furnitureVersionDao.getAllByIdFurniture(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return item
    },
    lastFurnitureVersion: async (parent: Furniture) => {
      const item = await furnitureVersionDao.getLastFurnitureVersionByIdFurniture(parent.id)
      if (!item) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (!item.id) {
        return null
      }
      return item
    },
    organization: async (parent: Furniture) => {
      if (!parent.organizationId) return null
      const organization = await organizationDao.getById(parent.organizationId)
      if (!organization) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return organization
    },
  },
  Query: {
    furnitures: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const items = await furnitureDao.getFurnituresByOrganizationWithLastestVersion(user.organization, args)
      if (!items) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      return items
    },
    furniture: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furniture = await furnitureDao.getById(args.id);
      if (!furniture) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (furniture.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      return furniture
    },
  },
  Mutation: {
    createFurniture: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const body = (args as unknown as {
        name: string,
        description?: string;
        attributs: {
          name: string;
          variations: {
            name: string;
          }[];
        }[];
        medias: {
          base64: string;
        }[];
      });
      const furniture = new Furniture();
      furniture.organization = user.organization;

      const furnitureVersion = new FurnitureVersion()
      furnitureVersion.name = body.name;
      furnitureVersion.description = body.description || null;
      furnitureVersion.user = user;

      if (body.attributs) {
        for (const attributBody of body.attributs) {
          const attribut = new Attribut();
          attribut.name = attributBody.name;
          attribut.organization = user.organization;
          if (attributBody.variations) {
            for (const variationBpody of attributBody.variations) {
              const variation = new Variation();
              variation.name = variationBpody.name;
              attribut.addVariation(variation);
            }
          }
          furnitureVersion.addAttribut(attribut)
        }
      }

      if (body.medias) {
        for (const mediaBody of body.medias) {
          const media = new Media();
          media.organization = user.organization;
          media.user = user
          media.base64 = mediaBody.base64;
          furnitureVersion.addMedia(media)
        }
      }

      furniture.addFurnitureVersion(furnitureVersion)

      const furnitureCreated = await furnitureDao.create(furniture);
      if (!furnitureCreated) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return furnitureCreated;
    },
    editFurniture: async(
      parent,
      args: {
        id: string | number;
        name?: string;
        description?: string;
        attributs?: {
          id?: string | number;
          name: string;
          variations?: {
            id?: string | number;
            name: string;
          }[]
        }[]
        medias?: {
          id?: string | number;
          base64: string;
        }[]
      },
      {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furniture = await furnitureDao.getById(args.id);
      if (!furniture) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (furniture.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const lastFurnitureVersion = await furnitureVersionDao.getLastFurnitureVersionByIdFurniture(furniture.id);
      if (!lastFurnitureVersion) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (args.name) {
        lastFurnitureVersion.name = args.name;
      }
      if (args.description) {
        lastFurnitureVersion.description = args.description;
      }
      
      if (args.attributs) {
        lastFurnitureVersion.resetAttributs();
        for (const attributBody of args.attributs) {
          const attribut = new Attribut();
          if (attributBody.id) {
            attribut.id = attributBody.id as number;
          }
          attribut.name = attributBody.name;
          attribut.organization = user.organization;
          if (attributBody.variations) {
            for (const variationBody of attributBody.variations) {
              const variation = new Variation();
              if (variationBody.id) {
                variation.id = variationBody.id as number;
              }
              variation.name = variationBody.name;
              attribut.addVariation(variation);
            }
          }
          lastFurnitureVersion.addAttribut(attribut)
        }
      }
      
      if (args.medias) {
        lastFurnitureVersion.resetMedias();
        for (const mediaBody of args.medias) {
          const media = new Media();
          if (mediaBody.id) {
            media.id = mediaBody.id as number
          } else {
            media.organization = user.organization;
            media.user = user
          }
          media.base64 = mediaBody.base64;
          lastFurnitureVersion.addMedia(media)
        }
      }
      await furnitureVersionDao.update(lastFurnitureVersion);
      const savedFurniture = furnitureDao.getById(furniture.id)
      if (!savedFurniture) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return savedFurniture;
    },
    archiveFurniture: async(parent, args, {user}) => {
      if (!user) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      const furniture = await furnitureDao.getById(args.id);
      if (!furniture) {
        return Promise.reject(new GraphQLError(ERROR.NOT_FOUND))
      }
      if (furniture.organizationId !== user.organizationId) {
        return Promise.reject(new GraphQLError(ERROR.UNAUTHORIZED))
      }
      furniture.archived = true;
      const savedFurniture = await furnitureDao.update(furniture);
      if (!savedFurniture) {
        return Promise.reject(new GraphQLError(ERROR.DEFAULT))
      }
      return savedFurniture;
    }
  }
}