import AttributController from '../controllers/AttributController';
import { auth } from '../middleware/auth';
import { attributAccessById } from '../middleware/attribut';

export default class AttributRouter {
  public attributController: AttributController = new AttributController();

  public routes(app): void {
    app
      .route('/attribut')
      .get(auth, this.attributController.get.bind(this.attributController))
      .post(auth, this.attributController.create.bind(this.attributController))
    
      
    app
    .route('/attribut/:id')
      .put(auth, attributAccessById, this.attributController.update.bind(this.attributController))
      .delete(auth, attributAccessById, this.attributController.delete.bind(this.attributController))

    app
    .route('/attribut/:id/variation')
      .get(auth, attributAccessById, this.attributController.getVariations.bind(this.attributController))
      .post(auth, attributAccessById, this.attributController.createVariation.bind(this.attributController))
  }
}