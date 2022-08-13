import VariationController from '../controllers/VariationController';
import { auth } from '../middleware/auth';
import { variationAccessById } from '../middleware/variation';

export default class VariationRouter {
  public variationController: VariationController = new VariationController();

  public routes(app): void {
    app
      .route('/variation/:id')
      .put(auth, variationAccessById, this.variationController.update.bind(this.variationController))
      .delete(auth, variationAccessById, this.variationController.delete.bind(this.variationController));
  }
}