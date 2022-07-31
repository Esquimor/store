import Form from "../Form"
import { z } from "zod";

export default class FormCreateInventory extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      furnitureVersionId: z.union([z.string(), z.number()]),
      quantity: z.number(),
    });
    this.buildForm(schema, formBody)
  }
}