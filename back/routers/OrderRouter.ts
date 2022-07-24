import OrderController from '../controllers/OrderController';
import { auth } from '../middleware/auth';

export default class OrderRouter {
  public orderController: OrderController = new OrderController();

  public routes(app): void {
    app
      .route('/order')
      .post(auth, this.orderController.createWithFurnitures.bind(this.orderController))
      .get(auth, this.orderController.get.bind(this.orderController));
  }
}