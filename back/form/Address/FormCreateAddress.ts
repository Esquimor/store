import Form from "../Form"
import { z } from "zod";

export default class FormCreateAddress extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string().optional(),
      number: z.string().optional(),
      ligne1: z.string().optional(),
      ligne2: z.string().optional(),
      city: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
      comment: z.string().optional(),
      placements: z.object({
        name: z.string(),
      }).array().optional()
    });
    this.buildForm(schema, formBody)
  }
}