import VariationDao from "../dao/VariationDao";
import { Variation } from "../entity/Variation";
import { RequestAuth } from "./auth"

export interface RequestVariation extends RequestAuth {
  variation: Variation;
}

export const variationAccessById = async (req: RequestVariation, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const variationDao: VariationDao = new VariationDao();
  

  const variation = await variationDao.getByIdWithAttributWithOrganization(params.id) as Variation;
  if (!variation) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (variation.attribut.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.variation = variation;
  next();
  return
}