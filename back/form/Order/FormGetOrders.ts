import Form from "../Form"
import { z } from "zod";
import { ORDER_STATUS } from "../../../commons/Interface/Order";

export default class FormGetOrders extends Form {

  constructor(formBody: any) {
    super();
    const schema = z.object({
      search: z.string().optional(),
      status: z.enum(Object.values(ORDER_STATUS) as [string, ...string[]]).optional(),
      start: z.string().optional(),
      quantity: z.string().optional(),
      created_by: z.string().optional(),
    });
    this.buildForm(schema, formBody)
  }
}