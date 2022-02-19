import {Request, Response} from 'express';
import AuthController from '../controllers/AuthController';

export default class AuthRouter {
  public authController: AuthController = new AuthController();

  public routes(app): void {
    app
      .route('/auth')
      .post(this.authController.auth);
    app
      .route("/register")
      .post(this.authController.register);
  }
}