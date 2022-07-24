import { OrderWithFurnitures } from "../../../../commons/Interface/Order";

export interface OrderStateInterface {
  orders: OrderWithFurnitures[];
}

function state(): OrderStateInterface {
  return {
    orders: [],
  }
};

export default state;
