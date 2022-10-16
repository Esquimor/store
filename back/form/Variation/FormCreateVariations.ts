import Form from "../Form"
import { z } from "zod";

export default class FormCreateVariations extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      attributId: z.string(),
      variations: z.array(z.object({
        name: z.string()
      })),
    });
    this.buildForm(schema, formBody)
  }
}