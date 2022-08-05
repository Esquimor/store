import { ORDER_STATUS } from "../Interface/Order";

export const ORDER_STATUS_ITEM = {
  [ORDER_STATUS.CREATED]: {
    label: ORDER_STATUS.CREATED,
    color: "blue"
  },
  [ORDER_STATUS.VALIDATED]: {
    label: ORDER_STATUS.VALIDATED,
    color: "yellow"
  },
  [ORDER_STATUS.ORDERED]: {
    label: ORDER_STATUS.ORDERED,
    color: "purple"
  },
  [ORDER_STATUS.FINISHED]: {
    label: ORDER_STATUS.FINISHED,
    color: "green"
  },
  [ORDER_STATUS.ERROR]: {
    label: ORDER_STATUS.ERROR,
    color: "red"
  },
}