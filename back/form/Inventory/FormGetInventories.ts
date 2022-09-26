import Form from "../Form"
import { z } from "zod";

export default class FormGetInventories extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      user: z.boolean().optional(),
      placement: z.boolean().optional(),
      address: z.boolean().optional(),
    });
    this.buildForm(schema, formBody)
  }
}