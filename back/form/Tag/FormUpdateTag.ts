import Form from "../Form"
import { z } from "zod";

export default class FormUpdateTag extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string(),
    });
    this.buildForm(schema, formBody)
  }
}