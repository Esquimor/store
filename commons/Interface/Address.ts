import { Placement, PlacementDefault } from "./Placement";

export interface AddressWithPlacements extends Address {
  placements: Placement[];
}

export interface Address extends AddressDefault {
  id: string;
}

export interface AddressDefaultWithPlacementsDefault extends AddressDefault {
  placements: PlacementDefault[];
}

export interface AddressDefault {
  name: string;
  number: string | null;
  ligne1: string | null;
  ligne2: string | null;
  city: string | null;
  zipCode: string | null;
  country: string | null;
  comment: string | null;
}