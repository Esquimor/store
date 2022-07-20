import UserController from '../controllers/UserController';
import { auth } from '../middleware/auth';
import { admin } from "../middleware/admin";

export default class UserRouter {
  public userController: UserController = new UserController();

  public routes(app): void {
    app
      .route('/user')
      .patch(auth, this.userController.patch.bind(this.userController));

    app
      .route('/user/organization')
      .post(auth, admin, this.userController.createUserInSameOrganization.bind(this.userController))
      .delete(auth, admin, this.userController.deleteUserInSameOrganization.bind(this.userController));

    app
      .route('/user/organization/role')
      .patch(auth, admin, this.userController.patchUserRoleInSameOrganization.bind(this.userController));
  }
}