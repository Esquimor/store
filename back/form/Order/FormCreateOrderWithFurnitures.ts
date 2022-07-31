import Form from "../Form"
import { z } from "zod";

export default class FormCreateFurniture extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string(),
      items: z.object({
        furnitureVersionId: z.string(),
        quantity: z.number(),
      }).array()
    });
    this.buildForm(schema, formBody)
  }
}