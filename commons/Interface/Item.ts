import { FurnitureVersionWithFurniture } from "./FurnitureVersion";

export enum ITEM_STATUS {
  WANTED = "WANTED",
  DECLINED = "DECLINED",
  VALIDED = "VALIDED",
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