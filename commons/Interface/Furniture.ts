export enum FURNITURE_STATUS {
  CREATED = 0,
  VALIDATED,
  IN_WORKING,
  FINISHED,
  ERROR
}

export interface Furniture {
  id: string;
  name: string;
  description?: string;
  status: FURNITURE_STATUS
}