import UserController from '../controllers/UserController';

export default class DefaultRouter {
  public userController: UserController = new UserController();

  public routes(app): void {
    app
      .route('/')
      .get(this.userController.get.bind(this.userController));
  }
}