import { Furniture } from "./Furniture";
import { User } from "./User";
import { ItemWithFurnitureVersionWithFurniture } from "./Item";

export enum ORDER_STATUS {
  CREATED = "CREATED",
  VALIDATED = "VALIDATED",
  ORDERED = "ORDERED",
  FINISHED = "FINISHED",
  ERROR = "ERROR"
}
export interface OrderWithItemWithFurnitureVersionWithFurnitureAndCreator extends OrderWithCreator, OrderWithItemWithFurnitureVersionWithFurniture {}

export interface OrderWithFurnituresAndCreator extends OrderWithCreator, OrderWithFurnitures {}

export interface OrderWithCreator extends Order {
  creator: User;
}

export interface OrderWithFurnitures extends Order {
  furnitures: Furniture[];
}

export interface OrderWithItemWithFurnitureVersionWithFurniture extends Order {
  items: ItemWithFurnitureVersionWithFurniture[]
}

export interface Order {
  id: string;
  status: ORDER_STATUS;
  name: string;
}