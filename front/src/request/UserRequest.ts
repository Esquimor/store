/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Organization } from "app/../commons/Interface/Organization";
import { ROLE } from "app/../commons/Interface/Role";
import { User } from "app/../commons/Interface/User";
import Api from "./Api";

export default class UserRequest {

  static Login(payload: { email: string, password: string})
    : Promise<{ token: string; user: User, organization: Organization}>
  {
    return Api.post("/auth", payload)
  }

  static PasswordForgotten(payload: { email: string })
    : Promise<boolean>
  {
    return Api.post("/passwordForgotten", payload) 
  }

  static ResetPassword(payload: { password: string; code: string; email: string })
    : Promise<{ token: string; user: User, organization: Organization}>
  {
    return Api.post("/resetPassword", payload)
  }

  static Register(payload: { email: string, password: string, organization: string})
    : Promise<{token: string, user: User, organization: Organization}>
  {
    return Api.post("/register", payload)
  }

  static RegisterValidated(payload: { email: string; code: string})
    : Promise<{ token: string; user: User, organization: Organization}>
  {
    return Api.post("/registerValidated", payload)
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

  static CreateUserInSameOrganization(payload: { email: string; firstname?: string, lastname?: string, role: ROLE})
    : Promise<{user: User}>
  {
    return Api.post("/user/organization", payload)
  }

  static UpdateUserRoleInSameOrganization(payload: { userId: string|number; role: ROLE})
    : Promise<{user: User}>
  {
    return Api.patch("/user/organization/role", payload)
  }

  static DeleteUserInSameOrganization(payload: { userId: string|number;})
    : Promise<{user: User}>
  {
    return Api.delete("/user/organization", payload)
  }
}