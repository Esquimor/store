import FurnitureController from '../controllers/FurnitureController';
import { auth } from '../middleware/auth';

export default class FurnitureRouter {
  public furnitureController: FurnitureController = new FurnitureController();

  public routes(app): void {
    app
      .route('/furniture')
      .post(auth, this.furnitureController.create.bind(this.furnitureController))
      .get(auth, this.furnitureController.get.bind(this.furnitureController))
  }
}