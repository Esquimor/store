import { Furniture } from "./Furniture";

export interface FurnitureVersionWithFurniture extends FurnitureVersion {
  furniture: Furniture;
}

export interface FurnitureVersionSimple extends FurnitureVersionDefault {
  id: string;
}

export interface FurnitureVersion extends FurnitureVersionDefault {
  id: string;
  created_at: string;
}

export interface FurnitureVersionDefault {
  name: string;
  description?: string;
}