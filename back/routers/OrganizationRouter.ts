import OrganizationController from '../controllers/OrganizationController';
import { auth } from '../middleware/auth';

export default class UserRouter {
  public organizationController: OrganizationController = new OrganizationController();

  public routes(app): void {
    app
      .route('/organization')
      .patch(auth, this.organizationController.patch.bind(this.organizationController));

    app
      .route('/organization/users')
      .get(auth, this.organizationController.getUsersOfMyOrganization.bind(this.organizationController))
  }
}