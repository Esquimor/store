import PlacementController from '../controllers/PlacementController';
import { auth } from '../middleware/auth';
import { placementAccessById } from '../middleware/placement';

export default class PlacementRouter {
  public placementController: PlacementController = new PlacementController();

  public routes(app): void {
    app
      .route('/placement/:id')
      .put(auth, placementAccessById, this.placementController.update.bind(this.placementController))
      .delete(auth, placementAccessById, this.placementController.delete.bind(this.placementController));
  }
}