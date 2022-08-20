import { AddressWithPlacements } from "../../../../commons/Interface/Address";

export interface AddressStateInterface {
  addresses: AddressWithPlacements[]
}

function state(): AddressStateInterface {
  return {
    addresses: []
  }
};

export default state;
