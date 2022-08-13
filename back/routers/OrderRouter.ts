import OrderController from '../controllers/OrderController';
import { auth } from '../middleware/auth';
import { canUpdateOrder } from "../middleware/canUpdateOrder";
import { orderAccessById } from "../middleware/orderAccessById";

export default class OrderRouter {
  public orderController: OrderController = new OrderController();

  public routes(app): void {
    app
      .route('/order')
      .post(auth, this.orderController.createWithFurnitures.bind(this.orderController))
      .get(auth, this.orderController.get.bind(this.orderController));

    app
      .route("/order/:id")
      .get(auth, orderAccessById, this.orderController.getById.bind(this.orderController))
      .put(auth, canUpdateOrder, orderAccessById, this.orderController.update.bind(this.orderController))

    app
      .route("/order/:id/validate")
      .put(auth, canUpdateOrder, orderAccessById, this.orderController.validate.bind(this.orderController))
  }
}