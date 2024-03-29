import Form from "../Form"
import { z } from "zod";

export default class FormDeleteUserInSameOrganization extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      id: z.string(),
    });
    this.buildForm(schema, formBody)
  }
}