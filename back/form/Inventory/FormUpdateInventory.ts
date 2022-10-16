import Form from "../Form"
import { z } from "zod";

export default class FormUpdateInventory extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      userId: z.string().optional(),
      tagsId: z.array(z.string()).optional(),
      itemsId: z.array(z.string()).optional(),
      addressId: z.string().optional(),
      placementId: z.string().optional()
    });
    this.buildForm(schema, formBody)
  }
}