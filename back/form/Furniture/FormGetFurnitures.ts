import Form from "../Form"
import { z } from "zod";

export default class FormGetFurnitures extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      search: z.string().optional(), 
      start: z.string().optional(),
      quantity: z.string().optional(),
      category: z.string().optional(),
    });
    this.buildForm(schema, formBody)
  }
}