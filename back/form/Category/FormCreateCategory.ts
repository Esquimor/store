import Form from "../Form"
import { z } from "zod";

export default class FormCreateCategory extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string(),
      parentId: z.string()
    });
    this.buildForm(schema, formBody)
  }
}