import Form from "../Form"
import { z } from "zod";

export default class FormCreateInventory extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
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