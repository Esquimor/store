export enum FURNITURE_STATUS {
  WANTED = "WANTED",
  DECLINED = "DECLINED",
  VALIDED = "VALIDED",
}

export interface Furniture extends FurnitureDefault {
  id: string;
  status: FURNITURE_STATUS
}

export interface FurnitureDefault {
  name: string;
  description?: string;
}