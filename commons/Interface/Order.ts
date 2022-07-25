import { Furniture } from "./Furniture";
import { User } from "./User";

export enum ORDER_STATUS {
  CREATED = "CREATED",
  VALIDATED = "VALIDATED",
  ORDERED = "ORDERED",
  FINISHED = "FINISHED",
  ERROR = "ERROR"
}

export interface OrderWithFurnituresAndCreator extends OrderWithCreator, OrderWithFurnitures {}

export interface OrderWithCreator extends Order {
  creator: User;
}

export interface OrderWithFurnitures extends Order {
  furnitures: Furniture[];
}

export interface Order {
  id: string;
  status: ORDER_STATUS;
  name: string;
}