import Form from "../Form"
import { z } from "zod";
import { ROLE } from "../../../commons/Interface/Role";

export default class FormCreateUserInSameOrganization extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      firstname: z.string().nullable(),
      lastname: z.string().nullable(),
      email: z.string(),
      role: z.enum(Object.values(ROLE) as [string, ...string[]])
    });
    this.buildForm(schema, formBody)
  }
}