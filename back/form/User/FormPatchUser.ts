import Form from "../Form"
import { z } from "zod";

export default class FormPatchUser extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      firstname: z.string(),
      lastname: z.string(),
    });
    this.buildForm(schema, formBody)
  }
}