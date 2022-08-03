import Form from "../Form"
import { z } from "zod";

export default class FormPasswordForgotten extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      email: z.string().email(),
    });
    this.buildForm(schema, formBody)
  }
}