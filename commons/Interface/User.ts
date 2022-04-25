import { ROLE } from "./Role";

export interface User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: boolean;
  role: ROLE;
  organization: number;
  orders: number[];
}