import UserController from '../controllers/UserController';
import { auth } from '../middleware/auth';

export default class UserRouter {
  public userController: UserController = new UserController();

  public routes(app): void {
    app
      .route('/user')
      .patch(auth, this.userController.patch.bind(this.userController));
  }
}