import { ROLE } from "./Role";

export interface User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: number;
  phone: boolean;
  role: ROLE;
  organization: number;
  orders: number[];
}