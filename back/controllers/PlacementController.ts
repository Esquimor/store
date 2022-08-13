import PlacementDao from "../dao/PlacementDao"
import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import FormUpdatePlacement from "../form/Placement/FormUpdatePlacement";
import { replaceObjectValueFromToObject } from "../../commons/Technical/Object";
import { Placement } from "../entity/Placement";
import { RequestPlacement } from "../middleware/placement"

export default class PlacementController {

  private static placementDao: PlacementDao = new PlacementDao();

  public async update(req: RequestPlacement, res: Response) {
    const body = (req.body as unknown as { 
      name?: string|null;
    });

    const form = new FormUpdatePlacement(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const placement = replaceObjectValueFromToObject(body, req.placement) as Placement;

    const placementSaved = await PlacementController.placementDao.update(placement);
    if (!placementSaved) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      placement: {
        id: placementSaved.id,
        name: placementSaved.name
      }
    })
  }

  public async delete(req: RequestPlacement, res: Response) {
    const placement = req.placement;
    const isPlacementDeleted = await PlacementController.placementDao.deleteById(placement.id);
    if (!isPlacementDeleted) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }
}
