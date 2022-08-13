import AddressController from '../controllers/AddressController';
import { addressAccessById } from '../middleware/address';
import { auth } from '../middleware/auth';

export default class AddressRouter {
  public addressController: AddressController = new AddressController();

  public routes(app): void {
    app
      .route('/address')
      .get(auth, this.addressController.get.bind(this.addressController))
      .post(auth, this.addressController.create.bind(this.addressController))

    app
    .route('/address/:id')
      .put(auth, addressAccessById, this.addressController.update.bind(this.addressController))
      .delete(auth, addressAccessById, this.addressController.delete.bind(this.addressController))

    app
    .route('/address/:id/placement')
      .get(auth, addressAccessById, this.addressController.getPlacements.bind(this.addressController))
      .post(auth, addressAccessById, this.addressController.createPlacement.bind(this.addressController))
  }
}