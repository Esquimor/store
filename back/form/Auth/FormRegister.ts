import Form from "../Form"
import { z } from "zod";

export default class FormRegister extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
      organization: z.string(),
    });
    this.buildForm(schema, formBody)
  }
}