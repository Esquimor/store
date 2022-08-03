import AuthController from '../controllers/AuthController';
import { auth } from '../middleware/auth';

export default class AuthRouter {
  public authController: AuthController = new AuthController();

  public routes(app): void {
    app
      .route('/auth')
      .post(this.authController.auth);
    app
      .route("/register")
      .post(this.authController.register);
    app
      .route("/me")
      .post(auth, this.authController.me)
    app
      .route("/passwordForgotten")
      .post(this.authController.passwordForgotten)
    app
      .route("/resetPassword")
      .post(this.authController.resetPassword)

    app
      .route("/registerValidated")
      .post(this.authController.registerValidated)
  }
}