import Form from "../Form"
import { z } from "zod";

export default class FormCreateAttribut extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string(),
      variations: z.object({
        name: z.string()
      }).array().optional()
    });
    this.buildForm(schema, formBody)
  }
}