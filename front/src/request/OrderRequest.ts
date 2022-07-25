/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FurnitureDefault } from "app/../commons/Interface/Furniture";
import { OrderWithFurnitures, OrderWithFurnituresAndCreator, ORDER_STATUS } from "app/../commons/Interface/Order";
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

  static GetById(id: string): Promise<{order: OrderWithFurnituresAndCreator}>
  {
    return Api.get(`/order/${id}`)
  }

  static ValidateOrder(id: string): Promise<{order: OrderWithFurnituresAndCreator}>
  {
    return Api.patch(`/order/${id}/validate`)
  }

  static UpdateOrder(id: string, params: {name?: string; status?: ORDER_STATUS}): Promise<{order: OrderWithFurnituresAndCreator}> 
  {
    return Api.patch(`/order/${id}`, params)
  }
}