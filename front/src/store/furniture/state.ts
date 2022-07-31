import { FurnitureWithLatestFurnitureVersion } from "../../../../commons/Interface/Furniture";

export interface FurnitureStateInterface {
  furnituresWithLastestFurnitureVersion: FurnitureWithLatestFurnitureVersion[];
}

function state(): FurnitureStateInterface {
  return {
    furnituresWithLastestFurnitureVersion: [],
  }
};

export default state;
