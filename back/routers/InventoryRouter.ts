import InventoryController from '../controllers/InventoryController';
import { auth } from '../middleware/auth';
import { inventoryAccessById } from '../middleware/inventory';

export default class InventoryRouter {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app): void {
    app
      .route('/inventory')
      .get(auth, this.inventoryController.get.bind(this.inventoryController))
      .post(auth, this.inventoryController.create.bind(this.inventoryController))
    
      
    app
    .route('/inventory/:id')
      .put(auth, inventoryAccessById, this.inventoryController.update.bind(this.inventoryController))
      .delete(auth, inventoryAccessById, this.inventoryController.delete.bind(this.inventoryController))
  }
}