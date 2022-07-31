import { OrderWithItemWithFurnitureVersionWithFurniture, OrderWithItemWithFurnitureVersionWithFurnitureAndCreator } from "../../../../commons/Interface/Order";

export interface OrderStateInterface {
  orders: OrderWithItemWithFurnitureVersionWithFurniture[];
  order: OrderWithItemWithFurnitureVersionWithFurnitureAndCreator | null;
}

function state(): OrderStateInterface {
  return {
    orders: [],
    order: null,
  }
};

export default state;
