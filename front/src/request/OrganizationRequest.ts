/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Organization } from "app/../commons/Interface/Organization";
import Api from "./Api";

export default class OrganizationRequest {

  static Update({ name }: { name: string; }): Promise<{organization: Organization}>
  {
    return Api.patch("/organization", { name })
  }
}