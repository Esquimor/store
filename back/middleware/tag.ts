import TagDao from "../dao/TagDao";
import { Tag } from "../entity/Tag";
import { RequestAuth } from "./auth"

export interface RequestTag extends RequestAuth {
  tag: Tag;
}

export const tagAccessById = async (req: RequestTag, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const tagDao: TagDao = new TagDao();
  

  const tag = await tagDao.getByIdWithOrganization(params.id) as Tag;
  if (!tag) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (tag.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.tag = tag;
  next();
  return
}