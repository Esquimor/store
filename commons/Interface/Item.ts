import { FurnitureVersionWithFurniture } from "./FurnitureVersion";

export enum ITEM_STATUS {
  WANTED = "WANTED",
  DECLINED = "DECLINED",
  VALIDATED = "VALIDATED",
}

export interface ItemWithFurnitureVersionWithFurniture extends Item {
  furnitureVersion: FurnitureVersionWithFurniture
}

export interface Item extends ItemDefault {
  id: string;
  status: ITEM_STATUS
}

export interface ItemDefault {
  quantity: number;
}