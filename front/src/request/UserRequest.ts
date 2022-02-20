/* eslint-disable @typescript-eslint/no-unsafe-return */
import { User } from "app/../commons/Interface/User";
import Api from "./Api";

export default class UserRequest {

  static Login(payload: { email: string, password: string})
    : Promise<{ token: string; user: User}>
  {
    return Api.post("/auth", payload)
  }

  static Me()
    : Promise<{ user: User}>
  {
    return Api.post("/me")
  }
}