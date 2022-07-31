import Form from "../Form"
import { z } from "zod";

export default class FormUpdateInventory extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      quantity: z.number(),
    });
    this.buildForm(schema, formBody)
  }
}