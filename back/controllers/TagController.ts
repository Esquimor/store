import TagDao from "../dao/TagDao"
import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormCreateTag from "../form/Tag/FormCreateTag";
import FormUpdateTag from "../form/Tag/FormUpdateTag";
import { replaceObjectValueFromToObject } from "../../commons/Technical/Object";
import { Tag } from "../entity/Tag";
import { RequestTag } from "../middleware/tag"

export default class TagController {

  private static tagDao: TagDao = new TagDao();

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;

    const tags = await TagController.tagDao.getAllByOrganization(user.organization)
    if (!tags) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      tags: tags.map(tag => tag.tagForResponse())
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { 
      name: string;
    });
    const form = new FormCreateTag(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const tag = new Tag();
    tag.name = body.name;
    tag.organization = req.user.organization;

    const tagSaved = await TagController.tagDao.create(tag);
    if (!tagSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ tag: tagSaved.tagForResponse() })
  }

  public async update(req: RequestTag, res: Response) {
    const body = (req.body as unknown as { 
      name?: string|null;
    });

    const form = new FormUpdateTag(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const tag = replaceObjectValueFromToObject(body, req.tag) as Tag;

    const tagSaved = await TagController.tagDao.update(tag);
    if (!tagSaved) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      tag: {
        id: tagSaved.id,
        name: tagSaved.name
      }
    })
  }

  public async delete(req: RequestTag, res: Response) {
    const tag = req.tag;
    const isTagDeleted = await TagController.tagDao.deleteById(tag.id);
    if (!isTagDeleted) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
}
