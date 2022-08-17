import { Address, AddressDefault } from "./Address";

export interface PlacementWithAddress extends Placement {
  address?: Address;
}

export interface Placement extends PlacementDefault {
  id: string;
}

export interface PlacementDefaultWithAddressDefault extends PlacementDefault {
  address?: AddressDefault
}

export interface PlacementDefault {
  name: string;
}