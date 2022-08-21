import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import { RequestAttribut } from "../middleware/attribut";
import AttributDao from "../dao/AttributDao"
import VariationDao from "../dao/VariationDao"
import FormCreateAttribut from "../form/Attribut/FormCreateAttribut";
import FormUpdateAttribut from "../form/Attribut/FormUpdateAttribut";
import { Attribut } from '../entity/Attribut';
import { Variation } from '../entity/Variation';

export default class AttributController {

  private static attributDao: AttributDao = new AttributDao();
  private static variationDao: VariationDao = new VariationDao();

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;

    const attributs = await AttributController.attributDao.getAttributsByOrganizationWithVariations(user.organization)
    if (!attributs) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      attributs,
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { 
      name: string;
      variations: {
        name: string;
      }[]
    });
    const form = new FormCreateAttribut(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;

    const attribut = new Attribut()
    attribut.organization = user.organization;
    attribut.name = body.name;

    if (body.variations) {
      body.variations.map((variationBody) => {
        const variation = new Variation();
        variation.name = variationBody.name;
        attribut.addVariation(variation);
      })
    }

    const createdAttribut = await AttributController.attributDao.create(attribut);
    if (!createdAttribut) {
      res.status(400).json({ message: "error"})
      return;
    }
    res.json({
      attribut: createdAttribut,
    })
  }

  public async update(req: RequestAttribut, res: Response) {
    const body = (req.body as unknown as { 
      name?: string;
      variations: {
        id?: number;
        name: string;
      }[]
    });

    const form = new FormUpdateAttribut(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const attribut = req.attribut;

    if (body.name) {
      attribut.name = body.name;
    }

    if (body.variations) {
      body.variations.map((variationBody) => {
        const variation = new Variation();
        variation.id = variationBody.id;
        variation.name = variationBody.name;
        attribut.addVariation(variation);
      })
    }
    
    const savedAttribut = await AttributController.attributDao.update(attribut);
    if (!savedAttribut) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      attribut: savedAttribut,
    })
  }

  public async delete(req: RequestAttribut, res: Response) {
    const attribut = req.attribut;
    const isDeletedAttribut = await AttributController.attributDao.deleteById(attribut.id);
    if (!isDeletedAttribut) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
  

  public async getVariations(req: RequestAttribut, res: Response) {
    const user = req.user;
    const attribut = req.attribut;

    const variations = await AttributController.variationDao.getVariationsByAttributInOrganization(
      attribut.id,
      user.organization
    )
    if (!variations) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      variations: variations
    })
  }

  public async createVariation(req: RequestAttribut, res: Response) {
    const attribut = req.attribut;

    const body = (req.body as unknown as { 
      name: string;
    });
    const form = new FormCreateAttribut(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const variation = new Variation();
    variation.name = body.name;
    variation.attribut = attribut;

    const variationSaved = await AttributController.variationDao.create(variation);
    if (!variationSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ variation: variationSaved })
  }
}