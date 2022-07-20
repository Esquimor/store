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
  }
}