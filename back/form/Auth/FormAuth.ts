import Form from "../Form"
import { z } from "zod";

export default class FormAuth extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      email: z.string().email(),
      password: z.string()
    });
    this.buildForm(schema, formBody)
  }
}