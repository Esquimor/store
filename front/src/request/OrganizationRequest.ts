/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Organization } from "app/../commons/Interface/Organization";
import { User } from "app/../commons/Interface/User";
import Api from "./Api";

export default class OrganizationRequest {

  static Update({ name }: { name: string; }): Promise<{organization: Organization}>
  {
    return Api.patch("/organization", { name })
  }

  static GetUsersForMyOrganization(): Promise<{users: User[]}>
  {
    return Api.get("/organization/users")
  }
}