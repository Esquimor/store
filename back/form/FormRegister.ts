import Form from "./Form"
import { z } from "zod";

export default class FormRegister extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    });
    this.buildForm(schema, formBody)
  }
}