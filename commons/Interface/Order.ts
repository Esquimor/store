import { Furniture } from "./Furniture";

export enum ORDER_STATUS {
  CREATED = 0,
  VALIDATED,
  IN_WORKING,
  FINISHED,
  ERROR
}

export interface OrderWithFurnitures extends Order {
  furnitures: Furniture[];
}

export interface Order {
  id: string;
  status: ORDER_STATUS;
  name: string;
}