import Form from "../Form"
import { z } from "zod";

export default class FormCreateFurniture extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string(),
      description: z.string().nullable(),
    });
    this.buildForm(schema, formBody)
  }
}