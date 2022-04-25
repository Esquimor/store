/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Organization } from "app/../commons/Interface/Organization";
import { User } from "app/../commons/Interface/User";
import Api from "./Api";

export default class UserRequest {

  static Login(payload: { email: string, password: string})
    : Promise<{ token: string; user: User, organization: Organization}>
  {
    return Api.post("/auth", payload)
  }

  static Me()
    : Promise<{ user: User, organization: Organization}>
  {
    return Api.post("/me")
  }

  static Update({ firstname, lastname}: { firstname: string; lastname: string;}): Promise<{user: User}>
  {
    return Api.patch("/user", { firstname, lastname})
  }
}