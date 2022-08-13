import TagController from '../controllers/TagController';
import { auth } from '../middleware/auth';
import { tagAccessById } from '../middleware/tag';

export default class TagRouter {
  public tagController: TagController = new TagController();

  public routes(app): void {
    app
      .route('/tag')
      .get(auth, this.tagController.get.bind(this.tagController))
      .post(auth, this.tagController.create.bind(this.tagController))

    app
      .route('/tag/:id')
      .put(auth, tagAccessById, this.tagController.update.bind(this.tagController))
      .delete(auth, tagAccessById, this.tagController.delete.bind(this.tagController));
  }
}