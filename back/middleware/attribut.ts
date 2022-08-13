import AttributDao from "../dao/AttributDao";
import { Attribut } from "../entity/Attribut";
import { RequestAuth } from "./auth"

export interface RequestAttribut extends RequestAuth {
  attribut: Attribut;
}

export const attributAccessById = async (req: RequestAttribut, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const attributDao: AttributDao = new AttributDao();
  

  const attribut = await attributDao.getByIdWithOrganization(params.id) as Attribut;
  if (!attribut) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (attribut.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.attribut = attribut;
  next();
  return
}