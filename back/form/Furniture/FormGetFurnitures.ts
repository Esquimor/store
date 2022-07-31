import Form from "../Form"
import { z } from "zod";

export default class FormGetFurnitures extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      search: z.string().optional(), 
      start: z.number().optional(),
      quantity: z.number().optional(),
    });
    this.buildForm(schema, formBody)
  }
}