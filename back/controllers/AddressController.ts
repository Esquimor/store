import {Response} from 'express';
import { RequestAuth } from "../middleware/auth";
import { RequestAddress } from "../middleware/address";
import AddressDao from "../dao/AddressDao"
import PlacementDao from "../dao/PlacementDao"
import FormCreateAddress from "../form/Address/FormCreateAddress";
import FormUpdateAddress from "../form/Address/FormUpdateAddress";
import { Address } from '../entity/Address';
import { Placement } from "../entity/Placement";
import { replaceObjectValueFromToObject } from "../../commons/Technical/Object";
import FormCreatePlacement from "../form/Placement/FormCreatePlacement";

export default class AddressController {

  private static addressDao: AddressDao = new AddressDao();
  private static placementDao: PlacementDao = new PlacementDao();

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;

    const addresses = await AddressController.addressDao.getAddressesByOrganization(user.organization)
    if (!addresses) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      addresses: addresses.map(address => address.addressForResponse())
    })
  }

  public async create(req: RequestAuth, res: Response) {
    const body = (req.body as unknown as { 
      name?: string|null;
      number?: string|null;
      ligne1?: string|null;
      ligne2?: string|null;
      city?: string|null;
      zipCode?: string|null;
      country?: string|null;
      comment?: string|null;
    });
    const form = new FormCreateAddress(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const address = new Address();
    address.name = body.name;
    address.number = body.number
    address.ligne1 = body.ligne1
    address.ligne2 = body.ligne2
    address.city = body.city
    address.zipCode = body.zipCode
    address.country = body.country
    address.comment = body.comment
    address.organization = req.user.organization;

    const addressSaved = await AddressController.addressDao.create(address);
    if (!addressSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ address: addressSaved.addressForResponse() })
  }

  public async update(req: RequestAddress, res: Response) {
    const body = (req.body as unknown as { 
      name?: string|null;
      number?: string|null;
      ligne1?: string|null;
      ligne2?: string|null;
      city?: string|null;
      zipCode?: string|null;
      country?: string|null;
      comment?: string|null;
    });

    const form = new FormUpdateAddress(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const address = replaceObjectValueFromToObject(body, req.address) as Address;

    const savedAddress = await AddressController.addressDao.update(address);
    if (!savedAddress) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      address: savedAddress.addressForResponse(),
    })
  }

  public async delete(req: RequestAddress, res: Response) {
    const address = req.address;
    const isDeletedAddress = await AddressController.addressDao.deleteById(address.id);
    if (!isDeletedAddress) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      message: "ok"
    })
  }

  public async getPlacements(req: RequestAddress, res: Response) {
    const user = req.user;
    const address = req.address;

    const placements = await AddressController.placementDao.getPlacementByAddressIdInOrganization(
      address.id,
      user.organization
    )
    if (!placements) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      placements: placements.map(placement => placement.placementForResponse())
    })
  }

  public async createPlacement(req: RequestAddress, res: Response) {
    const user = req.user;
    const address = req.address;

    const body = (req.body as unknown as { 
      name: string;
    });
    const form = new FormCreatePlacement(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const placement = new Placement();
    placement.name = body.name;
    placement.address = address;

    const placementSaved = await AddressController.placementDao.create(placement);
    if (!placementSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ placement: placementSaved.placementForResponse() })
  }
}
