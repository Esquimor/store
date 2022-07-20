import { Furniture } from "../../../../commons/Interface/Furniture";

export interface FurnitureStateInterface {
  furnitures: Furniture[];
}

function state(): FurnitureStateInterface {
  return {
    furnitures: [],
  }
};

export default state;
