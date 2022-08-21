import CategoryController from '../controllers/CategoryController';
import { categoryAccessById } from '../middleware/category';
import { auth } from '../middleware/auth';

export default class CategoryRouter {
  public categoryController: CategoryController = new CategoryController();

  public routes(app): void {
    app
      .route('/category')
      .get(auth, this.categoryController.get.bind(this.categoryController))
      .post(auth, this.categoryController.create.bind(this.categoryController))

    app
      .route('/category/tree')
      .get(auth, this.categoryController.getTree.bind(this.categoryController))
      .post(auth, this.categoryController.createTree.bind(this.categoryController))
  
    app
    .route('/category/:id')
      .put(auth, categoryAccessById, this.categoryController.update.bind(this.categoryController))
      .delete(auth, categoryAccessById, this.categoryController.delete.bind(this.categoryController))
  
    app
    .route('/category/tree/:id')
      .put(auth, categoryAccessById, this.categoryController.updateTree.bind(this.categoryController))
      .delete(auth, categoryAccessById, this.categoryController.deleteTree.bind(this.categoryController))
  }
}