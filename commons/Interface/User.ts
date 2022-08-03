import { ROLE } from "./Role";

export enum USER_STATUS {
  CREATED = "created",
  REGISTERED = "registered",
  ARCHIVED = "archived",
  WAITING_PASSWORD = "waiting_password"
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: boolean;
  role: ROLE;
  organization: number;
  status: USER_STATUS;
}