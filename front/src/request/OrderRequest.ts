/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FurnitureDefault } from "app/../commons/Interface/Furniture";
import { OrderWithFurnitures } from "app/../commons/Interface/Order";
import Api from "./Api";

export default class OrderRequest {

  static Create(payload: {name: string; furnitures: FurnitureDefault[]}): Promise<{order: OrderWithFurnitures}>
  {
    return Api.post("/order", payload)
  }

  static GetForMe(): Promise<{orders: OrderWithFurnitures[]}>
  {
    return Api.get("/order")
  }
}