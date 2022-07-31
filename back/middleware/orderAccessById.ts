import OrderDao from "../dao/OrderDao";
import { Order } from "../entity/Order";
import { RequestAuth } from "./auth"

export interface RequestOrder extends RequestAuth {
  order: Order;
}

export const orderAccessById = async (req: RequestOrder, res, next) => {
  const params = (req.params as unknown as { id: string });
  if (!params.id) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  const orderDao: OrderDao = new OrderDao();
  
  const order = await orderDao.getByIdWithOrganizationAndCreatorAndItemsWithFurnitureVersionWithFurniture(params.id) as Order
  if (!order) {
    res.status(400).json({message: 'order not found'});
    return;
  }

  if (order.organization.id !== req.user.organization.id) {
    res.status(400).json({message: 'unauthorized'});
    return;
  }
  
  req.order = order;
  next();
  return
}