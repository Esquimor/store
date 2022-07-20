import Form from "../Form"
import { z } from "zod";
import { ROLE } from "../../../commons/Interface/Role";

export default class FormPatchRoleUserInSameOrganization extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      role: z.enum(Object.values(ROLE) as [string, ...string[]]),
      userId: z.string(),
    });
    this.buildForm(schema, formBody)
  }
}