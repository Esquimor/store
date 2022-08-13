import Form from "../Form"
import { z } from "zod";

export default class FormUpdateVariation extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string().optional()
    });
    this.buildForm(schema, formBody)
  }
}