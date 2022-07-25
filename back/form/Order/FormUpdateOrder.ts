import Form from "../Form"
import { z } from "zod";
import { ORDER_STATUS } from "../../../commons/Interface/Order";

export default class FormUpdateOrd extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      name: z.string().optional(),
      status: z.enum(Object.values(ORDER_STATUS) as [string, ...string[]]).optional()
    });
    this.buildForm(schema, formBody)
  }
}