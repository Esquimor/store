import VariationDao from "../dao/VariationDao"
import {Response} from 'express';
import FormUpdateVariation from "../form/Variation/FormUpdateVariation";
import { replaceObjectValueFromToObject } from "../../commons/Technical/Object";
import { Variation } from "../entity/Variation";
import { RequestVariation } from "../middleware/variation"

export default class VariationController {

  private static variationDao: VariationDao = new VariationDao();

  public async update(req: RequestVariation, res: Response) {
    const body = (req.body as unknown as { 
      name?: string|null;
    });

    const form = new FormUpdateVariation(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const variation = replaceObjectValueFromToObject(body, req.variation) as Variation;

    const variationSaved = await VariationController.variationDao.update(variation);
    if (!variationSaved) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      variation: {
        id: variationSaved.id,
        name: variationSaved.name
      }
    })
  }

  public async delete(req: RequestVariation, res: Response) {
    const variation = req.variation;
    const isVariationDeleted = await VariationController.variationDao.deleteById(variation.id);
    if (!isVariationDeleted) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
}
