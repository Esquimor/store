import { Organization } from "../../../../commons/Interface/Organization";

export interface OrganizationStateInterface {
  organization: Organization|null;
}

function state(): OrganizationStateInterface {
  return {
    organization: null,
  }
};

export default state;
