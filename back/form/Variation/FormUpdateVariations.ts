import Form from "../Form"
import { z } from "zod";

export default class FormUpdateVariations extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      attributId: z.string(),
      variations: z.array(z.object({
        id: z.string().optional(),
        name: z.string()
      })),
    });
    this.buildForm(schema, formBody)
  }
}