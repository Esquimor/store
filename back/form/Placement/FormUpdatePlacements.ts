import Form from "../Form"
import { z } from "zod";

export default class FormUpdatePlacements extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      addressId: z.string(),
      placements: z.array(z.object({
        id: z.string().optional(),
        name: z.string()
      })),
    });
    this.buildForm(schema, formBody)
  }
}