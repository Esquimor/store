import { ORDER_STATUS_ITEM } from "../Const/Order";
import { ORDER_STATUS } from "../Interface/Order";

export const isOrderStatusInOrderStatusItem = (orderStatus: ORDER_STATUS) => {
  return !!ORDER_STATUS[orderStatus];
}

export const getOrderStatusItemForOrderStatus = (orderStatus: ORDER_STATUS) => {
  if (!isOrderStatusInOrderStatusItem(orderStatus)) return null;

  return ORDER_STATUS_ITEM[orderStatus];
}

export const getColorForOrderStatus = (orderStatus: ORDER_STATUS) => {
  if (!isOrderStatusInOrderStatusItem(orderStatus)) return null;

  return getOrderStatusItemForOrderStatus(orderStatus)?.color || "white";
}