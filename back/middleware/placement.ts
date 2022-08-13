import PlacementDao from "../dao/PlacementDao";
import { Placement } from "../entity/Placement";
import { RequestAuth } from "./auth"

export interface RequestPlacement extends RequestAuth {
  placement: Placement;
}

export const placementAccessById = async (req: RequestPlacement, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const placementDao: PlacementDao = new PlacementDao();
  

  const placement = await placementDao.getByIdWithAddressWithOrganization(params.id) as Placement;
  if (!placement) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (placement.address.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.placement = placement;
  next();
  return
}