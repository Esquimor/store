import AddressDao from "../dao/AddressDao";
import { Address } from "../entity/Address";
import { RequestAuth } from "./auth"

export interface RequestAddress extends RequestAuth {
  address: Address;
}

export const addressAccessById = async (req: RequestAddress, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const addressDao: AddressDao = new AddressDao();
  

  const address = await addressDao.getByIdWithOrganization(params.id) as Address;
  if (!address) {
    res.status(400).json({ message: "error"})
    return;
  }

  if (address.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.address = address;
  next();
  return
}