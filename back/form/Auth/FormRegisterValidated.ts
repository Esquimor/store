import Form from "../Form"
import { z } from "zod";

export default class FormRegisterValidated extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      email: z.string().email(),
      code: z.string()
    });
    this.buildForm(schema, formBody)
  }
}