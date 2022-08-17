import { Address } from "../../../../commons/Interface/Address";

export interface AddressStateInterface {
  addresses: Address[]
}

function state(): AddressStateInterface {
  return {
    addresses: []
  }
};

export default state;
