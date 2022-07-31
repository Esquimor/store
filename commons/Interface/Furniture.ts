import { FurnitureVersion, FurnitureVersionDefault } from "./FurnitureVersion";
import { Organization } from "./Organization";

export interface FurnitureWithLatestFurnitureVersion extends Furniture {
  furnitureVersions: [FurnitureVersion]
}

export interface FurnitureWithFurnitureVersion extends Furniture {
  furnitureVersions: FurnitureVersion[]
}

export interface FurnitureWithOrganization extends Furniture, FurnitureDefaultWithOrganization {}

export interface Furniture extends FurnitureDefault {
  id: string;
}

export interface FurnitureDefaultWithFurnitureVersionsDefault {
  furnitureVersions: FurnitureVersionDefault
}

export interface FurnitureDefaultWithOrganization {
  organization: Organization;
}

export interface FurnitureDefault {}