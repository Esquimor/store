/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  OrderWithFurnitures,
  OrderWithFurnituresAndCreator,
  ORDER_STATUS,
  OrdersCounted
} from "app/../commons/Interface/Order";
import Api from "./Api";
import { Search, Pagination } from "app/../commons/Interface/Filter";

interface GetForMeQuery extends Search, Pagination {
  status?: ORDER_STATUS
}

export default class OrderRequest {

  static Create(payload: {name: string; items: {quantity: number; furnitureVersionId: string}[]}): Promise<{order: OrderWithFurnitures}>
  {
    return Api.post("/order", payload)
  }

  static GetForMe(payload?: GetForMeQuery): Promise<{
    orders: OrderWithFurnitures[]
    count: number
  }>
  {
    return Api.get("/order", payload)
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

  static GetOrderCounted(): Promise<{counted: OrdersCounted}>
  {
    return Api.get("/order/status/count")
  }
}