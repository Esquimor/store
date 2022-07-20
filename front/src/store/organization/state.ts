import { User } from "app/../commons/Interface/User";
import { Organization } from "../../../../commons/Interface/Organization";

export interface OrganizationStateInterface {
  organization: Organization|null;
  users: User[];
}

function state(): OrganizationStateInterface {
  return {
    organization: null,
    users: [],
  }
};

export default state;
