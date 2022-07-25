import { OrderWithFurnitures, OrderWithFurnituresAndCreator } from "../../../../commons/Interface/Order";

export interface OrderStateInterface {
  orders: OrderWithFurnitures[];
  order: OrderWithFurnituresAndCreator | null;
}

function state(): OrderStateInterface {
  return {
    orders: [],
    order: null,
  }
};

export default state;
